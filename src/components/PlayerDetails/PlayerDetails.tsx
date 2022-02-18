import React from 'react'
import { Box, Text, Spacer } from '3oilerplate'
import { SPlayerDetails, SPlayerDetailsMove, SPlayerDetailsMiddle, SPlayerDetailsButton, SPlayerDetailsHealth, SPlayerDetailsHealthProgress } from './PlayerDetails.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair
} from 'react-feather'
import isMobile from 'is-mobile'

export const PlayerDetails = ({ onMove, onBomb, player, hasControls }: any) => {
  return (
    <SPlayerDetails>
      { player.index === 0 && (
        <Spacer size="xxs">
          <Box s={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Text>{ player.name }</Text>
          </Box>
          <SPlayerDetailsHealth index={player.index} health={player.health}>
            <SPlayerDetailsHealthProgress index={player.index} health={player.health} />
          </SPlayerDetailsHealth>
        </Spacer>
      )}
      {hasControls && (
        <Box s={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: ['flex-start', 'flex-end'][player.index]
        }}>
          { player.index === 0 ? (
            <SPlayerDetailsButton
              color={player.color}
              type="bomb"
              {...isMobile() ? {
                onTouchStart: () => onBomb()
              } : {
                onMouseDown: () => onBomb()
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <Crosshair />
            </SPlayerDetailsButton>
          ) : null }
          <SPlayerDetailsMove s={{ alignItems: ['flex-start', 'flex-end'][player.index] }}>
            <SPlayerDetailsButton
              color={player.color}
              type="left"
              {...isMobile() ? {
                onTouchStart: () => onMove('x',  -1)
              } : {
                onMouseDown: () => onMove('x',  -1)
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <ChevronLeft />
            </SPlayerDetailsButton>
            <SPlayerDetailsMiddle>
              <SPlayerDetailsButton
                color={player.color}
                type="up"
                {...isMobile() ? {
                  onTouchStart: () => onMove('y',  -1)
                } : {
                  onMouseDown: () => onMove('y',  -1)
                }}
                s={{
                  touchAction: isMobile() ? 'auto' : 'none',
                }}
              >
                <ChevronUp />
              </SPlayerDetailsButton>
              <SPlayerDetailsButton
                color={player.color}
                type="down"
                {...isMobile() ? {
                  onTouchStart: () => onMove('y', 1)
                } : {
                  onMouseDown: () => onMove('y', 1)
                }}
                s={{
                  touchAction: isMobile() ? 'auto' : 'none',
                }}
              >
                <ChevronDown />
              </SPlayerDetailsButton>
            </SPlayerDetailsMiddle>
            <SPlayerDetailsButton
              color={player.color}
              type="right"
              {...isMobile() ? {
                onTouchStart: () => onMove('x', 1)
              } : {
                onMouseDown: () => onMove('x', 1)
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <ChevronRight />
            </SPlayerDetailsButton>
          </SPlayerDetailsMove>
          { player.index === 1 ? (
            <SPlayerDetailsButton
              color={player.color}
              type="bomb"
              {...isMobile() ? {
                onTouchStart: () => onBomb()
              } : {
                onMouseDown: () => onBomb()
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <Crosshair />
            </SPlayerDetailsButton>
          ) : null }
        </Box>
      )}
      { player.index === 1 && (
        <Spacer size="xxs">
          <SPlayerDetailsHealth index={player.index}>
            <SPlayerDetailsHealthProgress index={player.index} health={player.health} />
          </SPlayerDetailsHealth>
          <Text>{ player.name }</Text>
        </Spacer>
      )}
    </SPlayerDetails>
  )
}
