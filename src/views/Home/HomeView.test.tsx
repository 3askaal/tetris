import React from 'react';
import { render } from '../../tests';
import HomeView from './HomeView';

test('renders learn react link', () => {
  const { getByText } = render(<HomeView />);
});
