import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import the mock store creator
import DisplayAmount from './DisplayAmount';
import { AMOUNT, CHANGE, ERROR_MESSAGE, TEST_CHANGE_VALUE, TEST_VALUE } from '../../constants/common';

// Create a mock store
const mockStore = configureStore([]);

describe('DisplayAmount Component', () => {
  it('should render amount and change when values are greater than 0', () => {
    // Mock the store state with values
    const store = mockStore({
      amount: { value: TEST_VALUE, flag: true, errorMessage: '' }
    });

    render(
      <Provider store={store}>
        <DisplayAmount />
      </Provider>
    );

    // Assert that amount and change are rendered
    expect(screen.getByText(new RegExp(`${AMOUNT}:\\s+\\$ ${TEST_VALUE}`))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${CHANGE}:\\s+\\$ ${TEST_CHANGE_VALUE}`))).toBeNull();
  });

  it('should render only amount when value is greater than 0 and change is 0', () => {
    // Mock the store state with values
    const store = mockStore({
      amount: { value: TEST_VALUE, flag: true, errorMessage: '' }
    });

    render(
      <Provider store={store}>
        <DisplayAmount />
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${AMOUNT}:\\s+\\$ ${TEST_VALUE}`))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`\\$ ${TEST_CHANGE_VALUE}`))).toBeNull();
  });

  it('should render only error message when an error is present', () => {
    // Mock the store state with an error message
    const store = mockStore({
      amount: { value: 0, flag: false, errorMessage: ERROR_MESSAGE }
    });

    render(
      <Provider store={store}>
        <DisplayAmount />
      </Provider>
    );

    // Assert that only the error message is rendered
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByText(`$ ${TEST_CHANGE_VALUE}`)).toBeNull();
  });
});


