import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga4'
import { GlobalStyle, theme } from '3oilerplate'
import { GameProvider } from '../context'
import { PlayView } from '../views'
import { LocalGlobalStyle, fonts, colors } from '../style'
import { SApp } from './App.styled'
import './fonts.css'

export const history = createBrowserHistory()

ReactGA.initialize('G-ELXJS2W0GL', {
  testMode: process.env.NODE_ENV !== 'production'
})

const App = () => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        rootFontSizes: ['12px', '14px', '16px', '18px', '20px'],
        fonts: {
          ...theme.fonts,
          ...fonts,
        },
        colors: {
          ...theme.colors,
          ...colors,
        },
        components: {
          Input: {
            default: {
              padding: 'xs',
            },
            variants: {
              isBlock: {
                width: '100% !important'
              }
            }
          },
          Button: {
            default: {
              paddingX: 's',
              paddingY: 'xs',
            },
          },
        },
      }}
    >
      <SApp>
        <GlobalStyle />
        <LocalGlobalStyle />
        <Router history={history}>
          {/* <SocketIOProvider url={SOCKET_URL}> */}
            <Switch>
              {/* <Route exact path="/">
                <HomeView />
              </Route> */}
              <GameProvider>
                {/* <SocketProvider> */}
                  {/* <Route exact path="/setup">
                    <SetupView />
                  </Route>
                  <Route exact path="/rooms">
                    <RoomsView />
                  </Route>
                  <Route exact path="/rooms/:roomId">
                    <LobbyView />
                  </Route> */}
                  <Route exact path="/">
                    <PlayView />
                  </Route>
                {/* </SocketProvider> */}
              </GameProvider>
            </Switch>
          {/* </SocketIOProvider> */}
        </Router>
      </SApp>
    </ThemeProvider>
  )
}

export default App
