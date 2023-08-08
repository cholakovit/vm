import React from 'react';

// Functional Component
import { FC } from 'react';

// Types
import { AlertProps } from '../../types';

// Custom Hooks
import { useAlertWithTimeout } from '../../hooks/customHooks';
import { Alert, AlertColor } from '@mui/material';

const AlertMessage: FC<AlertProps> = ({ alert, type }) => {
  // Use the custom hook to handle the timeout logic
  const displayAlert: string | null = useAlertWithTimeout(alert, 3000);

  return (
    // Conditionally render the Alert component if 'alert' has a value
    displayAlert ? (
      <Alert severity={type as AlertColor} data-testid="alert">
        {displayAlert}
      </Alert>
    ) : null
  );
};

export default AlertMessage;
