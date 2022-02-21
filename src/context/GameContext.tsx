import React, { createContext, useEffect, useState } from 'react'
import { useSocket } from "use-socketio";
import { useHistory } from 'react-router-dom'
import ReactGA4 from 'react-ga4'
import { useInterval } from '../helpers/interval';
import { generateDamage } from '../helpers/actions';
import { Socket } from 'socket.io-client';
import { IBomb, IExplosion, IGrid, IPlayer, ISettings } from '../types';
import { generateGrid, generatePlayers, generateShape, Shape } from '../helpers/generate';

interface GameContextType {
  socket?: Socket;
  shapes?: Shape[];
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
  const [shapes, setShapes] = useState<Shape[]>([])
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

  const moveX = (direction: 'left' | 'right') => {
    const movements =  {
      left: -1,
      right: 1
    }

    setShapes((currentShapes) => currentShapes.map((currentShape) => {
      if (!currentShape.active) {
        return currentShape
      }

      const nextPosStart = currentShape.x + movements[direction]
      const nextPosEnd = currentShape.x + currentShape.width + movements[direction]
      const hitsSide = nextPosStart === 0 || nextPosEnd === dimensions.width

      if (hitsSide) {
        return currentShape
      }

      const activeShape = currentShapes.filter(({ active }) => active)[0]
      const inactiveShapes = currentShapes.filter(({ active }) => !active)

      const hitsBlock = inactiveShapes.length && inactiveShapes.some((inactiveShape) =>
        inactiveShape.blocks.some((bottomBlock) =>
          activeShape.blocks.some((activeBlock) => (activeShape.x + activeBlock.x) + movements[direction] === (inactiveShape.x + bottomBlock.x) && (activeShape.y + activeBlock.y) === (inactiveShape.y + bottomBlock.y))
        )
      )

      if (hitsBlock) {
        return currentShape
      }

      return { ...currentShape, x: currentShape.x + movements[direction] }
    }))
  }

  const moveY = () => {
    let isHit = false

    setShapes((currentShapes) => {
      const activeShape = currentShapes.filter(({ active }) => active)[0]
      const inactiveShapes = currentShapes.filter(({ active }) => !active)

      const hitsBottom = (activeShape?.y + activeShape?.height) === dimensions.height - 1

      const hitsBlock = inactiveShapes.length && inactiveShapes.some((inactiveShape) =>
        inactiveShape.blocks.some((bottomBlock) =>
          activeShape.blocks.some((activeBlock) => (activeShape.x + activeBlock.x) === (inactiveShape.x + bottomBlock.x) && ((activeShape.y + 1) + activeBlock.y) === (inactiveShape.y + bottomBlock.y))
        )
      )

      if (hitsBottom || hitsBlock) {
        isHit = true
        return [ ...inactiveShapes, { ...activeShape, active: false }, generateShape(dimensions)]
      }

      return [ ...inactiveShapes, { ...activeShape, y: activeShape?.y + 1 }]
    })

    return isHit
  }

  const drop = () => {
    let isHit = false

    while (!isHit) {
      isHit = moveY()
    }
  }

  const rotate = () => {
    setShapes((currentShapes) => currentShapes.map((currentShape) => {
      if (!currentShape.active) {
        return currentShape
      }

      return {
        ...currentShape,
        width: currentShape.height,
        height: currentShape.width,
        rotated: !currentShape.rotated,
        blocks: currentShape.blocks.map((block) => ({
          x: (currentShape.height - 1) - block.y,
          y: block.x
        }))
      }
    }))
  }

  useInterval(() => {
    setRemainingTime(remainingTime - 1000)
  }, remainingTime ? 1000 : null)

  const gameOver = () => !remainingTime

  // const getWinner = (): any => {
  //   return gameOver() ? getActivePlayers()[0] : false
  // }

  return (
    <GameContext.Provider
      value={{
        rooms,
        setRooms,
        onStartGame,
        onGameOver,
        players,
        setPlayers,
        settings,
        setSettings,
        remainingTime,
        // getOpponents,
        currentPlayer,
        setCurrentPlayer,
        dimensions,
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions,
        // getActivePlayers,
        gameOver,
        shapes,
        setShapes,
        moveX,
        moveY,
        drop,
        rotate,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
