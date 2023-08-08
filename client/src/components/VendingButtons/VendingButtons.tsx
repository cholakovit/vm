// React elements
import React, { useEffect, useState } from 'react';

// Styled components
import { ButtonHolder, ButtonSection, DisplayedConcatenatedNumber } from './VendingButtons.style';

// Redux
import { useSelector } from 'react-redux';

// Types
import type { RootState } from '../../types';

// Components
import Alert from '../Alert/Alert';

// Constants
import { ENTER, RESET } from '../../constants/common';
import { useAmountEffect, useConcatenatedNumber, useEnterClick, useEnterClickedEffect } from '../../hooks/customHooks';

const VendingButtons = () => {
  const [enterClicked, setEnterClicked] = useState<boolean>(true);

  const amount = useSelector((state: RootState) => state.amount.value);

  const {
    displayedConcatenatedNumber,
    handleButtonClick,
    handleResetClick,
    setDisplayedConcatenatedNumber
  } = useConcatenatedNumber();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use the custom hook for handling Enter click
  const { handleEnterClick } = useEnterClick();

  // Use the custom hook for handling amount changes
  const { enterClicked: amountEnterClicked } = useAmountEffect(amount);

  // Use the custom hook for handling the effects of amountEnterClicked change
  useEnterClickedEffect(amountEnterClicked, setEnterClicked, handleResetClick);

  return (
    <>
      <Alert alert={errorMessage} type="error" />
      <DisplayedConcatenatedNumber>{displayedConcatenatedNumber}</DisplayedConcatenatedNumber>
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
    </>
  );
};

export default VendingButtons;
