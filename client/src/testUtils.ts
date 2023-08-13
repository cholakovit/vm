import { screen } from '@testing-library/react';
import { RESET } from './constants/common';
import { ButtonElements } from './components/Item/Item.types';


export function assertButtonResetEnterDisabled(): ButtonElements {
  const buttonElReset = screen.getByRole('button', { name: new RegExp(RESET, 'i') }) as HTMLElement;
  expect(buttonElReset).toBeInTheDocument();
  expect(buttonElReset).toBeDisabled();

  const buttonElEnter = screen.getByTestId('enterButton') as HTMLElement;
  expect(buttonElEnter).toBeInTheDocument();
  expect(buttonElEnter).toBeDisabled();

  return {
    buttonElReset,
    buttonElEnter
  };
}

export function assertSubmitButtonIsDisabled(): HTMLElement {
  const submitButton = screen.getByTestId('formButton') as HTMLElement;
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();

  return submitButton;
}
