import React, { useContext } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'
import useMousetrap from 'react-hook-mousetrap'
import { useInterval } from '../../helpers/interval'

export const Map = ({ style } : any) => {
  const {
    dimensions,
    shapes,
    moveX,
    moveY,
    drop,
    rotate,
    gameOver
  } = useContext(GameContext)

  useMousetrap('left', () => !gameOver && moveX('left'))
  useMousetrap('right', () => !gameOver && moveX('right'))
  useMousetrap('space', () => !gameOver && drop())
  useMousetrap('shift', () => !gameOver && rotate())

  useInterval(moveY, !gameOver ? 200 : null)

  return (
    <SMap style={{style}} width={dimensions?.width} height={dimensions?.height}>
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
