import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box, Popup, Button, Text, Spacer } from '3oilerplate'
import ReactGA from 'react-ga4'
import { PlayerDetails, Map } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import faker from 'faker'
import { Timer } from '../../components/Timer/Timer'
import { useKeyboardBindings } from '../../helpers/keyboard'
import { useHistory, useLocation, useParams } from 'react-router-dom'

const PlayView = () => {
  const search = useLocation().search;
  const { roomId }: any = useParams();
  const history = useHistory();
  const {
    socket,
    players,
    remainingTime,
    onStartGame,
    dimensions,
    onGameMove,
    onGameBomb,
    settings,
    setPlayers,
    setSettings,
    gameOver,
    getWinner,
    getCurrentPlayer,
  } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });
    onStartGame()

    const debug = new URLSearchParams(search).get('debug');

    if (debug) {
      setSettings({ type: 'local' })
      setPlayers([{ name: faker.name.firstName(), x: 0, y: 0 }, { name: faker.name.firstName(), x: 0, y: 0 }])
    }
    // else if (settings.type !== 'local' && !roomId) {
    //   history.push('/')
    // }
  }, [])

  useEffect(() => {
    if (gameOver()) {
      ReactGA4.event({
        category: "actions",
        action: "game:over",
        label: `${players?.map(({ name }: any) => name).join(' vs. ')}. ${!remainingTime ? 'Time limit reached.' : `Winner: ${getWinner().name}`}`,
      });
    }
  }, [players])

  return (
    <Wrapper s={{ padding: ['xs', 'xs', 's'] }}>
      <Container s={{ alignItems: 'center', pt: '4rem' }}>
        <Map />
      </Container>
      {/* { gameOver() && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({}, false)}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>{
            remainingTime ?
              `${getWinner().name} won!` :
              `Time limit reached!`
          } Click restart to start over!</Text>
        </Popup>
      ) } */}
    </Wrapper>
  )
}

export default PlayView
