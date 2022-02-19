import React, { useContext, useEffect, useState } from 'react'
import { Box } from '3oilerplate'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'
import { generateShape, Shape } from '../../helpers/generate'
import { useInterval } from '../../helpers/interval'

export const Map = ({ style } : any) => {
  const { dimensions, grid, bombs, explosions, players }: any = useContext(GameContext)
  const [shape, setShape] = useState<Shape | null>(null)
  const [shapes, setShapes] = useState<Shape[]>([])

  // const getBombs = () => {
  //   return bombs ? Object.values(bombs).filter(({ bomb }: any) => bomb) : []
  // }

  // const getExplosions = () => {
  //   return explosions ? Object.values(explosions).filter(({ explosion }: any) => explosion) : []
  // }

  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
  }

  // const getBricks = () => {
  //   return grid ? Object.values(grid).filter(({ brick }: any) => brick) : []
  // }

  // const getPlayers = () => {
  //   return players
  // }

  // const getActivePlayers = () => {
  //   return getPlayers().filter(({ health }: any) => health)
  // }

  // const getShape = () => {
  //   return generateShape()
  // }

  useEffect(() => {
    setShape((currentShapes): any => generateShape(dimensions))
    // setShapes((currentShapes): any => [generateShape()])
  }, [])

  useEffect(() => {
    console.log('shapes[0].x: ', shapes[0]?.x)
  }, [shapes])

  useEffect(() => {
    console.log('shape.x: ', shape?.x)
  }, [shape])

  useInterval(() => {
    if (shape && (shape.y + shape.height) === dimensions.height - 1) {
      setShapes((currentShapes) => [ ...currentShapes, shape ])
      setShape(generateShape(dimensions))
    } else {
      setShape((currentShape): any => currentShape ? ({ ...currentShape, y: currentShape?.y + 1 }) : null)
    }
  }, 500)

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
      { shape && shape.width ? (
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
      ) : null }
      { shapes.map((shape: any, index: number) => (
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
