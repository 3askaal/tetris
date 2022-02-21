import React, { useContext, useEffect } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'
import { generateShape } from '../../helpers/generate'
import useMousetrap from 'react-hook-mousetrap'
import { useInterval } from '../../helpers/interval'

export const Map = ({ style } : any) => {
  const { dimensions, grid, shapes, setShapes, moveX, moveY, drop, rotate } = useContext(GameContext)


  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
  }

  const getActiveShape = () => {
    return shapes?.filter(({ active }) => active)[0] || null
  }

  const getShapes = () => {
    return shapes?.filter(({ active }) => !active)
  }

  useMousetrap('left', () => moveX('left'))
  useMousetrap('right', () => moveX('right'))
  useMousetrap('space', () => drop())
  useMousetrap('shift', () => rotate())

  useEffect(() => {
    setShapes([generateShape(dimensions)])
    // setShapes((currentShapes): any => [generateShape()])
  }, [])

  useInterval(moveY, 200)

  return (
    <SMap style={{style}} width={dimensions?.width} height={dimensions?.height}>
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
          left: `${getActiveShape()?.x}rem`,
          top: `${getActiveShape()?.y}rem`,
          height: getActiveShape()?.height + 'rem',
          width: getActiveShape()?.width + 'rem'
        }}>
          { getActiveShape()?.blocks.map((block: any, index: number) => (
            <SMapBlock
              color={getActiveShape()?.color}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
            />
          )) }
        </Box>
      ) : null }
      { getShapes()?.length && getShapes()?.map((shape: any, index: number) => (
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
