import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, theme } from '3oilerplate'
import { MemoryRouter } from 'react-router-dom'

const wrapper = (
  ui: any,
  { history, theme: mockedTheme, ...options }: any = {},
) =>
  render(
    <ThemeProvider theme={{ ...theme, ...mockedTheme }}>
      <MemoryRouter initialEntries={history} initialIndex={0}>
        {ui}
      </MemoryRouter>
    </ThemeProvider>,
    options,
  )

export default wrapper
