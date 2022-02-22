import React, { useContext, useEffect, useRef } from 'react'
import { Box, Text, Spacer } from '3oilerplate'
import { SPlayerDetails, SPlayerDetailsMove, SPlayerDetailsMiddle, SPlayerDetailsButton, SPlayerDetailsHealth, SPlayerDetailsHealthProgress } from './PlayerDetails.styled'
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  RotateCw
} from 'react-feather'
import isMobile from 'is-mobile'
import { GameContext } from '../../context'
import { useButton } from '@react-aria/button'

const Button = (props: any) => {
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
      <ArrowDown />
    </SPlayerDetailsButton>
  );
}

export const PlayerDetails = ({ s }: any) => {
  const { moveX, drop, rotate } = useContext(GameContext)
  let ref = useRef<any>();
  let { buttonProps } = useButton({}, ref);

  return (
    <SPlayerDetails s={s}>
      <Box s={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <SPlayerDetailsButton
          {...isMobile() ? {
            onTouchStart: () => moveX('left')
          } : {
            onMouseDown: () => moveX('left')
          }}
          s={{
            touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <ChevronLeft />
        </SPlayerDetailsButton>
        <Button
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
        />
        <SPlayerDetailsButton
          {...isMobile() ? {
            onTouchStart: () => rotate()
          } : {
            onMouseDown: () => rotate()
          }}
          s={{
            touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <RotateCw />
        </SPlayerDetailsButton>
        <SPlayerDetailsButton
          {...isMobile() ? {
            onTouchStart: () => moveX('right')
          } : {
            onMouseDown: () => moveX('right')
          }}
          s={{
            touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <ChevronRight />
        </SPlayerDetailsButton>
      </Box>
    </SPlayerDetails>
  )
}
