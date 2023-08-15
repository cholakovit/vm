import React from 'react';
import { Story, Meta } from '@storybook/react';
import Item from '../components/Item/Item';
import { ItemHolder, Content, NameHolder, PriceHolder } from '../components/Item/Item.style';
import { NUMBER } from '../constants/common';

export default {
  title: 'Components/Item', 
  component: Item, 
} as Meta;

//const Template: Story<any> = (args) => <Item {...args} />;
const Template: Story<any> = (args) => (
  <ItemHolder>
    <Content>
      <NameHolder>{args.item.name}</NameHolder>
      <PriceHolder>$ {args.item.price}</PriceHolder>
      <PriceHolder>
        {NUMBER}: {args.item.number}
      </PriceHolder>
    </Content>
  </ItemHolder>
);

export const Default = Template.bind({});
Default.args = {
  item: {
    name: 'Sample Item',
    price: 10.99,
    number: 123,
  },
  id: 1,
};

