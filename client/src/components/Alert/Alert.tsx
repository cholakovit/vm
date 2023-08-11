import React from 'react';

// Custom Hooks

import { Alert, AlertColor } from '@mui/material';
import { useAlertWithTimeout } from './Alert.hooks';

// Interfaces
import { AlertMessageProps } from './Alert.types';

const AlertMessage: React.FC<AlertMessageProps> = ({ alert, type }) => {
  // Use the custom hook to handle the timeout logic
  const displayAlert: string | null = useAlertWithTimeout({
    initialAlert: alert,
    timeout: 3000
  });

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
