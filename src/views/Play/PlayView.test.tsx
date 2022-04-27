import React from 'react';
import "jest-styled-components";
import { last } from "lodash";
import { render, screen, fireEvent, waitFor } from '../../tests';
import "@testing-library/jest-dom";
import PlayView from './PlayView';
import { act } from 'react-dom/test-utils';

let callback: jest.Mock<any, any>

const getLastContext = () => last(callback.mock.calls)[0]
const getAllFromContext = (key: string) => callback.mock.calls.map(([ item ]) => item[key]);

beforeEach(() => {
  callback = jest.fn();
  render(<PlayView />, { callback })

  act(() => {
    callback.mock.calls[0][0].onStartGame()
  })
})

test('moves right', async () => {
  const shapeX = getLastContext().shape.x

  act(() => {
    getLastContext().moveX('right')
  })

  expect(getLastContext().shape.x).toEqual(shapeX + 1);
});

test('moves left', async () => {
  const shapeX = getLastContext().shape.x

  act(() => {
    getLastContext().moveX('left')
  })

  expect(getLastContext().shape.x).toEqual(shapeX - 1);
});

test('drop', async () => {
  const shapeY = getLastContext().shape.y

  act(() => {
    getLastContext().moveY()
  })

  console.log(getAllFromContext('shape'))

  expect(getLastContext().shape.y).toEqual(shapeY + 1);

});

// test('moves left', async () => {
//   // const moveRightButton = screen.getByTestId('move-left')

//   // expect(getLastContext().shape.y).toEqual(2);
//   expect(getLastContext().shape.x).toEqual(9);

//   act(() => {
//     callback.mock.calls[0][0].moveX('left')
//   })

//   expect(callback.mock.calls[2][0].shape.x).toEqual(9);
// });




// describe('Nav', () => {
//   test('Has items', () => {
//     const { getAllByTestId } = render(
//       <Nav to="/page1" items={navItems}>
//         Page 1
//       </Nav>,
//     )

//     expect(getAllByTestId('nav-sub-item').length).toBe(3)
//   })

//   test('Can be closed', () => {
//     const { queryAllByTestId, getByTestId } = render(
//       <Nav to="/page1" items={navItems}>
//         Page 1
//       </Nav>,
//     )

//     const navOpenTrigger: any = getByTestId('nav-open-trigger')

//     fireEvent.click(navOpenTrigger)
//     expect(queryAllByTestId('nav-sub-item').length).toBe(0)

//     fireEvent.click(navOpenTrigger)
//     expect(queryAllByTestId('nav-sub-item').length).toBe(3)
//   })
// })
