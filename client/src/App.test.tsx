import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/store';
import Selection from './components/Selection/Selection';
import {
  AMOUNT,
  CHANGE,
  FIELD_HOLDER_TEST,
  FIELD_NOT_FOUND,
  NUMBERS_ARRAY_0_TO_9,
  REQUIRED_INSERT,
  TEST_VALUE
} from './constants/common';
import DisplayAmount from './components/DisplayAmount/DisplayAmount';
import VendingButtons from './components/VendingButtons/VendingButtons';
import { assertButtonResetEnterDisabled, assertSubmitButtonIsDisabled } from './testUtils';

test('Integrational test', async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Selection />
      <DisplayAmount />
      <VendingButtons />
    </Provider>
  );

  const form = getByTestId('form') as HTMLElement;
  expect(form).toBeInTheDocument();

  const textField = screen.getByTestId(FIELD_HOLDER_TEST).querySelector('input');

  const { buttonElReset, buttonElEnter } = assertButtonResetEnterDisabled();

  if (textField) {
    expect(textField).toBeInTheDocument();
    expect(textField.value).toBe('');

    expect(screen.getByText(REQUIRED_INSERT)).toBeInTheDocument();

    const submitButton = assertSubmitButtonIsDisabled();

    fireEvent.change(textField, { target: { value: TEST_VALUE } });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    // Assert that amount and change are rendered
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText(new RegExp(`${AMOUNT}:\\s+\\$ ${TEST_VALUE}`))).toBeInTheDocument();
      }, 0);
    });

    await waitFor(() => {
      setTimeout(() => {
        expect(buttonElReset).not.toBeDisabled();
        expect(buttonElEnter).not.toBeDisabled();

        for (const number of NUMBERS_ARRAY_0_TO_9) {
          const buttonEl = screen.getByRole('button', { name: number }) as HTMLElement;
          expect(buttonEl).toBeInTheDocument();
          expect(buttonEl).not.toBeDisabled();
        }
      }, 0);
    });

    const numberButtonToClick = screen.getByRole('button', { name: '5' }) as HTMLElement;
    fireEvent.click(numberButtonToClick);

    fireEvent.click(buttonElEnter);
    let testValue = TEST_VALUE - 5;
    const amountRegex = new RegExp(`${AMOUNT}:\\s+\\$ ${testValue}`);
    const changeRegex = new RegExp(`${CHANGE}:\\s+\\$ ${testValue}`);

    // Assert that amount and change are rendered
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText(amountRegex)).toBeInTheDocument();
        expect(screen.queryByText(changeRegex)).toBeInTheDocument();
      }, 0);
    });
  } else {
    console.error(FIELD_NOT_FOUND);
  }
});