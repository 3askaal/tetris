import React, { createContext, useEffect, useState } from 'react'
import { useSocket } from "use-socketio";
import { useHistory } from 'react-router-dom'
import ReactGA4 from 'react-ga4'
import { useInterval } from '../helpers/interval';
import { generateDamage } from '../helpers/actions';
import { Socket } from 'socket.io-client';
import { IBomb, IExplosion, IGrid, IPlayer, ISettings } from '../types';
import { generateGrid, generatePlayers } from '../helpers/generate';

interface GameContextType {
  socket?: Socket;

  dimensions?: { height: number, width: number };
  grid?: IGrid;
  bombs?: IBomb;
  explosions?: IExplosion;
  players: IPlayer[];
  settings: ISettings;
  remainingTime?: number;

  getOpponents?: any;
  getCurrentPlayer?: any;

  [key: string]: any;
}


export const GameContext = createContext<GameContextType>({
  settings: {
    type: 'local'
  },
  players: []
})

interface MoveActionPayload {
  playerIndex: number;
  direction: 'x' | 'y';
  movement: number;
}

interface BombActionPayload {
  playerIndex: number;
}

export const GameProvider = ({ children }: any) => {
  const history = useHistory()
  const { socket } = useSocket()
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>()
  const [rooms, setRooms] = useState<any>([])
  const [settings, setSettings] = useState<any>({})
  const [remainingTime, setRemainingTime] = useState<number>(1000)
  const [dimensions] = useState({ height: 40, width: 20 })
  const [grid, setGrid] = useState<any>({})
  const [bombs, setBombs] = useState<any>(null)
  const [explosions, setExplosions] = useState<any>(null)

  const onStartGame = (args: any, restart?: boolean) => {
    // initialize data
    const { grid: newGrid, players: newPlayers, time: remainingTime } = args || {}
    setGrid(newGrid || generateGrid(dimensions))
    // setPlayers((currentPlayers) => newPlayers || generatePlayers(currentPlayers, dimensions))
    setRemainingTime(remainingTime || 3 * 60 * 1000)

    if (!restart) {
      // navigate to play view
      // history.push('/play')
    }

    ReactGA4.event({
      category: "actions",
      action: "game:start",
      label: players.map(({ name }: any) => name).join(' vs. '),
    });
  }

  const onGameOver = (args: any) => {

  }

  function onGameMove ({ playerIndex, direction, movement }: MoveActionPayload) {
    const newPlayer = { ...players[playerIndex] }

    newPlayer[direction] += movement

    const positionIsOutOfMap = newPlayer.x > dimensions.width || newPlayer.x < 0 || newPlayer.y > dimensions.height || newPlayer.y < 0

    if (positionIsOutOfMap) {
      return;
    }

    const positionIsReserved = Object.values(grid)
      .find(({ x, y, stone, brick }: any) =>
        (x === newPlayer.x && y === newPlayer.y) &&
        (stone || brick))

    if (positionIsReserved) {
      return
    }

    setPlayers((currentPlayers: any) => currentPlayers.map((player: any, index: number) => ({
      ...player,
      ...index === playerIndex && {
        x: newPlayer.x,
        y: newPlayer.y,
      }
    })))
  }

  function onGameBomb ({ playerIndex }: BombActionPayload) {
    const { damagePositions, newGrid, explosion, resetExplosion, bomb, resetBomb } = generateDamage(grid, players, playerIndex)

    setBombs((currentBombs: any) => ({ ...currentBombs, ...bomb }))

    setTimeout(() => {
      setBombs((currentBombs: any) => ({ ...currentBombs, ...resetBomb }))
      setGrid((currentGrid: any) => ({ ...currentGrid, ...newGrid }))

      setPlayers((currentPlayers: any) => {
        return currentPlayers.map((player: any) => ({
          ...player,
          ...damagePositions.some(({ x, y }) => player.x === x && player.y === y) && ({
            health: player.health - 20
          })
        }))
      })

      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...explosion }))
    }, 3000)

    setTimeout(() => {
      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...resetExplosion }))
    }, 3500)
  }

  useInterval(() => {
    setRemainingTime(remainingTime - 1000)
  }, remainingTime ? 1000 : null)


  const getOpponents = (): any[] => players.filter(({ socketId }: any) => socketId !== socket.id)

  useEffect(() => {
    setCurrentPlayer(players.find(({ socketId }: any) => socketId === socket.id) as IPlayer)
  }, [players])

  const getActivePlayers = (): any[] => {
    return [...(players || [])].sort((a: any, b: any) => b.health - a.health).filter(({ health }: any) => health > 0)
  }

  const gameOver = () => getActivePlayers().length === 1 || !remainingTime

  const getWinner = (): any => {
    return gameOver() ? getActivePlayers()[0] : false
  }

  return (
    <GameContext.Provider
      value={{
        rooms,
        setRooms,
        onStartGame,
        onGameOver,
        onGameMove,
        onGameBomb,
        players,
        setPlayers,
        settings,
        setSettings,
        remainingTime,
        getOpponents,
        currentPlayer,
        setCurrentPlayer,
        dimensions,
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions,
        getActivePlayers,
        gameOver,
        getWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
