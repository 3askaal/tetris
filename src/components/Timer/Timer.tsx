import React, { useContext } from 'react'
import moment from 'moment'
import { GameContext } from '../../context'

export const Timer = ({ until }: any) => {
  const { remainingTime }: any = useContext(GameContext)

  const getTimeLabel = () => {
    return moment.utc(remainingTime).format('mm:ss')
  }

  return remainingTime ? <div>{ getTimeLabel() }</div> : null
}
