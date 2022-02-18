import React, { useContext } from 'react'
import { SMap, SMapStone, SMapCharacter, SMapBrick, SMapBomb } from './Map.styled'
import { GameContext } from '../../context'
import { Explosion } from '../Explosion/Explosion'

export const Map = ({ style, blocks } : any) => {
  const { grid, bombs, explosions, players }: any = useContext(GameContext)

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
    <SMap style={{style}} blocks={blocks + 1}>
      { getActivePlayers().map(({x, y, color}: any, index: number) => (
        <SMapCharacter
          key={index}
          s={{
            transform: `translate3d(${x}rem, ${y}rem, 0)`
          }}
          color={color}
        />
      )) }
      { getStones().map(({x, y}: any, index: number) => (
        <SMapStone
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) }
      { getBricks().map(({x, y}: any, index: number) => (
        <SMapBrick
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`,
          }}
        />
      )) }
      { getBombs().map(({x, y}: any, index: number) => (
        <SMapBomb
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`,
          }}
        />
      )) }
      { getExplosions().map((explosion: any, index: number) => (
        <Explosion explosion={explosion} index={index} />
      ))}
    </SMap>
  )
}
