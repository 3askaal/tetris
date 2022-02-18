import React, { useContext, useState, useEffect } from 'react'
import { Select, Text, Box, keyGen } from '3oilerplate'
import { sampleSize, filter } from 'lodash'
import { DIFFICULTY_OPTIONS } from '../../constants'
// import { TrickContext } from '../../context'
// import { Trick } from '../../components'

export const SettingsPanel = () => {
  // const { tricks, settings, setSettings }: any = useContext(TrickContext)
  const [settings, setSettings] = useState<any>({})

  // useEffect(() => {
  //   if (tricks && settings && settings.difficulty) {
  //     setExpectedTricks(sampleSize(filter(tricks, settings), 3))
  //   }
  // }, [tricks, settings])

  return (
    <>
      <Select
        block
        options={DIFFICULTY_OPTIONS}
        value={settings.difficulty}
        onChange={(value: number) => setSettings({ difficulty: value })}
      />
    </>
  )
}
