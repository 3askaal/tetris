import { s, darken, brighten } from '3oilerplate'
import { transcode } from 'buffer'

export const SPlayerDetails = s.div(({ theme, isDesktop }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: ['30rem', '20rem'],
  mt: '1rem'
}))

export const SPlayerDetailsButton = s.div(({ theme, isDesktop, type, isPressed }: any) => ({
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
  backgroundColor: brighten('#000', .6),
  border: '.15rem solid',
  borderRadius: '.25rem',
  borderLeftColor: brighten('#000', .2),
  borderBottomColor: brighten('#000', .2),
  borderTopColor: brighten('#000', .4),
  borderRightColor: brighten('#000', .4),
  appearance: 'none',
  outline: 'none !important',

  ...(isPressed && {
    backgroundColor: 'primary',
    borderColor: 'primaryDark',
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
