import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import the Provider component
import store from '../../store/store'; // Import your Redux store
import VendingButtons from './VendingButtons';
import { DISPLAY_ITEM_NUMBER, ENTER, RESET } from '../../constants/common';

test("Vending Buttons exist ?", () => {
  render(
    <Provider store={store}>
      <VendingButtons />
    </Provider>
  )

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for(const number of numbers) {
    const buttonEl = screen.getByRole('button', { name: number })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl).toBeDisabled()
  }

  const buttonElReset = screen.getByRole('button', { name: new RegExp(RESET, 'i') }) 
  expect(buttonElReset).toBeInTheDocument()
  expect(buttonElReset).toBeDisabled()

  const buttonElEnter = screen.getByRole('button', { name: new RegExp(ENTER, 'i') }) 
  expect(buttonElEnter).toBeInTheDocument()
  expect(buttonElEnter).toBeDisabled()

  const displayItemNumberTitle = screen.getByText(new RegExp(DISPLAY_ITEM_NUMBER, 'i'));
  expect(displayItemNumberTitle).toBeInTheDocument()

  const dcn = screen.getByRole('dcn')
  expect(dcn).toHaveTextContent('0'); 
})