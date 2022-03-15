import React from 'react';
import { render } from '../tests';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
});
