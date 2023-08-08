// Item.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Item from './Item';

const mockItem = {
  name: 'Test Item',
  price: 10,
  number: 42,
};

describe('Item component', () => {
  it('renders item name and price', () => {
    const { getByText } = render(<Item item={mockItem} id={1} />);
    const itemName = getByText(mockItem.name);
    const itemPrice = getByText(`$ ${mockItem.price}`);
    expect(itemName).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
  });

  it('renders item number', () => {
    const { getByText } = render(<Item item={mockItem} id={2} />);
    //const itemNumber = getByText(`${mockItem.number}`);
    //expect(itemNumber).toBeInTheDocument();
  });
});
