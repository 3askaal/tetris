import React, { useContext, useRef } from 'react'
import { Box } from '3oilerplate'
import { SPlayerDetails, SPlayerDetailsButton } from './PlayerDetails.styled'
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  RotateCw
} from 'react-feather'
import isMobile from 'is-mobile'
import { GameContext } from '../../context'
import { useButton } from '@react-aria/button'

const isDesktop = !isMobile()

const PlayerDetailsButton = (props: any) => {
  let ref = useRef<any>();
  let { buttonProps, isPressed } = useButton(props, ref);
  let { children } = props;

  return (
    <SPlayerDetailsButton
      { ...props }
      { ...buttonProps }
      isPressed={isPressed}
      ref={ref}
    >
      { children }
    </SPlayerDetailsButton>
  );
}

export const PlayerDetails = ({ s }: any) => {
  const { moveX, drop, rotate } = useContext(GameContext)

  return (
    <SPlayerDetails s={s} isDesktop={isDesktop}>
      <PlayerDetailsButton
        onPress={() => moveX('left')}
        type={'MOVE'}
        isDesktop={isDesktop}
      >
        <ChevronLeft size={isDesktop ? 16 : 18} />
      </PlayerDetailsButton>
      <PlayerDetailsButton
        onPress={() => rotate()}
        type={'SHIFT'}
        isDesktop={isDesktop}
      >
        <RotateCw size={isDesktop ? 16 : 18} />
        <Box>{ isDesktop ? 'SHIFT' : '' }</Box>
      </PlayerDetailsButton>
      <PlayerDetailsButton
        onPress={() => drop()}
        type={'SPACE'}
        isDesktop={isDesktop}
      >
        <Box>{ isDesktop ? 'SPACE' : '' }</Box>
        <ArrowDown size={isDesktop ? 16 : 18} />
      </PlayerDetailsButton>
      <PlayerDetailsButton
        onPress={() => moveX('right')}
        type={'MOVE'}
        isDesktop={isDesktop}
      >
        <ChevronRight size={isDesktop ? 16 : 18} />
      </PlayerDetailsButton>
    </SPlayerDetails>
  )
}
