// React elements
import React, { useState } from 'react';

// Styled components
import {
  VendingButtonsHolder,
  ButtonHolder,
  ButtonSection,
  DisplayItemNumber,
  DisplayNumberItemTitle,
  DisplayedConcatenatedNumber,
  ErrorMessage
} from './VendingButtons.style';

// Redux
import { useSelector } from 'react-redux';

// Constants
import { ENTER, RESET } from '../../constants/common';

// Custom hooks
import {
  useAmountEffect,
  useConcatenatedNumber,
  useEnterClick,
  useEnterClickedEffect
} from './VendingButtons.hooks';

// Types
import { RootState } from '../../store/store.types';

const VendingButtons = () => {
  const [enterClicked, setEnterClicked] = useState<boolean>(true);

  const amount = useSelector((state: RootState) => state.amount.value);

  const { displayedConcatenatedNumber, handleButtonClick, handleResetClick } =
    useConcatenatedNumber();

  const [errorMessage] = useState<string | null>(null);

  // Use the custom hook for handling Enter click
  const { handleEnterClick } = useEnterClick();

  // Use the custom hook for handling amount changes
  const { enterClicked: amountEnterClicked } = useAmountEffect(amount);

  // Use the custom hook for handling the effects of amountEnterClicked change
  useEnterClickedEffect({
    amountEnterClicked,
    setEnterClicked,
    handleResetClick
  });

  return (
    <VendingButtonsHolder data-testid="vendingButtonsHolder">
      <ErrorMessage>{errorMessage}</ErrorMessage>

      <DisplayItemNumber>
        <DisplayNumberItemTitle>Display item number:</DisplayNumberItemTitle>
        <DisplayedConcatenatedNumber>{displayedConcatenatedNumber}</DisplayedConcatenatedNumber>
      </DisplayItemNumber>

      <ButtonSection>
        {Array.from({ length: 10 }).map((_, index) => (
          <ButtonHolder
            key={index}
            variant="outlined"
            size="small"
            onClick={() => handleButtonClick(index)}
            disabled={enterClicked} // Disable the button if "Enter" is clicked
          >
            {index}
          </ButtonHolder>
        ))}
        <ButtonHolder
          variant="outlined"
          size="small"
          onClick={() => handleResetClick()}
          disabled={enterClicked} // Disable the button if "Enter" is clicked
        >
          {RESET}
        </ButtonHolder>

        <ButtonHolder
          variant="outlined"
          size="small"
          onClick={() => handleEnterClick(displayedConcatenatedNumber)}
          disabled={enterClicked} // Disable the button if "Enter" is clicked
        >
          {ENTER}
        </ButtonHolder>
      </ButtonSection>
    </VendingButtonsHolder>
  );
};

export default VendingButtons;
