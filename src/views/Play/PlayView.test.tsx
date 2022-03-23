import React from 'react';
import "jest-styled-components";
import { render, screen } from '../../tests';
import PlayView from './PlayView';

test('renders learn react link', () => {
  const tree = render(<PlayView />).root;

  // const activeShape = tree.find()
  // const activeShape = screen.getByTestId('shape-active')
  // const moveLeft = screen.getByTestId('move-left')
  // const rotate = screen.getByTestId('rotate')
  // const drop = screen.getByTestId('drop')
  // const moveRight = screen.getByTestId('move-right')

  // expect(activeShape).toHaveStyle('top: 40px;')
  // expect(activeShape).toHaveStyleRule('top', '40px')
  // expect(activeShape.style.left).toBe(0)

});


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
