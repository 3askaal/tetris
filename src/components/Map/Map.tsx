import React, { useContext } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock, SMapShape } from './Map.styled'
import { GameContext } from '../../context'

export const Map = ({ style } : any) => {
  const {
    dimensions,
    shapes,
  } = useContext(GameContext)

  return (
    <SMap style={{style}} width={dimensions?.width} height={dimensions?.height}>
      { shapes.filter(({ active }) => active).map((shape) => (
        <SMapShape
          key={`shape-active`}
          isActive={true}
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
        </SMapShape>
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
