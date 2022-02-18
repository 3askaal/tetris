import React, { useState, useEffect, useContext } from 'react'
import { Spacer, Button, Input, Text, ElementGroup, ListItem } from '3oilerplate'
import { pullAt, some } from 'lodash'
import { X as XIcon, Plus as PlusIcon } from 'react-feather'
import { CONFIG } from '../../config/config'
import { GameContext } from '../../context'

export const PlayersPanel = () => {
  const { players, setPlayers, settings }: any = useContext(GameContext)
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  const onAddLocalPlayer = () => {
    const playerAmount = CONFIG.AMOUNT_PLAYERS[settings.type]

    if (!currentPlayerName) {
      setError("User field can't be empty")
      return
    }

    if (players.length >= playerAmount.max) {
      setCurrentPlayerName('')
      setError(`Can't add more then ${playerAmount.max} players in ${settings.type} mode.`)
      return
    }

    if (some(players, { name: currentPlayerName })) {
      setCurrentPlayerName('')
      setError('User added already')
      return
    }

    setCurrentPlayerName('')
    setPlayers([ ...players, { name: currentPlayerName } ])
  }

  const onRemoveLocalPlayer = (index: number) => {
    const newLocalPlayers = [ ...players ]
    pullAt(newLocalPlayers, [index])
    setPlayers(newLocalPlayers)
  }

  const onUpdateLocalPlayer = (value: string, index: number) => {
    if (value === '') {
      onRemoveLocalPlayer(index)
    } else {
      const newLocalPlayers = [ ...players ]
      newLocalPlayers[index].name = value
      setPlayers(newLocalPlayers)
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [error, currentPlayerName])

  return (
    <Spacer size="s">
      {players.map((player: any, index: number) => (
        <Spacer
          key={index.toString()}
          gutter="s"
          s={{ justifyContent: 'center', flexWrap: 'nowrap' }}
        >
          <ElementGroup>
            <Input
              s={{ flexGrow: 1 }}
              value={player.name}
              onChange={(value: string) => onUpdateLocalPlayer(value, index)}
            />
            <Button onClick={() => onRemoveLocalPlayer(index)}>
              <XIcon />
            </Button>
          </ElementGroup>
        </Spacer>
      ))}
      { players.length < CONFIG.AMOUNT_PLAYERS[settings.type || 'local'].max && (
        <Spacer size="xs">
          <Spacer>
            <ElementGroup>
              <Input
                // placeholder="Username"
                placeholder={`Player ${players.length + 1}`}
                s={{ flexGrow: 1 }}
                value={currentPlayerName}
                isNegative={error}
                onChange={(value: any) => setCurrentPlayerName(value)}
              />
              <Button type="submit" onClick={onAddLocalPlayer}>
                <PlusIcon />
              </Button>
            </ElementGroup>
          </Spacer>
          <Text size="s" s={{ color: 'negative' }}>
            {error}
          </Text>
        </Spacer>
      )}
    </Spacer>
  )
}
