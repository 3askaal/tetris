import React, { useContext, useEffect, useState } from 'react'
import { Container, Wrapper, Spacer, Button } from '3oilerplate'
import { PlayersPanel } from './PlayersPanel'
import { GameContext } from '../../context'
import { CONFIG } from '../../config/config'

const SetupView = () => {
  const { players, onStartGame, settings, setSettings } = useContext(GameContext)
  const [activePanel] = useState('players')

  useEffect(() => {
    setSettings({ type: 'local' })
  }, [])

  const onLaunch = () => {
    onStartGame()
  }

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>

        <Spacer size="m" s={{ flexGrow: 1 }}>
          {/* <ElementGroup style={{ width: '100%' }}>
            <Button
              isBlock
              isOutline={activePanel !== 'settings'}
              onClick={() => setActivePanel('settings')}
            >
              Settings
            </Button>
            <Button
              isBlock
              isOutline={activePanel !== 'players'}
              onClick={() => setActivePanel('players')}
            >
              Players
            </Button>
          </ElementGroup> */}

          <Spacer size="s" s={{ flexGrow: 1, justifyContent: 'center' }}>
            { activePanel === 'players' ? <PlayersPanel /> : null }
          </Spacer>
        </Spacer>

        <Button isBlock isDisabled={players && players?.length < CONFIG.AMOUNT_PLAYERS[settings?.type || 'local']?.min} onClick={onLaunch}>
          Start
        </Button>

      </Container>
    </Wrapper>
  )
}

export default SetupView
