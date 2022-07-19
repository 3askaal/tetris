import React, { useContext } from 'react';
import { act, render } from"@testing-library/react";
import { GameProvider, GameContext, GameContextType, GameContextDefaults } from './GameContext';
import ReactGA4 from 'react-ga4';
import { times } from 'lodash';
import { generateShape, SHAPE_BLOCKS } from '../helpers/generate'

jest.mock('react-ga4', () => ({
  ...jest.requireActual('react-ga4'),
  event: jest.fn(),
  send: jest.fn(),
}));

const ReactGA4EventMock = ReactGA4.event as jest.Mock;
const ReactGA4SendMock = ReactGA4.send as jest.Mock;

describe('<GameContext />', () => {
  let currentContext: GameContextType = GameContextDefaults;

  function mountGameDataProvider() {
    render(
      <GameProvider><TestComponent /></GameProvider>
    );
    if (currentContext === null) throw new Error('Game data was not set');
    return currentContext;
  }

  function mountGameDataProviderWithMock(mockedValue: any) {
    render(
      <GameContext.Provider value={mockedValue}><TestComponent /></GameContext.Provider>
    );
    if (currentContext === null) throw new Error('Game data was not set');
    return currentContext;
  }

  function TestComponent() {
    currentContext = useContext(GameContext);
    return null;
  }

  function genBottomBlocks (rows = 1, cols = 1, bottomStartingIndex = 35) {
    act(() => currentContext.setBlocks(
      times(rows, (rowIndex) =>
        times(cols, (colIndex) => ({
          x: colIndex,
          y: bottomStartingIndex - rowIndex
        }))
      ).flat()
    ))
  }

  beforeEach(() => {
    currentContext = mountGameDataProvider();
  });

  describe.skip('general', () => {
    it('runs moveY function with interval', () => {
      jest.useFakeTimers();
      const moveYSpy = jest.fn();
      currentContext = mountGameDataProviderWithMock({
        ...currentContext,
        moveY: moveYSpy
      });

      act(() => currentContext.onStartGame());
      act(() => { jest.advanceTimersByTime(2000) })

      expect(moveYSpy).toHaveBeenCalled()

      jest.useRealTimers()
    })
  })

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
      act(() => currentContext.onStartGame());
      const expectedShapeX = currentContext.shape!.x - 1
      act(() => currentContext.moveX('left'));

      expect(currentContext.shape!.x).toBe(expectedShapeX);
    });
  });

  describe("moveX('right')", () => {
    it('move block right', () => {
      act(() => currentContext.onStartGame());
      const expectedShapeX = currentContext.shape!.x + 1
      act(() => currentContext.moveX('right'));

      expect(currentContext.shape!.x).toBe(expectedShapeX);
    });

    it('move block right fails (hits side)', () => {
      act(() => currentContext.onStartGame());
      act(() => currentContext.setShape({ ...currentContext.shape, x: currentContext.dimensions.width - currentContext.shape!.width }));
      const expectedShapeX = currentContext.shape!.x
      act(() => currentContext.moveX('right'));

      expect(currentContext.shape!.x).toBe(expectedShapeX);
    });
  });

  describe('moveY()', () => {
    it('move block down', async () => {
      act(() => currentContext.onStartGame());
      const expectedShapeY = currentContext.shape!.y + 1
      await act(() => currentContext.moveY());

      expect(currentContext.shape!.y).toBe(expectedShapeY);
    });
  });

  describe('drop()', () => {
    it('drops block to bottom', async () => {
      act(() => currentContext.onStartGame());
      const expectedBlocksLength = currentContext.shape!.blocks.length
      const initialShape = currentContext.shape
      await act(() => currentContext.drop());

      expect(currentContext.shape).not.toEqual(initialShape);
      expect(currentContext.blocks.length).toBe(expectedBlocksLength);
    });

    it('drops block to blocks at bottom', async () => {
      act(() => currentContext.onStartGame());
      genBottomBlocks(1, currentContext.dimensions.width)
      const expectedBlocksLength = currentContext.dimensions.width + currentContext.shape!.blocks.length

      await act(() => currentContext.drop());
      expect(currentContext.blocks.length).toBe(expectedBlocksLength);
    });
  });

  describe('rotate()', () => {
    it('rotates block', () => {
      act(() => currentContext.onStartGame());
      const expectedBlocksWidth = currentContext.shape!.height
      const expectedBlocksHeight = currentContext.shape!.width
      const notEpectedBlocks = currentContext.shape!.blocks
      act(() => currentContext.rotate());

      expect(currentContext.shape!.width).toBe(expectedBlocksWidth);
      expect(currentContext.shape!.height).toBe(expectedBlocksHeight);
      expect(currentContext.blocks).not.toEqual(notEpectedBlocks);
    });

    it('rotates block fails (hits block)', () => {
      act(() => currentContext.onStartGame());
      const initialShape = currentContext.shape;
      genBottomBlocks(currentContext.dimensions.height, currentContext.dimensions.width)
      act(() => currentContext.rotate());

      expect(initialShape).toEqual(currentContext.shape)
    });

    it('rotates and repositions block when close to side', () => {
      act(() => currentContext.onStartGame(generateShape({ height: 36, width: 20 }, SHAPE_BLOCKS[0][1])));
      act(() => currentContext.setShape({ ...currentContext.shape, x: currentContext.dimensions.width - 1 }));
      const initialShapeX = currentContext.shape!.x;

      act(() => currentContext.rotate());

      expect(currentContext.shape!.x).not.toBe(initialShapeX)
    });
  });

  describe('blocks', () => {
    it('clear completed rows and keep non-completed exisiting', () => {
      jest.useFakeTimers();

      act(() => currentContext.onStartGame());

      genBottomBlocks(1, currentContext.dimensions.width)
      genBottomBlocks(1, currentContext.dimensions.width / 2, 34)

      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(currentContext.score.rows).toBe(1);
      expect(currentContext.score.score).toBe(40);
      expect(currentContext.blocks.length).toBe(currentContext.dimensions.width / 2);

      jest.useRealTimers()
    });
  })

  describe('score', () => {
    it('completes 1 row', () => {
      act(() => currentContext.onStartGame());
      genBottomBlocks(1, currentContext.dimensions.width)

      expect(currentContext.score.rows).toBe(1);
      expect(currentContext.score.score).toBe(40);
    });

    it('completes 2 rows', () => {
      act(() => currentContext.onStartGame());
      genBottomBlocks(2, currentContext.dimensions.width)

      expect(currentContext.score.rows).toBe(2);
      expect(currentContext.score.score).toBe(100);
    });

    it('completes 3 rows', () => {
      act(() => currentContext.onStartGame());
      genBottomBlocks(3, currentContext.dimensions.width)

      expect(currentContext.score.rows).toBe(3);
      expect(currentContext.score.score).toBe(300);
    });

    it('completes 4 rows', () => {
      act(() => currentContext.onStartGame());
      genBottomBlocks(4, currentContext.dimensions.width)

      expect(currentContext.score.rows).toBe(4);
      expect(currentContext.score.score).toBe(1200);
    });
  });

  describe('gameOver', () => {
    it('sets game over state when no space left', async () => {
      act(() => currentContext.onStartGame());
      genBottomBlocks(currentContext.dimensions.height, currentContext.dimensions.width)
      await act(() => currentContext.moveY());

      expect(currentContext.gameOver).toBe(true);
      expect(currentContext.shape).toBe(null);
    });
  })
});
