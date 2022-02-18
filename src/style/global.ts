import { createGlobalStyle } from 'styled-components'

export const LocalGlobalStyle: any = createGlobalStyle<any>({
  '*': {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },

  html: {
    height: '100%',
  },

  svg: {
    display: 'block',
    maxWidth: '14px !important',
    maxHeight: '14px !important',
  },
})
