import React from 'react';
import { fireEvent, render } from '../../tests';
import { Controls } from './Controls';

describe('<Controls />', () => {
  it('renders component', () => {
    render(<Controls />)
  });

  it('renders component', async () => {
    const moveX = jest.fn()
    const rotate = jest.fn()
    const drop = jest.fn()

    const { findByTestId } = render(<Controls />, {
      value: {
        moveX,
        rotate,
        drop,
      }
    })

    const moveLeftButton = await findByTestId('move-left')
    const moveRightButton = await findByTestId('move-right')
    const rotateButton = await findByTestId('rotate')
    const dropButton = await findByTestId('drop')

    fireEvent.click(moveLeftButton)
    fireEvent.click(moveRightButton)
    fireEvent.click(rotateButton)
    fireEvent.click(dropButton)

    expect(moveX).toBeCalledTimes(2)
    expect(moveX).toBeCalledWith('right')
    expect(moveX).toBeCalledWith('left')
    expect(rotate).toBeCalledTimes(1)
    expect(drop).toBeCalledTimes(1)
  });
})
