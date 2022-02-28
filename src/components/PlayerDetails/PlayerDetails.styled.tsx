import { s, darken, brighten } from '3oilerplate'
import { transcode } from 'buffer'
import { colors } from '../../style'

export const SPlayerDetails = s.div(({ theme, isDesktop }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: ['30rem', '21rem'],
  mt: '1rem'
}))

export const SPlayerDetailsButton = s.button(({ theme, isDesktop, type, isPressed }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['2rem', '4rem', '3rem'],
  color: darken('white', 0.5),
  flexBasis: '25%',
  flexGrow: 1,
  margin: '.25rem',
  flexShrink: 1,
  cursor: 'pointer',
  backgroundColor: darken(colors.background, .4),
  border: '.15rem solid',
  borderRadius: '.25rem',
  borderTopColor: darken(colors.background, .8),
  borderRightColor: darken(colors.background, .8),
  borderLeftColor: darken(colors.background, 1.2),
  borderBottomColor: darken(colors.background, 1.2),
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
