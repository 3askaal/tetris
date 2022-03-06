import { s, brighten } from '3oilerplate'
import chroma from 'chroma-js'

export const SMap = s.div(({ theme, dimensions, width, height }: any) => ({
  display: 'flex',
  position: 'relative',
  width: `${width}px`,
  height: `${height}px`,
  margin: 'auto',
  backgroundColor: brighten('#000', .2),
  boxShadow: '0 0 0 2px ' + brighten('#000', .4),
}))

export const SMapShape = s.div(({ theme, isActive }: any) => ({
  // ...(isActive && {
  //   transition: 'all .075s ease-in-out'
  // })
}))

export const SMapBlock = s.div(({ theme, color = '#fff', dead, blockSize }: any) => ({
  position: 'absolute',
  width: `${blockSize}px`,
  height: `${blockSize}px`,
  border: '.15rem solid',
  borderWidth: ['2px', '2px', '3px'],
  // Light
  borderRightColor: chroma(color).brighten(1).hex(),
  borderTopColor: chroma(color).brighten(1).hex(),
  // Middle
  backgroundColor: chroma(color).hex(),
  // Dark
  borderLeftColor: chroma(color).darken(1).hex(),
  borderBottomColor: chroma(color).darken(1).hex(),
  transition: 'all .025s linear',

  ...(dead && {
    // Light
    borderRightColor: chroma('#fff').darken(1.5).hex(),
    borderTopColor: chroma('#fff').darken(1.5).hex(),
    // Middle
    backgroundColor: chroma('#fff').darken(2.5).hex(),
    // Dark
    borderLeftColor: chroma('#fff').darken(3.5).hex(),
    borderBottomColor: chroma('#fff').darken(3.5).hex(),
  })
}))
