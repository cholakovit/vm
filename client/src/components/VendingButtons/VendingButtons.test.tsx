import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import the Provider component
import store from '../../store/store'; // Import your Redux store
import VendingButtons from './VendingButtons';

describe('List component', () => {
  it('renders loading state', () => {

    const { getByTestId } = render(
      <Provider store={store}>
        <VendingButtons />
      </Provider>
    );

    const vendingButtonsHolder = getByTestId('vendingButtonsHolder');

    expect(vendingButtonsHolder).toBeInTheDocument();
  });
});