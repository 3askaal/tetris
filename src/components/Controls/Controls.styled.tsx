import { s, darken } from '3oilerplate'
import { colors } from '../../style'

export const SControls = s.div(({ theme, isDesktop }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: [null, null, '24rem'],
}))

export const SControlsButton = s.button(({ theme, isDesktop, type, isPressed }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['3rem', '4rem', '3rem'],
  color: darken('white', 0.5),
  flexBasis: '25%',
  flexGrow: 1,
  margin: '.2rem',
  flexShrink: 1,
  cursor: 'pointer',
  backgroundColor: darken(colors.background, .2),
  borderWidth: ['.175rem', '.175rem', '.125rem'],
  borderStyle: 'solid',
  borderTopColor: darken(colors.background, .6),
  borderRightColor: darken(colors.background, .6),
  borderLeftColor: darken(colors.background, 1),
  borderBottomColor: darken(colors.background, 1),
  borderRadius: '.25rem',
  transition: 'all .25s ease',

  ...(isPressed && {
    backgroundColor: darken(colors.background, 1),
  }),

  ...isDesktop && ({
    paddingX: 's',
    pointerEvents: 'none',

    ...type === 'SPACE' && ({
      flexBasis: '45%',
      justifyContent: 'space-between',
    }),

    ...type === 'SHIFT' && ({
      flexBasis: '25%',
      justifyContent: 'space-between',
    }),

    ...(type === 'MOVE') && ({
      flexBasis: '15%',
    }),
  }),

  'svg': {
    strokeWidth: 2,
  }
}))
