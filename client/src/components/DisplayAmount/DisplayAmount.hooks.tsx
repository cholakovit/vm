import { useEffect, useState } from "react";
import { setAmount } from "../../store/amountSlice";

export const useFlagEffect = ({ flag, value, callback }: FlagEffectHookProps): void => {
  useEffect(() => {
    if (flag > 0) {
      callback(value);
    }
  }, [flag, value, callback]);
};

export const useChangeEffect = ({ change, dispatch }: ChangeEffectHookProps): number => {
  const [localChange, setLocalChange] = useState<number>(0);

  useEffect(() => {
    if (change !== null) {
      setLocalChange(change); // Store the 'change' value in the local state

      const timeoutId = setTimeout(() => {
        dispatch(setAmount(-change));
        setLocalChange(0); // Clear the 'localChange' state after the timeout
      }, 2000);

      // Clean up the timeout when the component unmounts or when the value changes
      return () => clearTimeout(timeoutId);
    }
  }, [change, dispatch]);

  return localChange; // Return the local 'change' state back to the component
};