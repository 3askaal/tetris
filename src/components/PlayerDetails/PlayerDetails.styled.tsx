import { s, darken, brighten } from '3oilerplate'
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
  flexBasis: '80%',

  '> *': {
    flexBasis: '35%'
  }
}))

export const SPlayerDetailsMiddle = s.div(({ theme }: any) => ({
  flexDirection: 'column',
  justifyContent: 'center',
}))


export const SPlayerDetailsButton = s.button(({ theme, isDesktop, type }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['2rem', '4rem', '3rem'],
  // backgroundColor: 'backgroundLight',
  // border: 'transparent',
  margin: '.25rem',
  // borderRadius: '.125rem',
  color: darken('white', 0.5),
  flexBasis: '50%',
  cursor: 'pointer',
  backgroundColor: brighten('#000', .6),
  border: '.15rem solid',
  borderRadius: '.25rem',
  borderLeftColor: brighten('#000', .2),
  borderBottomColor: brighten('#000', .2),
  borderTopColor: brighten('#000', .4),
  borderRightColor: brighten('#000', .4),
  // boxShadow: '1px -1px 5px 0 rgba(0, 0, 0, 0.25)',

  ...isDesktop && ({
    paddingX: 's',

    ...type === 'SPACE' && ({
      flexBasis: '40%',
      justifyContent: 'space-between'
    }),

    ...type === 'SHIFT' && ({
      flexBasis: '30%',
      justifyContent: 'space-between'
    }),

    ...type === 'MOVE' && ({
      flexBasis: '15%',
    }),
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
