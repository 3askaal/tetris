import { s } from '3oilerplate'
import { fontSize } from 'styled-system'

export const SApp = s.div(
  ({ theme }: any) => ({
    fontFamily: theme.fonts.base,
    color: theme.colors.white,
    backgroundColor: theme.colors.background,
    width: '100%',
    height: '100%',
    flexGrow: 1,
    fontSize: '.8em'
  }),
  fontSize,
)
