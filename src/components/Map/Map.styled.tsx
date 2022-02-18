import { s } from '3oilerplate'
import chroma from 'chroma-js'

export const SMap = s.div(({ theme, dimensions, width, height }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `${height}rem`,
  width: `${width}rem`,
  backgroundColor: chroma('000').darken(1).hex(),
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
}))

// export const SMapCharacter = s.div(({ theme, color }: any) => ({
//   position: 'absolute',
//   backgroundColor: color,
//   width: '.8rem',
//   height: '.8rem',
//   margin: '.1rem',
//   borderRadius: '100%',
//   transition: 'transform .1s ease'
// }))

// export const SMapBrick = s.div(() => ({
//   position: 'absolute',
//   width: '1rem',
//   height: '1rem',
//   border: '0.2rem solid',
//   // Light
//   borderTopColor: chroma('#C19191').brighten(.2).hex(),
//   borderRightColor: chroma('#C19191').brighten(.2).hex(),
//   // Middle
//   backgroundColor: '#AA7070',
//   // Dark
//   borderLeftColor: chroma('#8B5D5D').darken(.5).hex(),
//   borderBottomColor: chroma('#8B5D5D').darken(.5).hex(),
// }))

// export const SMapBomb = s.div(() => ({
//   position: 'absolute',
//   borderRadius: '100%',
//   width: '.8rem',
//   height: '.8rem',
//   margin: '.1rem',
//   backgroundColor: '#222',
//   border: '0.15rem solid #555',
// }))
