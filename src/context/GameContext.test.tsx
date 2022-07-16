import React, {useContext} from 'react';
import {act, render} from"@testing-library/react";
import {GameProvider, GameContext, GameContextType, GameContextDefaults} from './GameContext';
import ReactGA4 from 'react-ga4';
import { times } from 'lodash';
import { generateShape, SHAPE_BLOCKS } from '../helpers/generate'

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

  function genBottomBlocks (rows = 1, cols = 1) {
    act(() => currentGameData.setBlocks(
      times(rows, (rowIndex) =>
        times(cols, (colIndex) => ({
          x: colIndex,
          y: 35 - rowIndex
        }))
      ).flat()
    ))
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
      act(() => currentGameData.onStartGame());
      const expectedShapeX = currentGameData.shape!.x - 1
      act(() => currentGameData.moveX('left'));

      expect(currentGameData.shape!.x).toBe(expectedShapeX);
    });
  });

  describe("moveX('right')", () => {
    it('move block right', () => {
      act(() => currentGameData.onStartGame());
      const expectedShapeX = currentGameData.shape!.x + 1
      act(() => currentGameData.moveX('right'));

      expect(currentGameData.shape!.x).toBe(expectedShapeX);
    });

    it('move block right fails (hits side)', () => {
      act(() => currentGameData.onStartGame());
      act(() => currentGameData.setShape({ ...currentGameData.shape, x: currentGameData.dimensions.width - currentGameData.shape!.width }));
      const expectedShapeX = currentGameData.shape!.x
      act(() => currentGameData.moveX('right'));

      expect(currentGameData.shape!.x).toBe(expectedShapeX);
    });
  });

  describe('moveY()', () => {
    it('move block down', async () => {
      act(() => currentGameData.onStartGame());
      const expectedShapeY = currentGameData.shape!.y + 1
      await act(() => currentGameData.moveY());

      expect(currentGameData.shape!.y).toBe(expectedShapeY);
    });
  });

  describe('drop()', () => {
    it('drops block to bottom', async () => {
      act(() => currentGameData.onStartGame());
      const expectedBlocksLength = currentGameData.shape!.blocks.length
      const initialShape = currentGameData.shape
      await act(() => currentGameData.drop());

      expect(currentGameData.shape).not.toEqual(initialShape);
      expect(currentGameData.blocks.length).toBe(expectedBlocksLength);
    });

    it('drops block to blocks at bottom', async () => {
      act(() => currentGameData.onStartGame());
      genBottomBlocks(1, currentGameData.dimensions.width)
      const expectedBlocksLength = currentGameData.dimensions.width + currentGameData.shape!.blocks.length

      await act(() => currentGameData.drop());
      expect(currentGameData.blocks.length).toBe(expectedBlocksLength);
    });
  });

  describe('rotate()', () => {
    it('rotates block', () => {
      act(() => currentGameData.onStartGame());
      const expectedBlocksWidth = currentGameData.shape!.height
      const expectedBlocksHeight = currentGameData.shape!.width
      const notEpectedBlocks = currentGameData.shape!.blocks
      act(() => currentGameData.rotate());

      expect(currentGameData.shape!.width).toBe(expectedBlocksWidth);
      expect(currentGameData.shape!.height).toBe(expectedBlocksHeight);
      expect(currentGameData.blocks).not.toEqual(notEpectedBlocks);
    });

    it('rotates block fails (hits block)', () => {
      act(() => currentGameData.onStartGame());
      const initialShape = currentGameData.shape;
      genBottomBlocks(currentGameData.dimensions.height, currentGameData.dimensions.width)
      act(() => currentGameData.rotate());

      expect(initialShape).toEqual(currentGameData.shape)
    });

    it('rotates and repositions block when close to side', () => {
      act(() => currentGameData.onStartGame(generateShape({ height: 36, width: 20 }, SHAPE_BLOCKS[0][1])));
      act(() => currentGameData.setShape({ ...currentGameData.shape, x: currentGameData.dimensions.width - 1 }));
      const initialShapeX = currentGameData.shape!.x;

      act(() => currentGameData.rotate());

      expect(currentGameData.shape!.x).not.toBe(initialShapeX)
    });
  });

  describe('score', () => {
    it('completes 1 row', () => {
      act(() => currentGameData.onStartGame());
      genBottomBlocks(1, currentGameData.dimensions.width)

      expect(currentGameData.score.rows).toBe(1);
      expect(currentGameData.score.score).toBe(40);
    });

    it('completes 2 rows', () => {
      act(() => currentGameData.onStartGame());
      genBottomBlocks(2, currentGameData.dimensions.width)

      expect(currentGameData.score.rows).toBe(2);
      expect(currentGameData.score.score).toBe(100);
    });

    it('completes 3 rows', () => {
      act(() => currentGameData.onStartGame());
      genBottomBlocks(3, currentGameData.dimensions.width)

      expect(currentGameData.score.rows).toBe(3);
      expect(currentGameData.score.score).toBe(300);
    });

    it('completes 4 rows', () => {
      act(() => currentGameData.onStartGame());
      genBottomBlocks(4, currentGameData.dimensions.width)

      expect(currentGameData.score.rows).toBe(4);
      expect(currentGameData.score.score).toBe(1200);
    });
  });

  describe('gameOver', () => {
    it('sets game over state when no space left', async () => {
      act(() => currentGameData.onStartGame());
      genBottomBlocks(currentGameData.dimensions.height, currentGameData.dimensions.width)
      await act(() => currentGameData.moveY());

      expect(currentGameData.gameOver).toBe(true);
      expect(currentGameData.shape).toBe(null);
    });
  })
});
