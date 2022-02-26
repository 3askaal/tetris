import { createGlobalStyle } from 'styled-components'

export const LocalGlobalStyle: any = createGlobalStyle<any>({
  '*': {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },

  svg: {
    display: 'block',
    maxWidth: '16px !important',
    maxHeight: '16px !important',
    stroke: 'currentcolor !important'
  },
})
