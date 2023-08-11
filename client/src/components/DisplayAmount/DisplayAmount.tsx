// React Elements
import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';

// Styles
import { AmountHolder, ChangeHolder, DisplayAmountHolder, ErrorMessage } from './DisplayAmount.style';

// Constants
import { AMOUNT, CHANGE } from '../../constants/common';

// Custom hooks
import { useChangeEffect, useFlagEffect } from './DisplayAmount.hooks';

// Types 
import { RootState } from '../../store/store.types';


const DisplayAmount = () => {
  const { value, flag, errorMessage } = useSelector((state: RootState) => state.amount);
  const [change, setChange] = useState<number>(0);

  const dispatch: React.Dispatch<AnyAction> = useDispatch();

  // custom hook for the change
  useFlagEffect({
    flag,
    value,
    callback: setChange
  })

  // Use the custom hook and get the updated 'change' state
  const updatedChange: number = useChangeEffect({ 
    change,
    dispatch
   })

  return (
    <DisplayAmountHolder>
      <AmountHolder>
        {value > 0 ? (
          <>
            {AMOUNT}:
            {' $ ' + value}
            <br />
          </>
        ) : null}
      </AmountHolder>
      <ChangeHolder>
        {updatedChange > 0 ? (
          <>
            {CHANGE}:
            {' $ ' + updatedChange}
            <br />
          </>
        ) : null}
      </ChangeHolder>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </DisplayAmountHolder>
  );
};

export default DisplayAmount;
