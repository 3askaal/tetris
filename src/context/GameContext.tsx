import React, { createContext, useState } from 'react'
import ReactGA4 from 'react-ga4'
import { groupBy, includes, sum } from 'lodash'
import { ISettings } from '../types';
import { generateShape, Shape } from '../helpers/generate';
import useMousetrap from 'react-hook-mousetrap';
import { useInterval } from '../helpers/interval';

interface GameContextType {
  shapes: Shape[];
  dimensions?: { height: number, width: number };
  settings: ISettings;

  [key: string]: any;
}

export const GameContext = createContext<GameContextType>({
  settings: {
    type: 'local'
  },
  players: [],
  shapes: []
})

export const GameProvider = ({ children }: any) => {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [settings, setSettings] = useState<any>({})
  const [dimensions] = useState({ height: 36, width: 20 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState({ level: 1, score: 0, rows: 0 })

  const onStartGame = (args: any) => {
    setGameOver(false)
    setShapes([generateShape(dimensions)])
    setScore({ level: 1, score: 0, rows: 0 })

    ReactGA4.event({
      category: "actions",
      action: "game:start",
    });
  }

  const moveX = (direction: 'left' | 'right') => {
    const movements =  {
      left: -1,
      right: 1
    }

    setShapes((currentShapes) => currentShapes.map((currentShape) => {
      if (!currentShape.active) {
        return currentShape
      }

      const nextPosStart = currentShape.x + movements[direction]
      const nextPosEnd = currentShape.x + currentShape.width + movements[direction]
      const hitsSide = nextPosStart < 0 || nextPosEnd > dimensions.width

      if (hitsSide) {
        return currentShape
      }

      const activeShape = currentShapes.filter(({ active }) => active)[0]
      const inactiveShapes = currentShapes.filter(({ active }) => !active)

      const hitsBlock = inactiveShapes.length && inactiveShapes.some((inactiveShape) =>
        inactiveShape.blocks.some((inactiveBlock) =>
          activeShape.blocks.some((activeBlock) => (activeShape.x + activeBlock.x) + movements[direction] === (inactiveShape.x + inactiveBlock.x) && (activeShape.y + activeBlock.y) === (inactiveShape.y + inactiveBlock.y))
        )
      )

      if (hitsBlock) {
        return currentShape
      }

      return { ...currentShape, x: currentShape.x + movements[direction] }
    }))
  }

  const moveY = () => {
    let isHit = false
    let isGameOver = false

    setShapes((currentShapes) => {
      const activeShape = currentShapes.filter(({ active }) => active)[0]
      const inactiveShapes = currentShapes.filter(({ active }) => !active)
      const nextShape = { ...activeShape, y: activeShape.y + 1 }

      const hitsBlock = inactiveShapes.length && inactiveShapes.some((inactiveShape) =>
        inactiveShape.blocks.some((inactiveBlock) =>
          nextShape.blocks.some((nextBlock) =>
            (nextShape.x + nextBlock.x) === (inactiveShape.x + inactiveBlock.x) && (nextShape.y + nextBlock.y) === (inactiveShape.y + inactiveBlock.y)
          )
        )
      )

      const hitsBottom = (activeShape?.y + activeShape?.height) === dimensions.height

      if (hitsBottom || hitsBlock) {
        isHit = true
        isGameOver = activeShape.y === 2

        if (!isGameOver) {
          return [ ...inactiveShapes, { ...activeShape, active: false }, generateShape(dimensions)]
        } else {
          return [ ...inactiveShapes, { ...activeShape, active: false } ]
        }
      }

      return [ ...inactiveShapes, { ...activeShape, y: activeShape?.y + 1 }]
    })

    if (isHit) {
      cleanupRow()
    }

    if (isGameOver) {
      setGameOver(true)
    }

    return isHit
  }

  const drop = () => {
    let isHit = false

    while (!isHit) {
      isHit = moveY()
    }
  }

  const rotate = () => {
    setShapes((currentShapes) => currentShapes.map((currentShape) => {
      if (!currentShape.active) {
        return currentShape
      }

      const rotatedShape = {
        ...currentShape,
        width: currentShape.height,
        height: currentShape.width,
        rotated: !currentShape.rotated,
        blocks: currentShape.blocks.map((block) => ({
          x: (currentShape.height - 1) - block.y,
          y: block.x
        }))
      }

      const shapeStart = rotatedShape.x
      const shapeEnd = rotatedShape.x + rotatedShape.width

      if (shapeStart < 1) {
        rotatedShape.x += 1
      }

      if (shapeEnd > dimensions.width - 1) {
        rotatedShape.x -= 1
      }

      return rotatedShape
    }))
  }

  const cleanupRow = () => {
    setShapes((currentShapes) => {
      const inactiveShapes = currentShapes.filter(({ active }) => !active)

      const inactiveBlocks = inactiveShapes.map(
        ({ x, y, blocks }) => blocks?.map(
          (block) => ({ ...block, x: block.x + x, y: block.y + y })
        )
      ).flat()

      const inactiveRows = groupBy(inactiveBlocks, 'y')

      const filledRows = Object.entries(inactiveRows)
        .filter(([index, inactiveRow]) => inactiveRow.length > dimensions.width - 1 && index)
        .map(([index]) => Number(index))

      if (!filledRows.length) {
        return currentShapes
      }

      const pointsForAmountRows = [40, 100, 300, 1200]
      const amountRowsIndex = filledRows.length - 1


      const newRows = score.rows + filledRows.length
      const newLevel = Math.floor(newRows / 10) + 1
      const newScore = score.score + (pointsForAmountRows[amountRowsIndex] * score.level)

      setScore({
        level: newLevel,
        score: newScore,
        rows: newRows,
      })

      return [...currentShapes]
        .map((currentShape, index) => {
          if (currentShape.active) {
            return currentShape
          }

          const fixedBlocks = currentShape.blocks
            .filter((inactiveBlock) => {
              return !includes(filledRows, currentShape.y + inactiveBlock.y)
            })
            .map((inactiveBlock) => {
              const amountToMove = sum(filledRows.map((rowY) => (currentShape.y + inactiveBlock.y) < rowY ? 1 : 0))

              return {
                ...inactiveBlock,
                y: inactiveBlock.y + amountToMove
              }
            })

          return {
            ...currentShape,
            blocks: fixedBlocks
          }
        })
        .filter((shape) => shape.blocks.length)
    })
  }

  useMousetrap('left', () => !gameOver && moveX('left'))
  useMousetrap('right', () => !gameOver && moveX('right'))
  useMousetrap('space', () => !gameOver && drop())
  useMousetrap('shift', () => !gameOver && rotate())

  useInterval(moveY, !gameOver ? 200 : null)

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        settings,
        setSettings,
        dimensions,
        gameOver,
        shapes,
        setShapes,
        moveX,
        moveY,
        drop,
        rotate,
        score
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
