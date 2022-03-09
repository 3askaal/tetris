import React, { useContext, useRef } from 'react'
import { Box } from '3oilerplate'
import { SControls, SControlsButton } from './Controls.styled'
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  RotateCw
} from 'react-feather'
import isMobile from 'is-mobile'
import { GameContext } from '../../context'
import { useButton } from '@react-aria/button'
import useBreakpoint from 'use-breakpoint';

const BREAKPOINTS = { mobile: 0, desktop: 768 }

export const ControlsButton = ({ onPress, ...props }: any) => {
  let ref = useRef<any>();
  let { buttonProps, isPressed } = useButton({ onPress, ...props }, ref);
  let { children } = props;

  return (
    <SControlsButton
      { ...buttonProps }
      { ...props }
      isPressed={isPressed}
      ref={ref}
    >
      { children }
    </SControlsButton>
  );
}

export const Controls = ({ s }: any) => {
  const { moveX, drop, rotate } = useContext(GameContext)
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'desktop');
  const isDesktop = !isMobile() && breakpoint === 'desktop'

  return (
    <SControls s={s} isDesktop={isDesktop}>
      <ControlsButton
        onPress={() => moveX('left')}
        type={'MOVE'}
        isDesktop={isDesktop}
      >
        <ChevronLeft size={isDesktop ? 16 : 18} />
      </ControlsButton>
      <ControlsButton
        onPress={() => rotate()}
        type={'SHIFT'}
        isDesktop={isDesktop}
      >
        <RotateCw size={isDesktop ? 16 : 18} />
        <Box>{ isDesktop ? 'SHIFT' : '' }</Box>
      </ControlsButton>
      <ControlsButton
        onPress={() => drop()}
        type={'SPACE'}
        isDesktop={isDesktop}
      >
        <Box>{ isDesktop ? 'SPACE' : '' }</Box>
        <ArrowDown size={isDesktop ? 16 : 18} />
      </ControlsButton>
      <ControlsButton
        onPress={() => moveX('right')}
        type={'MOVE'}
        isDesktop={isDesktop}
      >
        <ChevronRight size={isDesktop ? 16 : 18} />
      </ControlsButton>
    </SControls>
  )
}
