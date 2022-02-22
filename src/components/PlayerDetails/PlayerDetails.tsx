import React, { useContext } from 'react'
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
        <SPlayerDetailsButton
          // onTouchStart={() => onDrop()}
          onClick={() => drop()}
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
