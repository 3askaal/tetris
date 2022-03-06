import { s, darken } from '3oilerplate'
import { colors } from '../../style'

export const SButton = s.button(({ isPressed }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '40px',
  cursor: 'pointer',
  color: darken('white', 0.5),
  backgroundColor: darken(colors.background, .2),
  border: '.15rem solid',
  borderTopColor: darken(colors.background, .6),
  borderRightColor: darken(colors.background, .6),
  borderLeftColor: darken(colors.background, 1),
  borderBottomColor: darken(colors.background, 1),
  borderRadius: '100%',
  transition: 'all .25s ease',

  ...(isPressed && {
    backgroundColor: darken(colors.background, 1),
  }),

  'svg': {
    strokeWidth: 3,
    stroke: 'white'
  }
}))
