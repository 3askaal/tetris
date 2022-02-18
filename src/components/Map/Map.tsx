import React, { useContext } from 'react'
import { times } from 'lodash'
import { SMap, SMapBlock } from './Map.styled'
import { GameContext } from '../../context'

export const Map = ({ style } : any) => {
  const { dimensions, grid, bombs, explosions, players }: any = useContext(GameContext)

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
    </SMap>
  )
}
