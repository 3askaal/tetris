import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { some } from 'lodash'
import { Box, Container, Wrapper, Spacer, Button, List, ListItem, Text, Title, Input, ElementGroup } from '3oilerplate'
import { ArrowRight as ArrowRightIcon, Check as CheckIcon } from 'react-feather'
import { GameContext, SocketContext } from '../../context'
import { CONFIG } from '../../config/config'
import { useSocket } from 'use-socketio'

const LobbyView = () => {
  const params: any = useParams()
  const { socket } = useSocket()
  const { players, settings, setSettings, currentPlayer, getOpponents } = useContext(GameContext)
  const { joinRoom, startGame } = useContext(SocketContext)

  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    setSettings({ type: 'online' })

    if (params.roomId !== socket.id) {
      joinRoom(params.roomId)
    }

  }, [])

  const onPickUsername = () => {
    const playerAmount = CONFIG.AMOUNT_PLAYERS[settings.type]

    if (error) {
      setError('')
    }

    if (!currentPlayerName) {
      setError("User field can't be empty")
      console.log("User field can't be empty")
      return
    }

    if (players.length >= playerAmount.max) {
      setCurrentPlayerName('')
      setError(`Can't add more then ${CONFIG.AMOUNT_PLAYERS[settings.type].max} players in ${settings.type} mode.`)
      console.log(`Can't add more then ${CONFIG.AMOUNT_PLAYERS[settings.type].max} players in ${settings.type} mode.`)
      return
    }

    if (some(players, { name: currentPlayerName })) {
      setCurrentPlayerName('')
      setError('User added already')
      console.log('User added already')
      return
    }

    if (currentPlayerName.length < 3) {
      setError('Username has to be at least 3 characters long')
      return
    }

    socket.emit('update:player', { name: currentPlayerName })
  }

  const allPlayersHaveUsernames = () => players.every(({ name }: any) => name)
  const rightAmountOfPlayers = () => players?.length > CONFIG.AMOUNT_PLAYERS[settings.type]?.min && players?.length < CONFIG.AMOUNT_PLAYERS[settings.type]?.max

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Spacer size="m" s={{ flexGrow: 1 }}>
          <ElementGroup>
            <Input
              placeholder="Pick your username"
              value={currentPlayerName}
              onChange={(value: any) => setCurrentPlayerName(value)}
              s={{ flexGrow: 1 }}
              isNegative={error}
              isPositive={currentPlayer?.name}
            />
            <Button
              onClick={onPickUsername}
              isPositive={currentPlayer?.name}
            >
              { !currentPlayer?.name ? <ArrowRightIcon /> : <CheckIcon /> }
            </Button>
          </ElementGroup>
          { error && (
            <Text size="s" s={{ color: 'negative' }}>
              {error}
            </Text>
          )}
          <Title>vs.</Title>
          <List>
            { getOpponents().map((player: any, index: number) => (
              <ListItem>
                { player.name || `Player ${index + 2}` }
              </ListItem>
            ))}
          </List>
        </Spacer>
        <Box s={{ display: 'flex', width: '100%' }}>
          <Button
            isDisabled={!rightAmountOfPlayers() && !allPlayersHaveUsernames()}
            isBlock
            onClick={() => startGame()}
          >
            Start Game
          </Button>
        </Box>
      </Container>
    </Wrapper>
  )
}

export default LobbyView
