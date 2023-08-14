import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getItems } from "../../store/dataSlice";
import { useAppSelector } from "../../store/hooks";
import { subtractPrice } from "../../store/amountSlice";
import { ItemProps } from "../Item/Item.types";
import { useGetRTKitemsQuery } from "../../store/apiSlice";

export const useConcatenatedNumber = (): ConcatenatedNumberHookResult => {
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

export const useEnterClick = (): EnterClickHookResult => {
  const dispatch: React.Dispatch<AnyAction> = useDispatch();
  //const data = useSelector((state: RootState) => state.data);
  //const items = useAppSelector(getItems);
  const { data: items } = useGetRTKitemsQuery('')


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

export const useAmountEffect = (amount: number): AmountEffectHookResult => {
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

export const useEnterClickedEffect = ({
  amountEnterClicked,
  setEnterClicked,
  handleResetClick
}: EnterClickEffectHookResult) => {
  const [setDisplayedConcatenatedNumber] = useState(0);
  
  useEffect(() => {
    setEnterClicked(amountEnterClicked);

    handleResetClick()

    //setDisplayedConcatenatedNumber(0);
  }, [amountEnterClicked, setEnterClicked, setDisplayedConcatenatedNumber]);
};
