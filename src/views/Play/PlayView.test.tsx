import React from 'react';
import { fireEvent, render } from '../../tests';
import PlayView from './PlayView';

describe('<PlayView />', () => {
  it('renders component', () => {
    render(<PlayView />)
  });

  it('restarts game', () => {
    const onStartGame = jest.fn()
    const { queryByTestId } = render(<PlayView />, { value: { gameOver: true, onStartGame }})
    const restartButton = queryByTestId('restart')
    fireEvent.click(restartButton)

    expect(onStartGame).toHaveBeenCalledTimes(2)
  })

  it('resumes game', () => {
    const setGamePaused = jest.fn()
    const { queryByTestId } = render(<PlayView />, { value: { gamePaused: true, setGamePaused }})
    const resumeButton = queryByTestId('resume')
    fireEvent.click(resumeButton)

    expect(setGamePaused).toHaveBeenCalledTimes(1)
  })
})
