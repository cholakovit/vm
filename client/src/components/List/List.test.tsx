import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store'; 
import List from './List';

describe('List component', () => {
  it('renders loading state', () => {

    const { getByTestId } = render(
      <Provider store={store}>
        <List />
      </Provider>
    );
    const itemContainerElement = getByTestId('ItemContainer');

    expect(itemContainerElement).toBeInTheDocument();
  });
});
