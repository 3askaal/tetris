import React, { useContext, useEffect, useRef, useState } from 'react'
import { SMap, SMapBlock, SMapShape } from './Map.styled'
import { GameContext } from '../../context'
import { min } from 'lodash'

export const Map = ({ style } : any) => {
  const mapRef = useRef<any>()
  const {
    dimensions,
    shape,
    blocks
  } = useContext(GameContext)

  const [blockSize, setBlockSize] = useState<number>(0)
  const [mapDimensions, setMapDimensions] = useState<any>({})

  useEffect(() => {
    const calcMapSize = () => {
      const maxMapWidth = mapRef.current?.getBoundingClientRect().width * 0.98
      const maxMapHeight = mapRef.current?.getBoundingClientRect().height * 0.98

      const evenMapWidth = maxMapWidth - (maxMapWidth % 2)
      const evenMapheight = maxMapHeight - (maxMapHeight % 2)

      const blockSizeX = Math.floor(evenMapWidth / (dimensions.width || 0))
      const blockSizeY = Math.floor(evenMapheight / (dimensions.height || 0))
      const blockSize = min([blockSizeX, blockSizeY]) as number

      setMapDimensions({
        width: blockSize * dimensions.width + 'px',
        height: blockSize * dimensions.height + 'px',
      })

      setBlockSize(blockSize)
    }

    if (mapRef.current) {
      calcMapSize()
    }
  }, [mapRef, mapRef.current, dimensions?.width, dimensions?.height])

  return (
    <div ref={mapRef} style={{ width: mapDimensions.width || '100%', height: mapDimensions.height || '100%' }}>
      <SMap s={{ width: mapDimensions.width || '100%', height: mapDimensions.height || '100%' }} >
        { shape ? (
          <SMapShape
            key={`shape-active`}
            shape={shape}
            blockSize={blockSize}
          >
            { shape.blocks.map((block: any, index: number) => (
              <SMapBlock
                key={`block-active-${index}`}
                color={shape.color}
                blockSize={blockSize}
                block={block}
              />
            )) }
          </SMapShape>
        ) : null }
        { blocks ? blocks.map((block: any, index: number) => (
          <SMapBlock
            key={`block-${index}`}
            color={block.color}
            dead={block.dead}
            blockSize={blockSize}
            block={block}
          />
        )) : null }
      </SMap>
    </div>
  )
}
