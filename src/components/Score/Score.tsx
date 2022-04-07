import React, { useContext, useRef } from 'react'
import { Box, Spacer } from '3oilerplate'
// import isMobile from 'is-mobile'
import { GameContext } from '../../context'
import { SScore } from './Score.styled'
// import useBreakpoint from 'use-breakpoint';

// const BREAKPOINTS = { mobile: 0, desktop: 768 }

export const Score = ({ s }: any) => {
  const { score } = useContext(GameContext)
  // const { breakpoint } = useBreakpoint(BREAKPOINTS, 'desktop');
  // const isDesktop = !isMobile({ tablet: true }) && breakpoint === 'desktop'

  return (
    <SScore>
      <Spacer size="s" s={{ flexDirection: 'row' }}>
        <span>Level: { score.level }</span>
        <span>Score: { score.score }</span>
        <span>Rows: { score.rows }</span>
      </Spacer>
    </SScore>
  )
}
