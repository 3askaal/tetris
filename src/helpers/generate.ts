import { find, times, sampleSize, sample, random } from 'lodash'
import randomColor from 'randomcolor'

export const generatePlayers = (players: any, blocks: any) => {
  const topLeftPosition = { x: 0, y: 0 }
  const topRightPosition = { x: blocks, y: 0 }
  const bottomLeftPosition = { x: 0, y: blocks }
  const bottomRightPosition = { x: blocks, y: blocks }
  const positions = [topLeftPosition, topRightPosition, bottomLeftPosition, bottomRightPosition]

  const colors = ['red', 'green', 'blue', 'purple', 'pink']
  const randomColors = sampleSize(colors, players.length)

  return players.map((player: any, index: number) => ({
    ...player,
    index,
    ...positions[index],
    ...players.length === 2 && {
      ...index === 0 && topLeftPosition,
      ...index === 1 && bottomRightPosition,
    },
    color: randomColor({ luminosity: 'dark', hue: randomColors[index]}),
    health: 100,
  }))
}

export const generateGrid = ({ height, width }: { height: number, width: number }) => {
  let newGrid: any = {}
  const amountPositions = height * width

  times(amountPositions, (i) => {
    const y = (i - (i % width)) / height * 2
    const x = i % width

    newGrid[`${x}/${y}`] = { x, y }
  })

  newGrid = generateStones(newGrid, height, width)

  return newGrid
}

export const generateShape = () => {
  const shape: { x: number, y: number }[] = []

  const amountPositions = 4 * 4

  const amountFilledPositions = random(2, amountPositions / 2)

  const startingPoints = [{ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 4, y: 0 }, { x: 4, y: 4 }]
  const possibleMovements = [{ x: 1, y: 1 } , { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }];

  const cornerIndex = random(3)

  const startingPoint = startingPoints[cornerIndex]
  const possibleMovement = possibleMovements[cornerIndex]

  times(amountFilledPositions, (i) => {
    if (i === 0) {
      shape.push(startingPoint)
    } else {
      let blockExists: any = true
      let nextBlock: any = null

      while (blockExists) {
        nextBlock = { ...sample(shape) }
        const randomDirection = sample(['x', 'y']) as 'x' | 'y'
        nextBlock[randomDirection] += possibleMovement[randomDirection]
        blockExists = find(shape, { ...nextBlock })
      }

      shape.push(nextBlock)
    }
  })

  console.log(shape)

  return shape
}

export const generateStones = (grid: any, height: number, width: number) => {
  let newGrid = { ...grid }

  Object.values(grid).forEach((block: any) => {
    const { x, y } = block

    const isTopRow = y === 0
    const isBottomRow = y === height - 1
    const isleftRow = x === 0
    const isRightRow = x === width - 1

    if (isTopRow || isBottomRow || isleftRow || isRightRow) {
      console.log('test')
      newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], stone: true }}
      // return true
    }

    // return false
  })

  return newGrid
}

export const generateBricks = (grid: any, blocks: number) => {
  let newGrid = { ...grid }

  const freeSpaces = Object.values(grid).filter((block: any) => {
    const { x, y } = block

    const isEvenUneven = x % 2 === 1 && y % 2 === 0
    const isUnevenEven = x % 2 === 0 && y % 2 === 1
    const isBothUneven = x % 1 === 0 && y % 2 === 0

    if (isEvenUneven || isUnevenEven || isBothUneven) {
      const isTopLeftPosition = y < 3 && x < 3
      const isTopRightPosition = y < 3 && x > (blocks - 3)
      const isBottomLeftPosition = y > (blocks - 3) && x < 3
      const isBottomRightPosition = y > (blocks - 3) && x > (blocks - 3)

      const isPosition = isTopLeftPosition || isTopRightPosition || isBottomLeftPosition || isBottomRightPosition

      if (!isPosition) {
        return true
      }
    }

    return false
  })

  const newBricks = sampleSize(freeSpaces, (60 / 100) * freeSpaces.length)

  newBricks.forEach(({x, y}: any) => {
    newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], brick: true }}
  })

  return newGrid
}
