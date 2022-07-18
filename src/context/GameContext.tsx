import React, { createContext, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ReactGA4 from 'react-ga4'
import { groupBy, includes, sum } from 'lodash'
import { Block, generateShape, Shape } from '../helpers/generate';
import { useInterval } from '../helpers/interval';

export interface Dimensions {
  width: number;
  height: number;
}

export interface Score {
  level: number;
  score: number;
  rows: number;
}

export interface GameContextType {
  shape: Shape | null;
  setShape: any;
  blocks: Block[];
  setBlocks: Dispatch<SetStateAction<Block[]>>;
  dimensions: Dimensions;
  score: Score;
  gameOver: boolean;
  gamePaused: boolean;
  setGamePaused: Dispatch<SetStateAction<boolean>>;
  onStartGame(initialShape?: Shape): void;
  drop(): void;
  moveY(): void;
  moveX(direction: string): void;
  rotate(): void;
}

export const GameContextDefaults = {
  shape: generateShape({ height: 36, width: 20 }),
  setShape: () => {},
  blocks: [],
  setBlocks: () => {},
  dimensions: { height: 36, width: 20 },
  score: { level: 1, score: 0, rows: 0 },
  gameOver: false,
  gamePaused: false,
  setGamePaused: () => {},
  onStartGame: () => {},
  drop: () => {},
  moveY: () => {},
  moveX: () => {},
  rotate: () => {},
}

export const GameContext = createContext<GameContextType>(GameContextDefaults)

export const GameProvider = ({ children }: any) => {
  const [shape, setShapeState] = useState<Shape | null>(generateShape({ height: 36, width: 20 }))
  const [blocks, setBlocksState] = useState<Block[]>([])
  const shapeRef = useRef<any>(null)
  const gameHasStarted = useRef(false)
  const blocksRef = useRef<any>([])
  const [dimensions] = useState({ height: 36, width: 20 })
  const [gameOver, setGameOver] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [score, setScore] = useState({ level: 1, score: 0, rows: 0 })

  const onStartGame = (initialShape = generateShape(dimensions)) => {
    gameHasStarted.current = true;
    setGameOver(false)
    setScore({ level: 1, score: 0, rows: 0 })
    setBlocks([])
    setShape(initialShape)

    ReactGA4.event({
      category: "actions",
      action: "game:start",
    });
  }

  const setShape = (shape: Shape | null) => {
    shapeRef.current = shape
    setShapeState(shape)
  }

  const setBlocks = (blocks: any) => {
    blocksRef.current = blocks
    setBlocksState(blocks)
  }

  const checkShapePosition = (nextShape: Shape) => {
    const hitsBlock = blocksRef.current.some((block: Block) =>
      nextShape.blocks.some((nextBlock) =>
        (nextShape.x + nextBlock.x) === block.x && (nextShape.y + nextBlock.y) === block.y
      )
    );

    const hitsBottom = (nextShape.y + nextShape.height) >= dimensions.height + 1;
    const hitsSide = (nextShape.x < 0) || (nextShape.x + nextShape.width > dimensions.width);

    return hitsBlock || hitsBottom || hitsSide
  }

  const moveX = (direction: 'left' | 'right') => {
    const movements =  {
      left: -1,
      right: 1
    }

    const nextShape = {
      ...shapeRef.current,
      x: shapeRef.current?.x + movements[direction]
    }

    const isHit = checkShapePosition(nextShape)

    if (isHit) {
      return
    }

    setShape(nextShape)
  }

  const moveY = async (shouldUpdateState: boolean = true) => {
    if (!gameHasStarted.current) throw new Error('Game has not been started yet');
    if (!shapeRef.current) throw new Error('Could not find active shape');

    const nextShape: Shape = { ...shapeRef.current, y: shapeRef.current.y + 1 }
    const isHit = checkShapePosition(nextShape)
    const isGameOver = isHit && shapeRef.current.y === 2

    if (isHit) {
      setBlocks([
        ...blocksRef.current,
        ...shapeRef.current.blocks.map((currentBlock: any) => ({
          ...currentBlock,
          x: shapeRef.current.x + currentBlock.x,
          y: shapeRef.current.y + currentBlock.y,
          color: shapeRef.current.color
        })),
      ])

      setShape(generateShape(dimensions))
    } else {
      if (shouldUpdateState) {
        setShape(nextShape)
      } else {
        shapeRef.current = nextShape
      }
    }

    if (isGameOver) {
      setShape(null)
      setGameOver(true)
    }

    return isHit
  }

  const drop = async () => {
    let isHit = false

    while (!isHit) {
      isHit = await moveY(false)
    }
  }

  const rotate = () => {
    const rotatedShape = {
      ...shapeRef.current,
      width: shapeRef.current.height,
      height: shapeRef.current.width,
    }

    rotatedShape.blocks = shapeRef.current.blocks.map((block: Block) => ({
      x: (rotatedShape.width - 1) - block.y,
      y: block.x
    }))

    if (rotatedShape.width > shapeRef.current.width) {
      if (rotatedShape.x + rotatedShape.width > dimensions.width) {
        rotatedShape.x -= (rotatedShape.width - shapeRef.current.width)
      }
    }

    const isHit = checkShapePosition(rotatedShape)

    if (isHit) {
      return
    }

    setShape(rotatedShape)
  }

  const getFullRows = (): number[] => {
    const inactiveRows = groupBy(blocksRef.current, 'y')

    const fullRows = Object.entries(inactiveRows)
      .filter(([index, inactiveRow]) => inactiveRow.length > dimensions.width - 1 && index)
      .map(([index]) => Number(index))

    return fullRows
  }

  const checkBlocks = () => {
    const fullRows = getFullRows()

    if (!fullRows.length) {
      return
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

    setBlocks(blocksRef.current.map((currentBlock: Block) => ({
      ...currentBlock,
      dead: includes(fullRows, currentBlock.y)
    })))

    setTimeout(() => {
      setBlocks(
        blocksRef.current
          .filter(({ dead }: Block) => !dead)
          .map((block: Block) => ({
            ...block,
            y: block.y + sum(
              fullRows.map((rowY) => block.y < rowY ? 1 : 0)
            )
          }))
      )
    }, 500)
  }

  useEffect(() => {
    checkBlocks()
  }, [blocks.length])

  useEffect(() => {
    if (gameOver) {
      ReactGA4.event({
        category: "actions",
        action: "game:over",
      });
    }
  }, [gameOver])

  useInterval(() => {
    moveY()
  }, (!gameOver && !gamePaused) ? 200 : null)

  return (
    <GameContext.Provider
      value={{
        onStartGame,
        dimensions,
        gameOver,
        moveX,
        moveY,
        drop,
        rotate,
        score,
        blocks,
        setBlocks,
        shape,
        setShape,
        gamePaused,
        setGamePaused
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
