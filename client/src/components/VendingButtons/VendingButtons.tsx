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
import { DISPLAY_ITEM_NUMBER, ENTER, RESET } from '../../constants/common';

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

  // Use the custom hook to manage the concatenated number and related actions
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
    <VendingButtonsHolder>
      <ErrorMessage>{errorMessage}</ErrorMessage>

      <DisplayItemNumber>
        <DisplayNumberItemTitle>{DISPLAY_ITEM_NUMBER}:</DisplayNumberItemTitle>
        <DisplayedConcatenatedNumber role='dcn'>{displayedConcatenatedNumber}</DisplayedConcatenatedNumber>
      </DisplayItemNumber>

      <ButtonSection>
        {Array.from({ length: 10 }).map((_, index) => (
          <ButtonHolder
            key={index}
            variant="outlined"
            size="small"
            data-testid={index}
            onClick={() => handleButtonClick(index)}
            disabled={enterClicked} // Disable the button if "Enter" is clicked
          >
            {index}
          </ButtonHolder>
        ))}
        <ButtonHolder
          variant="outlined"
          size="small"
          data-testid="resetButton"
          onClick={() => handleResetClick()}
          disabled={enterClicked} // Disable the button if "Enter" is clicked
        >
          {RESET}
        </ButtonHolder>

        <ButtonHolder
          variant="outlined"
          size="small"
          onClick={() => handleEnterClick(displayedConcatenatedNumber)}
          data-testid="enterButton"
          disabled={enterClicked} // Disable the button if "Enter" is clicked
        >
          {ENTER}
        </ButtonHolder>
      </ButtonSection>
    </VendingButtonsHolder>
  );
};

export default VendingButtons;