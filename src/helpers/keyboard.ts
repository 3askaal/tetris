import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { GameContext } from "../context"

export function useKeyboardBindings() {
  const {
    gameOver,
    gamePaused,
    setGamePaused,
    moveX,
    drop,
    rotate
  } = useContext(GameContext)

  useMousetrap('left', () => (!gameOver && !gamePaused) && moveX('left'))
  useMousetrap('right', () => (!gameOver && !gamePaused) && moveX('right'))
  useMousetrap('space', () => (!gameOver && !gamePaused) && drop())
  useMousetrap('shift', () => (!gameOver && !gamePaused) && rotate())
  useMousetrap('escape', () => !gameOver && setGamePaused(!gamePaused))
}
