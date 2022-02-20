import React, { useContext, useEffect, useState } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'
import { generateShape, Shape } from '../../helpers/generate'
import { useInterval } from '../../helpers/interval'
import useMousetrap from 'react-hook-mousetrap'

export const Map = ({ style } : any) => {
  const { dimensions, grid, bombs, explosions, players }: any = useContext(GameContext)
  const [shape, setShape] = useState<Shape | null>(null)
  const [shapes, setShapes] = useState<Shape[]>([])

  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
  }

  const getActiveShape = () => {
    return shapes.filter(({ active }) => active)[0]
  }

  const getShapes = () => {
    return shapes.filter(({ active }) => !active)
  }

  const move = (direction: 'left' | 'right') => {
    const movements =  {
      left: -1,
      right: 1
    }

    setShapes((currentShapes) => currentShapes.map((currentShape) => {
      if (!currentShape.active) {
        return currentShape
      }

      const nextPos = currentShape.x + movements[direction]

      if (nextPos > 0 && nextPos < dimensions.width - 2) {
        return { ...currentShape, x: currentShape.x + movements[direction] }
      }

      return currentShape
    }))
  }

  const drop = () => {
    let movedDown = false

    while (!movedDown) {
      movedDown = moveDown()
    }
  }

  useMousetrap('left', () => move('left'))
  useMousetrap('right', () => move('right'))
  useMousetrap('space', () => drop())

  useEffect(() => {
    setShapes([generateShape(dimensions)])
    // setShapes((currentShapes): any => [generateShape()])
  }, [])

  const moveDown = () => {
    let movedDown = false

    setShapes((currentShapes) => {
      const activeShape = currentShapes.filter(({ active }) => active)[0]
      const inactiveShapes = currentShapes.filter(({ active }) => !active)

      const hitsBottom = (activeShape?.y + activeShape?.height) === dimensions.height - 1

      const hitsBlock = inactiveShapes.length && inactiveShapes.some((inactiveShape) =>
        inactiveShape.blocks.some((bottomBlock) =>
          activeShape.blocks.some((activeBlock) => (activeShape.x + activeBlock.x) === (inactiveShape.x + bottomBlock.x) && ((activeShape.y + 1) + activeBlock.y) === (inactiveShape.y + bottomBlock.y))
        )
      )

      if (hitsBottom || hitsBlock) {
        movedDown = true
        return [ ...inactiveShapes, { ...activeShape, active: false }, generateShape(dimensions)]
      }

      return [ ...inactiveShapes, { ...activeShape, y: activeShape?.y + 1 }]
    })

    return movedDown
  }

  useInterval(moveDown, 200)

  return (
    <SMap style={{style}} width={dimensions.width} height={dimensions.height}>
      {/* { times(22 * 44, (i) => (
        <SMapBlock
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />

      )) } */}
      { getStones().map(({x, y}: any, index: number) => (
        <SMapBlock
          key={index}
          color="#787A91"
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) }
      { getActiveShape() ? (
        <Box s={{
          position: 'absolute',
          left: `${getActiveShape().x}rem`,
          top: `${getActiveShape().y}rem`,
          height: getActiveShape().height + 'rem',
          width: getActiveShape().width + 'rem'
        }}>
          { getActiveShape().blocks.map((block: any, index: number) => (
            <SMapBlock
              color={getActiveShape().color}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
            />
          )) }
        </Box>
      ) : null }
      { getShapes().length && getShapes().map((shape: any, index: number) => (
        <Box s={{
          position: 'absolute',
          left: `${shape.x}rem`,
          top: `${shape.y}rem`,
          height: shape.height + 'rem',
          width: shape.width + 'rem'
        }}>
          { shape.blocks.map((block: any, index: number) => (
            <SMapBlock
              color={shape.color}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
            />
          )) }
        </Box>
      )) }
    </SMap>
  )
}
