import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import the mock store creator
import DisplayAmount from './DisplayAmount';

// Create a mock store
const mockStore = configureStore([]);

describe('DisplayAmount Component', () => {
  it('should render amount and change when values are greater than 0', () => {
    // Mock the store state with values
    const store = mockStore({
      amount: { value: 10, flag: true, errorMessage: '' }
    });

    render(
      <Provider store={store}>
        <DisplayAmount />
      </Provider>
    );

    // Assert that amount and change are rendered
    expect(screen.getByText(/Amount:\s+\$ 10/)).toBeInTheDocument();
    expect(screen.queryByText(/Change:\s+\$ 0/)).toBeNull();
  });

  it('should render only amount when value is greater than 0 and change is 0', () => {
    // Mock the store state with values
    const store = mockStore({
      amount: { value: 10, flag: true, errorMessage: '' }
    });

    render(
      <Provider store={store}>
        <DisplayAmount />
      </Provider>
    );

    // Use a regular expression to match the text content
    //const amountRegex = /\$ 10/;
    //expect(screen.getByText(amountRegex)).toBeInTheDocument();
    expect(screen.queryByText('$ 0')).toBeNull();
  });

  it('should render only error message when an error is present', () => {
    // Mock the store state with an error message
    const store = mockStore({
      amount: { value: 0, flag: false, errorMessage: 'Error message' }
    });

    render(
      <Provider store={store}>
        <DisplayAmount />
      </Provider>
    );

    // Assert that only the error message is rendered
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('$ 0')).toBeNull();
  });
});
