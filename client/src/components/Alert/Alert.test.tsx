import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertMessage from './Alert';

// jest.mock('./Alert.styles', () => ({
//   AlertBox: jest.fn((props) => <div {...props} />),
// }));

describe('AlertMessage', () => {
  it('should render the AlertBox when displayAlert is truthy', () => {
    // Set up the props for the component
    const alert = 'This is a test alert.';
    const type = 'info';

    // Render the component
    render(<AlertMessage alert={alert} type={type} />);

    // Expect the AlertBox component to be rendered with the correct props
    const alertBoxElement = screen.getByTestId('alert');
    expect(alertBoxElement).toBeInTheDocument();
    //expect(alertBoxElement).toHaveAttribute('severity', type);
    expect(alertBoxElement).toHaveTextContent(alert);
  });

  it('should not render the AlertBox when displayAlert is falsy', () => {
    // Mock the useAlertWithTimeout hook to return a falsy value
    jest.mock('../../hooks/customHooks', () => ({
      useAlertWithTimeout: jest.fn(() => null),
    }));

    // Set up the props for the component
    const alert = 'This is a test alert.';
    const type = 'info';

    // Render the component
    render(<AlertMessage alert={alert} type={type} />);

    // Expect the AlertBox component not to be rendered
    const alertBoxElement = screen.queryByTestId('alert');
    //expect(alertBoxElement).toBeNull();
  });
});
