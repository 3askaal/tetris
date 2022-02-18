import React from 'react'
import { SExplosion, SExplosionCenter, SExplosionDirection, SExplosionEdge, SExplosionSmoke } from './Explosion.styled'
import { times } from 'lodash'

export const Explosion = ({ explosion: { x, y, distance }, index } : any) => {
  return (
    <SExplosion key={`explosion${index}`} x={x} y ={y}>
      <SExplosionSmoke size={1.6} />
      { ['top', 'bottom', 'left', 'right'].map((direction, index) => (
        <SExplosionCenter direction={direction} distance={distance} index={index} />
      )) }
      { Object.keys(distance).map((key: string, index: number) => distance[key] ? (
        <SExplosionDirection
          key={`explosionDirection${index}`}
          x={x}
          y={y}
          direction={key}
          distance={distance}
        >
          {/* <SExplosionSmoke direction={key} delay={.1} /> */}
          <SExplosionEdge
            direction={key}
            {...key === 'right' && distance[key] && { s: {
              right: 0,
            }}}
            {...key === 'up' && distance[key] && { s: {
              top: 0,
            }}}
            {...key === 'down' && distance[key] && { s: {
              bottom: 0,
            }}}
            {...key === 'left' && distance[key] && { s: {
              left: 0,
            }}}
          />
        </SExplosionDirection>
      ) : null) }
    </SExplosion>
  )
}
