import render from './render'

export * from '@testing-library/react'

export const waitForData = (time: number = 0) =>
  new Promise((res) => setTimeout(res, time))

export { render }
