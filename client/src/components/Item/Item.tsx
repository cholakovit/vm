// React Elements
import React from 'react';

// Styled Elements
import { ItemHolder, Content, NameHolder, PriceHolder } from './Item.style';

// Constants
import { NUMBER } from '../../constants/common';

const Item = ({ item, id }: { item: any; id: number }) => {
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