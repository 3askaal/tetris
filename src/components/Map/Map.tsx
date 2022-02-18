import React, { useContext, useEffect, useState } from 'react'
import { times } from 'lodash'
import { Box } from '3oilerplate'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'
import { generateShape } from '../../helpers/generate'

export const Map = ({ style } : any) => {
  const { dimensions, grid, bombs, explosions, players }: any = useContext(GameContext)
  const [shapes, setShapes] = useState([])

  const getBombs = () => {
    return bombs ? Object.values(bombs).filter(({ bomb }: any) => bomb) : []
  }

  const getExplosions = () => {
    return explosions ? Object.values(explosions).filter(({ explosion }: any) => explosion) : []
  }

  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
  }

  const getBricks = () => {
    return grid ? Object.values(grid).filter(({ brick }: any) => brick) : []
  }

  const getPlayers = () => {
    return players
  }

  const getActivePlayers = () => {
    return getPlayers().filter(({ health }: any) => health)
  }

  const getShape = () => {
    return generateShape()
  }

  useEffect(() => {
    setShapes((currentShapes): any => [...currentShapes, generateShape()])
  }, [])

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
          color="#787A91"
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) }
      {}
      { shapes.map((shape: any, index: number) => (
        <Box s={{
          position: 'relative',
          left: '7rem',
          top: '10rem',
          height: '5rem',
          width: '5rem',
          border: '1px solid red'
        }}>
          { shape.map((block: any, index: number) => (
            <SMapBlock
              color="#787A91"
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
