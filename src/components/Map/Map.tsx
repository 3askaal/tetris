import React, { useContext, useEffect, useRef } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'
import { generateShape } from '../../helpers/generate'
import useMousetrap from 'react-hook-mousetrap'
import { useInterval } from '../../helpers/interval'
import { PlayerDetails } from '..'

export const Map = ({ style } : any) => {
  const { dimensions, grid, shapes, setShapes, moveX, moveY, drop, rotate } = useContext(GameContext)

  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
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
      {/* { getStones().map(({x, y}: any, index: number) => (
        <SMapBlock
          key={index}
          color="#787A91"
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) } */}
      { shapes.filter(({ active }) => active).map((shape) => (
        <Box
          key={`shape-active`}
          s={{
            position: 'absolute',
            left: `${shape.x}rem`,
            top: `${shape.y}rem`,
            height: shape.height + 'rem',
            width: shape.width + 'rem',
          }}
        >
          { shape.blocks.map((block: any, index: number) => (
            <SMapBlock
              key={`block-active-${index}`}
              color={shape.color}
              s={{
                left: `${block.x}rem`,
                top: `${block.y}rem`
              }}
            />
          )) }
        </Box>
      )) }
      { shapes.filter(({ active }) => !active).map((shape: any, index: number) => (
        <Box
          key={`shape-${index}`}
          s={{
            position: 'absolute',
            left: `${shape.x}rem`,
            top: `${shape.y}rem`,
            height: shape.height + 'rem',
            width: shape.width + 'rem'
          }}
        >
          { shape.blocks.map((block: any, index: number) => (
            <SMapBlock
              key={`block-${index}`}
              color={!block.dead ? shape.color : 'black'}
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
