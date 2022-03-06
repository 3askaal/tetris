import { s, darken, brighten } from '3oilerplate'
import { colors } from '../../style'

export const SPlayerDetails = s.div(({ theme, isDesktop }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: [null, null, '22rem'],
}))

export const SPlayerDetailsButton = s.button(({ theme, isDesktop, type, isPressed }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['60px', '60px', '50px'],
  color: darken('white', 0.5),
  flexBasis: '25%',
  flexGrow: 1,
  margin: '.25rem',
  flexShrink: 1,
  cursor: 'pointer',
  backgroundColor: darken(colors.background, .4),
  border: '.15rem solid',
  borderTopColor: darken(colors.background, .8),
  borderRightColor: darken(colors.background, .8),
  borderLeftColor: darken(colors.background, 1.2),
  borderBottomColor: darken(colors.background, 1.2),
  borderRadius: '.25rem',
  transition: 'all .25s ease',

  ...(isPressed && {
    backgroundColor: darken(colors.background, 1),
  }),

  ...isDesktop && ({
    paddingX: 's',
    pointerEvents: 'none',

    ...type === 'SPACE' && ({
      flexBasis: '40%',
      justifyContent: 'space-between',
    }),

    ...type === 'SHIFT' && ({
      flexBasis: '30%',
      justifyContent: 'space-between',
    }),

    ...(type === 'MOVE') && ({
      flexBasis: '15%',
    }),
  }),

  'svg': {
    strokeWidth: 3,
    stroke: 'white'
  }
}))
