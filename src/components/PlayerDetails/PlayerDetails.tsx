import React, { useContext, useEffect, useRef } from 'react'
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
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <SPlayerDetailsButton
      { ...props }
      { ...buttonProps }
      ref={ref}
    >
      { children }
    </SPlayerDetailsButton>
  );
}

export const PlayerDetails = ({ s }: any) => {
  const { moveX, drop, rotate } = useContext(GameContext)

  return (
    <SPlayerDetails s={s}>
      <Box s={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <PlayerDetailsButton
          onPress={() => moveX('left')}
          isDesktop={isDesktop}
          type={'MOVE'}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <ChevronLeft size={14} />
        </PlayerDetailsButton>
        <PlayerDetailsButton
          onPress={() => drop()}
          isDesktop={isDesktop}
          type={'SPACE'}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <Box>{ isDesktop ? 'SPACE' : '' }</Box>
          <ArrowDown size={14} />
        </PlayerDetailsButton>
        <PlayerDetailsButton
          onPress={() => rotate()}
          isDesktop={isDesktop}
          type={'SHIFT'}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <RotateCw size={14} />
          <Box>{ isDesktop ? 'SHIFT' : '' }</Box>
        </PlayerDetailsButton>
        <PlayerDetailsButton
          onPress={() => moveX('right')}
          isDesktop={isDesktop}
          type={'MOVE'}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <ChevronRight size={14} />
        </PlayerDetailsButton>
      </Box>
    </SPlayerDetails>
  )
}
