import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Popup, Button, Text } from '3oilerplate'
import ReactGA from 'react-ga4'
import { PlayerDetails, Map } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import { useKeyboardBindings } from '../../helpers/keyboard'

const PlayView = () => {
  const {
    onStartGame,
    gameOver,
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

  return (
    <Wrapper s={{ padding: 'm' }}>
      <Container s={{ alignItems: 'center', justifyContent: 'center' }}>
        <Map />
        <PlayerDetails s={{ pt: 'm' }} />
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({})}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>You lost! Click restart to play again!</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
