import React from 'react';
import { render } from '../tests';
import App from './App';

describe('<App />', () => {
  it('renders component', () => {
    render(<App />)
  });
})
