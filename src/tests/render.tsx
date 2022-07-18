import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, theme } from '3oilerplate'
import { MemoryRouter } from 'react-router-dom'
import { GameContext, GameContextDefaults } from '../context'

const wrapper = (
  ui: any,
  { history, value: mockedValue, theme: mockedTheme, ...options }: any = {},
) => {
  return render(
    <GameContext.Provider value={{ ...GameContextDefaults, ...mockedValue }}>
      <ThemeProvider theme={{ ...theme, ...mockedTheme }}>
        <MemoryRouter initialEntries={history} initialIndex={0}>
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </GameContext.Provider>,
    options,
  )
}

export default wrapper
