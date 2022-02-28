import React, { useContext } from 'react'
import { SMap, SMapBlock, SMapShape } from './Map.styled'
import { GameContext } from '../../context'

export const Map = ({ style } : any) => {
  const {
    dimensions,
    shape,
    blocks
  } = useContext(GameContext)

  return (
    <SMap style={{style}} width={dimensions?.width} height={dimensions?.height}>
      { shape ? (
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
      ) : null }
      { blocks.map((block: any, index: number) => (
        <SMapBlock
          key={`block-${index}`}
          color={block.color}
          dead={block.dead}
          s={{
            left: `${block.x}rem`,
            top: `${block.y}rem`
          }}
        />
      )) }
    </SMap>
  )
}
