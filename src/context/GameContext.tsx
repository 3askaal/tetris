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
      cleanupRows()
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

  const getFullRows = (shapes: Shape[]): number[] => {
    const inactiveShapes = shapes.filter(({ active }) => !active)

    const inactiveBlocks = inactiveShapes.map(
      ({ x, y, blocks }) => blocks?.map(
        (block) => ({ ...block, x: block.x + x, y: block.y + y })
      )
    ).flat()

    const inactiveRows = groupBy(inactiveBlocks, 'y')

    const fullRows = Object.entries(inactiveRows)
      .filter(([index, inactiveRow]) => inactiveRow.length > dimensions.width - 1 && index)
      .map(([index]) => Number(index))

    return fullRows
  }

  const cleanupRows = () => {
    setShapes((currentShapes) => {
      const fullRows = getFullRows(currentShapes)

      if (!fullRows.length) {
        return currentShapes
      }

      const pointsForAmountRows = [40, 100, 300, 1200]
      const amountRowsIndex = fullRows.length - 1

      const newRows = score.rows + fullRows.length
      const newLevel = Math.floor(newRows / 10) + 1
      const newScore = score.score + (pointsForAmountRows[amountRowsIndex] * score.level)

      setScore({
        level: newLevel,
        score: newScore,
        rows: newRows,
      })

      return currentShapes
        .map((currentShape, index) => {
          if (currentShape.active) {
            return currentShape
          }

          const remainingBlocks = currentShape.blocks
            .map((inactiveBlock) => {
              if (includes(fullRows, currentShape.y + inactiveBlock.y)) {
                return { ...inactiveBlock, dead: true }
              }

              return inactiveBlock
            })
            // .filter((inactiveBlock) => {
            //   return !includes(fullRows, currentShape.y + inactiveBlock.y)
            // })

          // const remainingBlocksMoved =
          //   remainingBlocks.map((inactiveBlock) => {
          //     const amountToMove = sum(fullRows.map((rowY) => (currentShape.y + inactiveBlock.y) < rowY ? 1 : 0))

          //     return {
          //       ...inactiveBlock,
          //       y: inactiveBlock.y + amountToMove
          //     }
          //   })

          return {
            ...currentShape,
            blocks: remainingBlocks
          }
        })
        .filter((shape) => shape.blocks.length)
    })

    setTimeout(() => {
      setShapes((currentShapes) => {
        const fullRows = getFullRows(currentShapes)

        return currentShapes.map((currentShape) => {
          return {
            ...currentShape,
            blocks: currentShape.blocks
              .filter(({ dead }) => !dead)
              .map((inactiveBlock) => {
                const amountToMove = sum(fullRows.map((rowY) => (currentShape.y + inactiveBlock.y) < rowY ? 1 : 0))

                return {
                  ...inactiveBlock,
                  y: inactiveBlock.y + amountToMove
                }
              })
          }
        })

      })
    }, 500)
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
