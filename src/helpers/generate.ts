import { find, times, sample, random, minBy, maxBy, last } from 'lodash'
import randomColor from 'randomcolor'

export interface Shape {
  color: string;
  blocks: { x: number, y: number, dead?: boolean }[];
  width: number;
  height: number;
  x: number;
  y: number;
  active: boolean;
  rotated: boolean;
}


const shapes = [
  [
    // lines
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
  ],
  [
    // blocks
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
  ],
  [
    // S shapes
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
    [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  ],
  [
    // L shapes
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }],
  ],
  [
    // triangle shapes
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }],
    [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }],
  ]
]

export const generateShape = (dimensions: any) => {
  const shape: Shape = {
    color: randomColor(),
    blocks: [],
    width: 0,
    height: 0,
    x: 0,
    y: 2,
    rotated: false,
    active: true
  };

  // const amountBlocksInShape = 4

  // const startingPoints = [{ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 4, y: 0 }, { x: 4, y: 4 }]
  // const possibleMovements = [{ x: 1, y: 1 } , { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }];

  // const cornerIndex = random(3)

  // const startingPoint = startingPoints[cornerIndex]
  // const possibleMovement = possibleMovements[cornerIndex]

  // times(amountBlocksInShape, (i) => {
  //   if (i === 0) {
  //     shape.blocks.push(startingPoint)
  //   } else {
  //     let blockExists: any = true
  //     let nextBlock: any = null

  //     while (blockExists) {
  //       nextBlock = { ...last(shape.blocks) }
  //       const randomDirection = sample(['x', 'y']) as 'x' | 'y'
  //       nextBlock[randomDirection] += possibleMovement[randomDirection]
  //       blockExists = find(shape.blocks, { ...nextBlock })
  //     }

  //     shape.blocks.push(nextBlock)
  //   }
  // })

  shape.blocks = sample(sample(shapes))  as any

  const minX = minBy(shape.blocks, 'x')?.x as number
  const maxX = maxBy(shape.blocks, 'x')?.x as number
  const minY = minBy(shape.blocks, 'y')?.y as number
  const maxY = maxBy(shape.blocks, 'y')?.y as number

  shape.blocks = shape.blocks.map((block) => ({ x: block.x - minX, y: block.y - minY }))

  shape.width = (maxX - minX) + 1
  shape.height = (maxY - minY) + 1
  shape.x = Math.floor(dimensions.width / 2) - Math.ceil(shape.width / 2)

  return shape
}
