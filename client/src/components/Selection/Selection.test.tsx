import { fireEvent, render, screen } from '@testing-library/react';
import Selection from './Selection';
import { Provider } from 'react-redux'; 
import store from '../../store/store'; 
import { ENTER_AMOUNT, REQUIRED_INSERT } from '../../constants/common';
import { act } from 'react-dom/test-utils';

describe('Selection component', () => {
  it('disables the button when submit is not allowed', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Selection />
      </Provider>
    );
    
    const itemFormElement = getByTestId('form');

    expect(itemFormElement).toBeInTheDocument();

    const textField = screen.getByTestId('providerTest')
    expect(textField).toBeInTheDocument()
    expect(screen.getByLabelText(ENTER_AMOUNT)).toBeInTheDocument()
    expect((textField as HTMLInputElement).value).toBe(undefined);
    expect(screen.getByText(REQUIRED_INSERT)).toBeInTheDocument();

  });
});

