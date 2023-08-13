import { render } from '@testing-library/react';
import Item from './Item';
import { TEST_ITEM_NAME, TEST_VALUE, THE_ANSWER_OF_EVERYTHING } from '../../constants/common';

const mockItem = {
  name: TEST_ITEM_NAME,
  price: TEST_VALUE,
  number: THE_ANSWER_OF_EVERYTHING,
};

describe('Item component', () => {
  it('renders item name and price', () => {
    const { getByText } = render(<Item item={mockItem} id={1} />);
    const itemName = getByText(mockItem.name) as HTMLElement;
    const itemPrice = getByText(`$ ${mockItem.price}`) as HTMLElement;
    expect(itemName).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
  });
});
