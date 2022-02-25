import { s } from '3oilerplate'
import chroma from 'chroma-js'

export const SMap = s.div(({ theme, dimensions, width, height }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `${height}rem`,
  width: `${width}rem`,
  backgroundColor: chroma('#000').brighten(.2).hex(),
}))

export const SMapShape = s.div(({ theme, isActive }: any) => ({
  // ...(isActive && {
  //   transition: 'all .075s ease-in-out'
  // })
}))

export const SMapBlock = s.div(({ theme, color = '#fff' }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  border: '0.15rem solid',
  // Light
  borderRightColor: chroma(color).brighten(1).hex(),
  borderTopColor: chroma(color).brighten(1).hex(),
  // Middle
  backgroundColor: chroma(color).hex(),
  // Dark
  borderLeftColor: chroma(color).darken(1).hex(),
  borderBottomColor: chroma(color).darken(1).hex(),
  transition: 'all .025s linear'
}))
