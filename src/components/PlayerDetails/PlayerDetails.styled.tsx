import { s } from '3oilerplate'
import { healthStatusColor } from '../../style'

export const SPlayerDetails = s.div(({ theme, index }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: ['30rem', '20rem'],
}))

export const SPlayerDetailsMove = s.div(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  flexBasis: '60%',

  '> *': {
    flexBasis: '35%'
  }
}))

export const SPlayerDetailsMiddle = s.div(({ theme }: any) => ({
  flexDirection: 'column',
  justifyContent: 'center',
}))


export const SPlayerDetailsButton = s.button(({ theme, type, color }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['1.8rem', '2.6rem'],
  backgroundColor: 'backgroundLight',
  border: 'transparent',
  margin: '.25rem',
  borderRadius: '.125rem',
  color: 'white',
  flexBasis: '33.33%',
  cursor: 'pointer',

  ...type === 'bomb' && ({
    flexBasis: '25%'
  }),

  ...type !== 'bomb' && ({
    width: '100%',
  }),

  'svg': {
    strokeWidth: 3,
    stroke: 'white'
  }
}))

export const SPlayerDetailsHealth = s.div(({ index, health }: any) => ({
  position: 'relative',
  height: '6px',
  width: '100%',
  border: '1px solid',
  borderColor: healthStatusColor(health),
  [['mb', 'mt'][index]]: 'xs',
  borderRadius: '.5rem'
}))

export const SPlayerDetailsHealthProgress = s.div(({ index, health }: any) => ({
  position: 'absolute',
  backgroundColor: healthStatusColor(health),
  width: `${health}%`,
  top: 0,
  bottom: 0,
  [['right', 'left'][index]]: 0,
}))
