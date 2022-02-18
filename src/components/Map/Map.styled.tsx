import { s } from '3oilerplate'
import chroma from 'chroma-js'

export const SMap = s.div(({ theme, blocks }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `calc(${blocks}rem + .5rem)`,
  width: `calc(${blocks}rem + .5rem)`,
  border: '.25rem solid',
  // Light
  borderRightColor: chroma('#fff').darken(0.5).hex(),
  borderTopColor: chroma('#fff').darken(0.5).hex(),
  // Middle
  backgroundColor: chroma('#fff').darken(1).hex(),
  // Dark
  borderLeftColor: chroma('#fff').darken(1.5).hex(),
  borderBottomColor: chroma('#fff').darken(1.5).hex(),
}))

export const SMapStone = s.div(({ theme }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  border: '0.15rem solid',
  // Light
  borderRightColor: chroma('#fff').darken(1.5).hex(),
  borderTopColor: chroma('#fff').darken(1.5).hex(),
  // Middle
  backgroundColor: chroma('#fff').darken(2.5).hex(),
  // Dark
  borderLeftColor: chroma('#fff').darken(3.5).hex(),
  borderBottomColor: chroma('#fff').darken(3.5).hex(),
}))

export const SMapCharacter = s.div(({ theme, color }: any) => ({
  position: 'absolute',
  backgroundColor: color,
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  borderRadius: '100%',
  transition: 'transform .1s ease'
}))

export const SMapBrick = s.div(() => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  border: '0.2rem solid',
  // Light
  borderTopColor: chroma('#C19191').brighten(.2).hex(),
  borderRightColor: chroma('#C19191').brighten(.2).hex(),
  // Middle
  backgroundColor: '#AA7070',
  // Dark
  borderLeftColor: chroma('#8B5D5D').darken(.5).hex(),
  borderBottomColor: chroma('#8B5D5D').darken(.5).hex(),
}))

export const SMapBomb = s.div(() => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  backgroundColor: '#222',
  border: '0.15rem solid #555',
}))
