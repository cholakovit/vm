import { render, screen } from '@testing-library/react';
import Selection from './Selection';
import { Provider } from 'react-redux';
import store from '../../store/store';
import {
  DISPLAY_AMOUNT_CHANGE,
  ENTER_AMOUNT,
  FIELD_HOLDER_TEST,
  REQUIRED_INSERT
} from '../../constants/common';
import { assertSubmitButtonIsDisabled } from '../../testUtils';

describe('Selection component', () => {
  it('disables the button when submit is not allowed', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Selection />
      </Provider>
    );

    const itemFormElement = getByTestId('form') as HTMLElement;

    expect(itemFormElement).toBeInTheDocument();

    const textField = screen.getByTestId(FIELD_HOLDER_TEST) as HTMLElement;
    expect(textField).toBeInTheDocument();
    expect(screen.getByLabelText(ENTER_AMOUNT)).toBeInTheDocument();
    expect((textField as HTMLInputElement).value).toBe(undefined);
    expect(screen.getByText(REQUIRED_INSERT)).toBeInTheDocument();

    assertSubmitButtonIsDisabled();

    const titleElement = screen.getByText(DISPLAY_AMOUNT_CHANGE);
    expect(titleElement).toBeInTheDocument();
  });
});
