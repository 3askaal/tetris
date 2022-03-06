import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '3oilerplate'
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

  const calcMapSize = () => {
    let containerWidth = mapRef.current?.getBoundingClientRect().width
    let containerHeight = mapRef.current?.getBoundingClientRect().height

    containerWidth = (containerWidth - (containerWidth % 2)) * 0.95
    containerHeight = (containerHeight - (containerHeight % 2)) * 0.95

    const blockSizeX = Math.floor(containerWidth / (dimensions?.width || 0))
    const blockSizeY = Math.floor(containerHeight / (dimensions?.height || 0))
    const blockSize = min([blockSizeX, blockSizeY]) as number

    console.log(blockSizeX)
    console.log(blockSizeY)
    console.log(blockSize)

    console.log(blockSize)

    setMapDimensions({
      width: blockSize * dimensions.width,
      height: blockSize * dimensions.height,
    })

    setBlockSize(blockSize)
  }

  useEffect(() => {
    if (mapRef.current) {
      calcMapSize()
    }
  }, [mapRef])

  return (
    <div ref={mapRef} style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center' }}>
        <SMap style={{style}} width={mapDimensions.width} height={mapDimensions.height}>
          { shape ? (
            <SMapShape
              key={`shape-active`}
              isActive={true}
              s={{
                position: 'absolute',
                left: `${shape.x * blockSize}px`,
                top: `${shape.y * blockSize}px`,
                height: `${shape.height * blockSize}px`,
                width: `${shape.width * blockSize}px`,
              }}
            >
              { shape.blocks.map((block: any, index: number) => (
                <SMapBlock
                  key={`block-active-${index}`}
                  color={shape.color}
                  blockSize={blockSize}
                  s={{
                    left: `${block.x * blockSize}px`,
                    top: `${block.y * blockSize}px`
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
              blockSize={blockSize}
              s={{
                left: `${block.x * blockSize}px`,
                top: `${block.y * blockSize}px`
              }}
            />
          )) }
        </SMap>
    </div>
  )
}
