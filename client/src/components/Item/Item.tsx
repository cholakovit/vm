// React Elements
import React, { FC } from 'react';

// Types
import type { ItemsProps } from '../../types';

// Styled Elements
import { ItemHolder, Content, NameHolder, PriceHolder } from './Item.style';

// Constants
import { NUMBER } from '../../constants/common';

const Item: FC<ItemsProps> = ({ item, id }) => {
  return (
    <ItemHolder role="provider" key={id}>
      <Content>
        <NameHolder>{item.name}</NameHolder>
        <PriceHolder>$ {item.price}</PriceHolder>
        <PriceHolder>
          {NUMBER}: {item.number}
        </PriceHolder>
      </Content>
    </ItemHolder>
  );
};

export default Item;
