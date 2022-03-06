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

const isDesktop = !isMobile()

export const ControlsButton = (props: any) => {
  let ref = useRef<any>();
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <SControlsButton
      { ...buttonProps }
      ref={ref}
    >
      { children }
    </SControlsButton>
  );
}

export const Controls = ({ s }: any) => {
  const { moveX, drop, rotate } = useContext(GameContext)

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
