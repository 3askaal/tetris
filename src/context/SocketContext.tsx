import React, { createContext, useContext } from 'react'
import { useSocket } from "use-socketio";
import { Socket } from 'socket.io-client';
import { GameContext } from '.';

interface GameContextType {
  socket?: Socket;
  [key: string]: any;
}

export const SocketContext = createContext<GameContextType>({})

export const SocketProvider = ({ children }: any) => {
  const { socket } = useSocket()
  const {
    setRooms,
    setPlayers,
    onStartGame,
    onGameBomb,
    onGameMove,
    onGameOver,
  } = useContext(GameContext)

  useSocket('rooms:update', (newRooms: any) => {
    setRooms(Object.values(newRooms))
  })

  useSocket('room:update', ({ players: newPlayers }: any) => {
    setPlayers(newPlayers)
  })

  useSocket('game:start', (args) => onStartGame(args))
  useSocket('game:bomb', (args) => onGameBomb(args))
  useSocket('game:move', (args) => onGameMove(args))
  useSocket('game:over', (args) => onGameOver(args))

  const joinRoom = (roomId: string) => {
    socket.emit('room:join', { roomId })
  }

  const leaveRoom = (roomId: string) => {
    socket.emit('room:leave', { roomId })
  }

  const createRoom = (name: string) => {
    socket.emit('room:create', { name })
  }

  const startGame = () => {
    socket.emit('start', {})
  }

  const bomb = (args: any) => {
    console.log(args)
    socket.emit("bomb", args)
  }

  const move = (args: any) => {
    console.log(args)
    socket.emit("move", args)
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinRoom,
        leaveRoom,
        createRoom,
        startGame,
        bomb,
        move,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
