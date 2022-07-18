import React from 'react';
import { render } from '../../tests';
import { Map } from './Map';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('<Map />', () => {
  it.skip('renders component', () => {
    const { getByTestId } = render(<Map />, {
      value: {
        blocks: [{
          x: 0,
          y: 35
        }],
      }
    })
  });

  it('does calculate map size', () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (state: any) => [state, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: document.createElement('div') });

    const { getByTestId } = render(<Map />, {
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

  it('does not calculate map size', () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (state: any) => [state, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    const { getByTestId } = render(<Map />, {
      value: {
        blocks: [{
          x: 0,
          y: 35
        }],
        dimensions: {}
      }
    })

    expect(setStateMock).toHaveBeenCalledTimes(0)
  });
})
