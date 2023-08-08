// React Elements
import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Types
import type { RootState } from '../../types';

// Styles
import { AmountHolder, ChangeHolder, DisplayAmountHolder } from './DisplayAmount.style';

// Constants
import { AMOUNT, CHANGE } from '../../constants/common';

// Custom hooks
import { useChangeEffect, useFlagEffect } from '../../hooks/customHooks';
import { AnyAction } from '@reduxjs/toolkit';

const DisplayAmount = () => {
  const { value, flag, errorMessage } = useSelector((state: RootState) => state.amount);
  const [change, setChange] = useState<number>(0);

  const dispatch: React.Dispatch<AnyAction> = useDispatch();

  // custom hook for the change
  useFlagEffect(flag, value, setChange);

  // Use the custom hook and get the updated 'change' state
  const updatedChange: number = useChangeEffect(change, dispatch);

  return (
    <DisplayAmountHolder>
      <AmountHolder>
        {value > 0 ? (
          <>
            {AMOUNT}:<br />
            {' $ ' + value}
            <br />
          </>
        ) : null}
      </AmountHolder>
      <ChangeHolder>
        {updatedChange > 0 ? (
          <>
            {CHANGE}:<br />
            {' $ ' + updatedChange}
            <br />
          </>
        ) : null}
      </ChangeHolder>
      {errorMessage}
    </DisplayAmountHolder>
  );
};

export default DisplayAmount;
