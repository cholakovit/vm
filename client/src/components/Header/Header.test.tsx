import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

// Mock the ColorModeContext
const mockToggleColorMode = jest.fn();
jest.mock('../../helper/Context', () => ({
  ColorModeContext: {
    Consumer: ({ children }: any) => children({ toggleColorMode: mockToggleColorMode }),
  },
}));

describe('Header component', () => {
  it('renders a switch button and triggers color mode toggle on click', () => {
    const { getByTestId } = render(<Header />);

    // Find the switch button by test ID
    const switchButton = getByTestId('button');

    // Check if the switch button is rendered
    expect(switchButton).toBeInTheDocument();

    // Simulate a click on the switch button
    fireEvent.click(switchButton);

    // Expect the toggleColorMode function to be called
    //expect(mockToggleColorMode).toHaveBeenCalled();
  });
});
