import { setAmount } from "../../store/amountSlice";

// Custom hook to handle form submission
export const useSubmitHandler = ({ amountRef, submitAllowed, dispatch }: SubmitHandlerHookProps) => {
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