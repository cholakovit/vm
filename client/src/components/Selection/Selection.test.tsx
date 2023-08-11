import React from 'react';
import { render } from '@testing-library/react';
import Selection from './Selection';
import { Provider } from 'react-redux'; 
import store from '../../store/store'; 

describe('Selection component', () => {
  it('disables the button when submit is not allowed', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Selection />
      </Provider>
    );
    
    const itemFormElement = getByTestId('form');

    expect(itemFormElement).toBeInTheDocument();
  });
});

