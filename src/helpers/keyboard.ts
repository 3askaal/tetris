import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { GameContext, SocketContext } from "../context"

export function useKeyboardBindings() {
  const { settings, currentPlayer } = useContext(GameContext)
  const { move, bomb } = useContext(SocketContext)
  const isLocalGame = settings?.type === 'local'

  // useMousetrap('up', () => move({ playerIndex: currentPlayer?.index, direction: 'y', movement: -1 }))
  // useMousetrap('down', () => move({ playerIndex: currentPlayer?.index, direction: 'y', movement: 1 }))
  // useMousetrap('left', () => )
  // useMousetrap('right', () => )
  // useMousetrap('space', () => )

  // useMousetrap('w', () => isLocalGame && move({ playerIndex: 0, direction: 'y', movement: -1 }))
  // useMousetrap('s', () => isLocalGame && move({ playerIndex: 0, direction: 'y', movement: 1 }))
  // useMousetrap('a', () => isLocalGame && move({ playerIndex: 0, direction: 'x', movement: -1 }))
  // useMousetrap('d', () => isLocalGame && move({ playerIndex: 0, direction: 'x', movement: 1 }))
  // useMousetrap('shift', () => isLocalGame && bomb({ playerIndex: 0 }))
}
