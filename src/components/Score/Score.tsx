import React, { useContext } from 'react'
import { Spacer } from '3oilerplate'
import { GameContext } from '../../context'
import { SScore } from './Score.styled'

export const Score = ({ s }: any) => {
  const { score } = useContext(GameContext)

  return (
    <SScore>
      <Spacer size="s" s={{ flexDirection: 'row' }}>
        <span>Level: { score?.level }</span>
        <span>Score: { score?.score }</span>
        <span>Rows: { score?.rows }</span>
      </Spacer>
    </SScore>
  )
}
