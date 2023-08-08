// List.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import List from './List';

// Mock the custom hook useVendingItems
jest.mock('../../hooks/customHooks', () => ({
  useVendingItems: jest.fn(() => ({
    vendingItems: [
      { name: 'Item 1', price: 5, number: 1 },
      { name: 'Item 2', price: 10, number: 2 },
    ],
    isLoading: false,
  })),
}));

describe('List component', () => {
  const mockStore = configureStore([]);

  it('renders vending items when not loading', () => {
    // Create a mock Redux store with the desired initial state
    const store = mockStore({ data: { /* your desired initial state */ } });

    // const { getByText } = render(
    //   // Wrap the List component with the Provider and provide the mock store
    //   <Provider store={store}>
    //     <List />
    //   </Provider>
    // );

    // Your test assertions
    // ...
  });

  it('renders loading skeletons while loading', () => {
    // Create a mock Redux store with the desired initial state
    const store = mockStore({ data: { /* your desired initial state */ } });

    // const { getByTestId } = render(
    //   // Wrap the List component with the Provider and provide the mock store
    //   <Provider store={store}>
    //     <List />
    //   </Provider>
    // );

    // Your test assertions
    // ...
  });

  it('renders skeleton when vendingItems is empty', () => {
    // Create a mock Redux store with the desired initial state
    const store = mockStore({ data: { /* your desired initial state */ } });

    // const { getByTestId } = render(
    //   // Wrap the List component with the Provider and provide the mock store
    //   <Provider store={store}>
    //     <List />
    //   </Provider>
    // );

    // Your test assertions
    // ...
  });
});
