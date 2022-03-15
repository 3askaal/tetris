import React from 'react';
import { render } from '../../tests';
import PlayView from './PlayView';

test('renders learn react link', () => {
  const { getByText } = render(<PlayView />);
});
