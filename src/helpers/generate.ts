import { sample, maxBy } from 'lodash'
import randomColor from 'randomcolor'

export interface Shape {
  color: string;
  blocks: Block[];
  width: number;
  height: number;
  x: number;
  y: number;
  active: boolean;
  rotated: boolean;
}

export interface Block {
  x: number;
  y: number;
  color?: string;
  dead?: boolean;
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

  shape.blocks = sample(sample(shapes))  as any

  const maxX = maxBy(shape.blocks, 'x')?.x as number
  const maxY = maxBy(shape.blocks, 'y')?.y as number

  shape.width = maxX + 1
  shape.height = maxY + 1
  shape.x = Math.floor(dimensions.width / 2) - Math.ceil(shape.width / 2)

  return shape
}
