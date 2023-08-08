import React from 'react';

import { AlertBox } from './Alert.styles';

// Functional Component
import { FC } from 'react';

// Types
import { AlertProps } from '../../types';

// Custom Hooks
import { useAlertWithTimeout } from '../../hooks/customHooks';

const AlertMessage: FC<AlertProps> = ({ alert, type }) => {
  // Use the custom hook to handle the timeout logic
  const displayAlert = useAlertWithTimeout(alert, 3000);

  return (
    // Conditionally render the Alert component if 'alert' has a value
    displayAlert ? (
      <AlertBox severity={type} data-testid="alert">
        {displayAlert}
      </AlertBox>
    ) : null
  );
};

export default AlertMessage;
