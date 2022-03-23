import React, { useContext, useEffect } from 'react'
import { Spacer, Box, Container, Wrapper, Popup, Text, Button } from '3oilerplate'
import ReactGA from 'react-ga4'
import isMobile from 'is-mobile'
import { Controls, Map, Score } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import { useKeyboardBindings } from '../../helpers/keyboard'
import useBreakpoint from 'use-breakpoint'

const BREAKPOINTS = { mobile: 0, desktop: 768 }

const PlayView = () => {
  const {
    onStartGame,
    gameOver,
    gamePaused,
    setGamePaused,
    score,
  } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });
    onStartGame()
  }, [])

  useEffect(() => {
    if (gameOver) {
      ReactGA4.event({
        category: "actions",
        action: "game:over",
      });
    }
  }, [gameOver])

  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'desktop');
  const isDesktop = !isMobile({ tablet: true }) && breakpoint === 'desktop'

  return (
    <Wrapper s={{ p: ['s', 's', 'm'] }}>
      <Container s={{ p: 0 }}>
        <Box s={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
          <Box s={{ display: 'flex', flexGrow: 1, alignItems: 'flex-end' }}>
            <Score />
          </Box>
          <Map />
          <Box s={{
            display: 'flex',
            width: '100%',
            flexGrow: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 'm',
          }}>
            <Controls />
          </Box>
        </Box>
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({})}>Restart</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>Game over! Click restart to play again.</Text>
        </Popup>
      ) }
      { gamePaused && (
        <Popup
          actions={[
            <Button onClick={() => setGamePaused(false)}>Resume</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>Game paused! Click resume to continue playing.</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
