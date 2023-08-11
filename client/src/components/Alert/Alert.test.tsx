import React from 'react';
import { render, screen, act } from '@testing-library/react';

import AlertMessage from './Alert';

// Mocking the setTimeout function for Jest
jest.useFakeTimers();

describe('AlertMessage Component', () => {
  it('should display the alert message and then disappear', () => {
    const initialAlert = 'Test Alert Message';
    const type = 'success'; // Replace with actual type value

    render(<AlertMessage alert={initialAlert} type={type} />);

    // Ensure the Alert is initially displayed
    const alertElement = screen.getByTestId('alert');
    expect(alertElement).toBeInTheDocument();

    // Fast-forward the timers by 3000ms to simulate the timeout
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Ensure the Alert is no longer in the document
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });

  it('should not render when no alert is provided', () => {
    const type = 'error'; // Replace with your actual type value

    render(<AlertMessage alert={null} type={type} />);

    // Ensure the Alert is not rendered
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });
});
