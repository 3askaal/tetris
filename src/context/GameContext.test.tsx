import React, {useContext} from 'react';
import {act, render} from"@testing-library/react";
import {GameProvider, GameContext, GameContextType, GameContextDefaults} from './GameContext';
import ReactGA4 from 'react-ga4';

jest.mock('react-ga4', () => ({
  ...jest.requireActual('react-ga4'),
  event: jest.fn(),
}));

const ReactGA4EventMock = ReactGA4.event as jest.Mock;

describe('<GameContext />', () => {
  let currentGameData: GameContextType = GameContextDefaults;

  function mountGameDataProvider() {
    render(
      <GameProvider><TestComponent /></GameProvider>
    );
    if (currentGameData === null) throw new Error('Game data was not set');
    return currentGameData;
  }

  function TestComponent() {
    currentGameData = useContext(GameContext);
    return null;
  }

  beforeEach(() => {
    currentGameData = mountGameDataProvider();
  });


  describe('onStartGame()', () => {
    it('submits a game start event', () => {
      const gameData = mountGameDataProvider();
      act(() => gameData.onStartGame());
      expect(ReactGA4EventMock).toHaveBeenCalledTimes(1);
      expect(ReactGA4EventMock).toHaveBeenCalledWith( {
        category: "actions",
        action: "game:start",
      });
    });
  })

  describe("moveX('left')", () => {
    it('move block left', () => {
      act(() => currentGameData?.onStartGame());
      const expectedShapeX = currentGameData?.shape.x - 1
      act(() => currentGameData?.moveX('left'));
      expect(currentGameData?.shape.x).toBe(expectedShapeX);
    });
  });

  describe("moveX('right')", () => {
    it('move block right', () => {
      act(() => currentGameData?.onStartGame());
      const expectedShapeX = currentGameData?.shape.x + 1
      act(() => currentGameData?.moveX('right'));
      expect(currentGameData?.shape.x).toBe(expectedShapeX);
    });
  });

  describe('moveY()', () => {
    it('move block down', async () => {
      act(() => currentGameData?.onStartGame());
      const expectedShapeY = currentGameData?.shape.y + 1
      await act(() => currentGameData?.moveY());
      expect(currentGameData?.shape.y).toBe(expectedShapeY);
    });
  });

  describe('drop()', () => {
    it('drops block', async () => {
      act(() => currentGameData?.onStartGame());
      const expectedBlocksLength = currentGameData?.shape.blocks.length
      await act(() => currentGameData?.drop());
      expect(currentGameData?.blocks.length).toBe(expectedBlocksLength);
    });
  });
});
