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

const PlayerDetailsButton = (props: any) => {
  let ref = useRef<any>();
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <SPlayerDetailsButton
      { ...buttonProps }
      ref={ref}
      // onTouchStart={() => onDrop()}
      // onClick={() => useDrop(drop)}
      // {...isMobile() ? {
      //   onTouchStart: () => onDrop()
      // } : {
      //   onMouseDown: () => onDrop()
      // }}
      s={{
        // touchAction: isMobile() ? 'auto' : 'none',
      }}
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
          // {...isMobile() ? {
          //   onTouchStart: () => moveX('left')
          // } : {
          //   onMouseDown: () => moveX('left')
          // }}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <ChevronLeft size={14} />
        </PlayerDetailsButton>
        <PlayerDetailsButton
          onPress={() => drop()}
          // onTouchStart={() => onDrop()}
          // onClick={() => useDrop(drop)}
          // {...isMobile() ? {
          //   onTouchStart: () => onDrop()
          // } : {
          //   onMouseDown: () => onDrop()
          // }}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <ArrowDown size={14} />
        </PlayerDetailsButton>
        <PlayerDetailsButton
          onPress={() => rotate()}
          // {...isMobile() ? {
          //   onTouchStart: () => rotate()
          // } : {
          //   onMouseDown: () => rotate()
          // }}
          s={{
            // touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <RotateCw size={14} />
        </PlayerDetailsButton>
        <PlayerDetailsButton
          onPress={() => moveX('right')}
          // {...isMobile() ? {
          //   onTouchStart: () => moveX('right')
          // } : {
          //   onMouseDown: () => moveX('right')
          // }}
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
