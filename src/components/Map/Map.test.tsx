import React from 'react';
import { queryByTestId, render } from '../../tests';
import { Map } from './Map';
import styled from 'styled-components'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('<Map />', () => {
  it('renders', () => {
    const setStateMock = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(((state: any) => [state, setStateMock]) as any)
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    const { getByTestId } = render(<Map />, {
      value: {
        blocks: [
          { x: 0, y: 35 },
          { x: 0, y: 35, dead: true },
        ]
      }
    })

    expect(getByTestId('shape-active')).toBeInTheDocument()
    expect(getByTestId('shape-active-block-0')).toBeInTheDocument()
    expect(getByTestId('block-0')).toBeInTheDocument()
  });

  it('renders without data', () => {
    const setStateMock = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(((state: any) => [state, setStateMock]) as any)
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    const { queryByTestId } = render(<Map />, {
      value: {
        blocks: null,
        shape: null,
        dimensions: {}
      }
    })

    expect(setStateMock).toHaveBeenCalledTimes(0)
    expect(queryByTestId('shape-active')).toBe(null)
    expect(queryByTestId('block-0')).toBe(null)
  });

  it('calculates map size', () => {
    const setStateMock = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(((state: any) => [state, setStateMock]) as any)
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: document.createElement('div') });

    render(<Map />, {
      value: {
        blocks: [{
          x: 0,
          y: 35
        }]
      }
    })

    expect(setStateMock).toHaveBeenCalledTimes(2)
    expect(setStateMock).toHaveBeenCalledWith({ width: '0px', height: '0px' })
    expect(setStateMock).toHaveBeenCalledWith(0)
  });
})
