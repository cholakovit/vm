import { useEffect, useRef, useState } from 'react';
import type { ItemProps } from '../types';
import { setAmount } from '../store/amountSlice';
import { useDispatch } from 'react-redux';
import { subtractPrice } from '../store/amountSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getItems, getStatus, selectItems } from '../store/dataSlice';
import { IDLE } from '../constants/common';
import { AnyAction } from '@reduxjs/toolkit';

export const useVendingItems = (data: ItemProps[]) => {
  const [vendingItems, setVendingItems] = useState<ItemProps[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      setVendingItems(data);
      setIsLoading(false);
  }, [data]);

  return { vendingItems, isLoading };
};

export const useAlertWithTimeout = (initialAlert: string | null, timeout: number) => {
  const [alert, setAlert] = useState<string | null>(initialAlert);

  useEffect(() => {
    setAlert(initialAlert);

    // Clear the alert after the specified timeout
    const timer = setTimeout(() => {
      setAlert(null);
    }, timeout);

    // Clean up the timeout when the component unmounts or when the alert changes
    return () => clearTimeout(timer);
  }, [initialAlert, timeout]);

  return alert;
};

export const useFlagEffect = (flag: number, value: number, callback: (value: number) => void) => {
  useEffect(() => {
    if (flag > 0) {
      callback(value);
    }
  }, [flag, value, callback]);
};

export const useChangeEffect = (change: number, dispatch: React.Dispatch<AnyAction>) => {
  const [localChange, setLocalChange] = useState<number>(0);

  useEffect(() => {
    if (change !== null) {
      setLocalChange(change); // Store the 'change' value in the local state

      const timeoutId = setTimeout(() => {
        dispatch(setAmount(0));
        setLocalChange(0); // Clear the 'localChange' state after the timeout
      }, 2000);

      // Clean up the timeout when the component unmounts or when the value changes
      return () => clearTimeout(timeoutId);
    }
  }, [change, dispatch]);

  return localChange; // Return the local 'change' state back to the component
};

// Custom hook to handle form submission
export const useSubmitHandler = (
  amountRef: React.MutableRefObject<HTMLInputElement>,
  submitAllowed: boolean,
  dispatch: React.Dispatch<AnyAction>
) => {
  const onSubmit = () => {
    if (submitAllowed === true) {
      const amount = Number(amountRef.current?.value);
      dispatch(setAmount(amount));
      amountRef.current.value = '';
    }
  };

  return onSubmit;
};

// Custom hook to handle input change
export const useInputChangeHandler = (
  amountRef: React.MutableRefObject<HTMLInputElement>,
  setSubmitAllowed: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleOnChange = () => {
    const inputElement = amountRef.current;

    if (inputElement) {
      const { value } = inputElement;
      const positiveNumberRegex = /^\d*\.?\d*$/; // Regular expression for positive numbers

      // Check if the entered value matches the positive number regex
      if (positiveNumberRegex.test(value)) {
        inputElement.value = value; // If it's a valid number, update the input field
      } else {
        // If it's an invalid input, reset the input field
        inputElement.value = '';
      }
      setSubmitAllowed(amountRef.current?.value.length !== 0);
    }
  };

  return handleOnChange;
};

export const useConcatenatedNumber = () => {
  const [displayedConcatenatedNumber, setDisplayedConcatenatedNumber] = useState(0);

  // Ref to store the concatenated number
  const concatenatedNumberRef = useRef(0);

  const handleButtonClick = (value: number) => {
    // Concatenate the clicked button number with the previously concatenated number
    concatenatedNumberRef.current = Number(`${concatenatedNumberRef.current}${value}`);
    setDisplayedConcatenatedNumber(concatenatedNumberRef.current);
  };

  const handleResetClick = () => {
    // Clear the concatenated number
    concatenatedNumberRef.current = 0;
    // Update the state to trigger re-render and clear the displayed clicked numbers
    setDisplayedConcatenatedNumber(concatenatedNumberRef.current);
  };

  return {
    displayedConcatenatedNumber,
    handleButtonClick,
    handleResetClick,
    setDisplayedConcatenatedNumber
  };
};

export const useEnterClick = () => {
  const dispatch: React.Dispatch<AnyAction> = useDispatch();
  //const data = useSelector((state: RootState) => state.data);
  const items = useAppSelector(getItems);


  const handleEnterClick = (displayedConcatenatedNumber: number) => {
    const selectedItem = items.find(
      (item: ItemProps) => item.number === displayedConcatenatedNumber
    );
    if (selectedItem) {
      dispatch(subtractPrice(selectedItem.price));
      // Handle other state updates, but do not update errorMessage here
    } else {
      // Handle other state updates, but do not update errorMessage here
    }
  };

  return {
    handleEnterClick
  };
};

export const useAmountEffect = (amount: number) => {
  const [enterClicked, setEnterClicked] = useState<boolean>(true);

  useEffect(() => {
    if (amount > 0) {
      setEnterClicked(false);
    } else {
      setEnterClicked(true);
    }
  }, [amount]);

  return {
    enterClicked
  };
};

export const useEnterClickedEffect = (
  amountEnterClicked: boolean,
  setEnterClicked: React.Dispatch<React.SetStateAction<boolean>>,
  //setDisplayedConcatenatedNumber: React.Dispatch<React.SetStateAction<number>>,
  handleResetClick: any
) => {
  const [displayedConcatenatedNumber, setDisplayedConcatenatedNumber] = useState(0);
  useEffect(() => {
    setEnterClicked(amountEnterClicked);

    handleResetClick()

    //setDisplayedConcatenatedNumber(0);
  }, [amountEnterClicked, setEnterClicked, setDisplayedConcatenatedNumber]);
};

export const useEffectDispatchItems = () => {
  const status = useAppSelector(getStatus);
  const dispatch: any = useAppDispatch();
  useEffect(() => {
    if (status === IDLE) {
      dispatch(selectItems());
    }
  }, []);
}