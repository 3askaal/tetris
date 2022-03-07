import React, { createContext, useRef, useState } from 'react'
import ReactGA4 from 'react-ga4'
import { groupBy, includes, sum } from 'lodash'
import { Block, generateShape, Shape } from '../helpers/generate';
import { useInterval } from '../helpers/interval';

export const GameContext = createContext<any>({})

export const GameProvider = ({ children }: any) => {
  const [shape, setShapeState] = useState<Shape | null>(null)
  const [blocks, setBlocksState] = useState<Block[]>([])
  const currentShape = useRef<any>(null)
  const currentBlocks = useRef<any>([])

  const [settings, setSettings] = useState<any>({})
  const [dimensions] = useState({ height: 36, width: 20 })
  const [gameOver, setGameOver] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [score, setScore] = useState({ level: 1, score: 0, rows: 0 })

  const onStartGame = () => {
    setGameOver(false)
    setScore({ level: 1, score: 0, rows: 0 })

    setBlocks([])

    const newShape = generateShape(dimensions)
    setShape(newShape)

    ReactGA4.event({
      category: "actions",
      action: "game:start",
    });
  }

  const setShape = (shape: Shape | null) => {
    currentShape.current = shape
    setShapeState(shape)
  }

  const setBlocks = (blocks: any) => {
    currentBlocks.current = blocks
    setBlocksState(blocks)
  }

  const checkShapePosition = (nextShape: Shape) => {
    const hitsBlock = currentBlocks.current.some((block: Block) =>
      nextShape.blocks.some((nextBlock) =>
        (nextShape.x + nextBlock.x) === block.x && (nextShape.y + nextBlock.y) === block.y
      )
    )

    const hitsBottom = (nextShape.y + nextShape.height) >= dimensions.height + 1
    const hitsSide = (nextShape.x < 0) || (nextShape.x + nextShape.width > dimensions.width)

    return hitsBlock || hitsBottom || hitsSide
  }

  const moveX = (direction: 'left' | 'right') => {
    const movements =  {
      left: -1,
      right: 1
    }

    const nextShape = {
      ...currentShape.current,
      x: currentShape.current.x + movements[direction]
    }

    const notAllowed = checkShapePosition(nextShape)

    if (notAllowed) {
      return
    }

    setShape(nextShape)
  }

  const moveY = () => {
    const nextShape: Shape = { ...currentShape.current, y: currentShape.current.y + 1 }

    const notAllowed = checkShapePosition(nextShape)
    const isGameOver = notAllowed && currentShape.current.y === 2

    if (notAllowed) {
      setBlocks([
        ...currentBlocks.current,
        ...currentShape.current.blocks.map((currentBlock: any) => ({
          ...currentBlock,
          x: currentShape.current.x + currentBlock.x,
          y: currentShape.current.y + currentBlock.y,
          color: currentShape.current.color
        })),
      ])

      setShape(generateShape(dimensions))
      cleanupRows()
    } else {
      setShape(nextShape)
    }

    if (isGameOver) {
      currentShape.current = null
      setShape(null)
      setGameOver(true)
    }

    return notAllowed
  }

  const drop = () => {
    let isHit = false

    while (!isHit) {
      isHit = moveY()
    }
  }

  const rotate = () => {
    const rotatedShape = {
      ...currentShape.current,
      width: currentShape.current.height,
      height: currentShape.current.width,
      rotated: currentShape.current.rotated < 3 ? currentShape.current.rotated + 1 : 0,
    }

    rotatedShape.blocks = currentShape.current.blocks.map((block: Block) => ({
      x: (rotatedShape.width - 1) - block.y,
      y: block.x
    }))

    if (rotatedShape.width > currentShape.current.width) {
      if (rotatedShape.x + rotatedShape.width > dimensions.width) {
        rotatedShape.x -= (rotatedShape.width - currentShape.current.width)
      }
    }

    const widthDiff = rotatedShape.width - currentShape.current.width

    if (widthDiff !== 0) {
      const movePositive = widthDiff < 0
      const positiveDiff = Math.abs(widthDiff)
      const moveAmount = positiveDiff === 3 ? rotatedShape.rotated > 1 ? 2 : 1 : positiveDiff

      if (movePositive) {
        rotatedShape.x += moveAmount
      } else {
        rotatedShape.x -= moveAmount
      }
    }

    const hitsBlock = checkShapePosition(rotatedShape)

    if (hitsBlock) {
      return
    }

    setShape(rotatedShape)
  }

  const getFilledRows = (): number[] => {
    const inactiveRows = groupBy(currentBlocks.current, 'y')

    const fullRows = Object.entries(inactiveRows)
      .filter(([index, inactiveRow]) => inactiveRow.length > dimensions.width - 1 && index)
      .map(([index]) => Number(index))

    return fullRows
  }

  const cleanupRows = () => {
    const filledRows = getFilledRows()

    if (!filledRows.length) {
      return
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

    setBlocks(currentBlocks.current.map((currentBlock: Block) => ({
      ...currentBlock,
      dead: includes(filledRows, currentBlock.y)
    })))

    setTimeout(() => {
      setBlocks(
        currentBlocks.current
          .filter(({ dead }: Block) => !dead)
          .map((block: Block) => ({
            ...block,
            y: block.y + sum(
              filledRows.map((rowY) => block.y < rowY ? 1 : 0)
            )
          }))
      )
    }, 500)
  }

  useInterval(moveY, (!gameOver && !gamePaused) ? 200 : null)

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        settings,
        setSettings,
        dimensions,
        gameOver,
        moveX,
        moveY,
        drop,
        rotate,
        score,
        blocks,
        shape,
        gamePaused,
        setGamePaused,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
