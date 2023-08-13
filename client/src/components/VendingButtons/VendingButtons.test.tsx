import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import the Provider component
import store from '../../store/store'; // Import your Redux store
import VendingButtons from './VendingButtons';
import { DISPLAY_ITEM_NUMBER, NUMBERS_ARRAY_0_TO_9 } from '../../constants/common';
import { assertButtonResetEnterDisabled } from '../../testUtils';

test("Vending Buttons exist ?", () => {
  render(
    <Provider store={store}>
      <VendingButtons />
    </Provider>
  )

  for(const number of NUMBERS_ARRAY_0_TO_9) {
    const buttonEl = screen.getByRole('button', { name: number }) as HTMLElement
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl).toBeDisabled()
  }

  assertButtonResetEnterDisabled();

  const displayItemNumberTitle = screen.getByText(new RegExp(DISPLAY_ITEM_NUMBER, 'i')) as HTMLElement;
  expect(displayItemNumberTitle).toBeInTheDocument()

  const dcn = screen.getByRole('dcn') as HTMLElement
  expect(dcn).toHaveTextContent('0'); 
})
