import React, { useContext, useEffect, useRef, useState } from 'react'
import { SMap, SMapBlock, SMapShape } from './Map.styled'
import { GameContext } from '../../context'
import { min } from 'lodash'

export const Map = () => {
  const mapRef = useRef<any>(null)
  const {
    dimensions,
    shape,
    blocks
  } = useContext(GameContext)

  const [blockSize, setBlockSize] = useState(0)
  const [mapDimensions, setMapDimensions] = useState<{ width?: string, height?: string }>({})

  useEffect(() => {
    if (!mapRef.current || !dimensions?.width || !dimensions?.height) return

    const maxMapWidth = mapRef.current.getBoundingClientRect().width * 0.98
    const maxMapHeight = mapRef.current.getBoundingClientRect().height * 0.98

    const evenMapWidth = maxMapWidth - (maxMapWidth % 2)
    const evenMapheight = maxMapHeight - (maxMapHeight % 2)

    const blockSizeX = Math.floor(evenMapWidth / dimensions.width)
    const blockSizeY = Math.floor(evenMapheight / dimensions.height)
    const newBlockSize = min([blockSizeX, blockSizeY]) as number

    setMapDimensions({
      width: newBlockSize * dimensions.width + 'px',
      height: newBlockSize * dimensions.height + 'px',
    })

    setBlockSize(newBlockSize)
  }, [mapRef, dimensions?.width, dimensions?.height])

  return (
    <div ref={mapRef} style={{ width: mapDimensions.width || '100%', height: mapDimensions.height || '100%' }}>
      <SMap s={{ width: mapDimensions.width || '100%', height: mapDimensions.height || '100%' }} >
        { shape ? (
          <SMapShape
            data-testid="shape-active"
            key={`shape-active`}
            shape={shape}
            blockSize={blockSize}
          >
            { shape.blocks.map((block: any, index: number) => (
              <SMapBlock
                data-testid={`shape-active-block-${index}`}
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
            data-testid={`block-${index}`}
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
