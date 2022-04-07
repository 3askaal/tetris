import React from 'react'
import { render } from '@testing-library/react'
// import renderer from 'react-test-renderer'
import { ThemeProvider, theme } from '3oilerplate'
import { MemoryRouter } from 'react-router-dom'
import { GameContext, GameContextDefaults, GameProvider } from '../context'

const wrapper = (
  ui: any,
  { history, value: mockedValue, theme: mockedTheme, callback, ...options }: any = {},
) => {
  return render(
    <GameProvider>
      <ThemeProvider theme={{ ...theme, ...mockedTheme }}>
        <MemoryRouter initialEntries={history} initialIndex={0}>
          {ui}
        </MemoryRouter>
      </ThemeProvider>
      <GameContext.Consumer>{callback}</GameContext.Consumer>
    </GameProvider>,
    options,
  )
}

export default wrapper
