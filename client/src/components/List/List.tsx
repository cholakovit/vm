import React, { useEffect } from 'react'

// Styled Elements
import { ItemContainer, ItemsHolder, SelectionHolder } from './List.styles';

// Components
import Skeletons from '../Skeletons/Skeletons';
import Item from '../Item/Item';
import Selection from '../Selection/Selection';
import VendingButtons from '../VendingButtons/VendingButtons';

// Types
import type { RootState } from '../../types';

// Redux
import { useSelector } from 'react-redux';

// Custom Hook
import { useVendingItems } from '../../hooks/customHooks';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getStatus, getItems, getItemsError, selectItems } from '../../store/dataSlice';
import { IDLE } from '../../constants/common';

const List = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(getStatus);
  const error = useAppSelector(getItemsError);

  useEffect(() => {
    console.log("status", status)
    if (status === IDLE) {
      dispatch(selectItems());
    }
  }, []);

  const items = useAppSelector(getItems);

  // const data = useSelector((state: RootState) => state.data);
  // custom hook for using the vending items with useEffect
  // const { vendingItems, isLoading } = useVendingItems(data);

  //console.log("status", status)
  //console.log("List items", items)

  // custom hook for using the vending items with useEffect
  const { vendingItems, isLoading } = useVendingItems(items);

  return (
    <ItemContainer>
      {isLoading ? (
        <>
          <ItemsHolder>
            <Skeletons flag={1} width={130} height={110} />
          </ItemsHolder>
          <SelectionHolder>
            <Skeletons flag={2} width={210} height={370} />
          </SelectionHolder>
        </>
      ) : (
        <>
          {vendingItems && vendingItems.length > 0 ? (
            <>
              <ItemsHolder>
                {vendingItems?.map((item, index) => (
                  <Item item={item} id={index} />
                ))}
              </ItemsHolder>
            </>
          ) : (
            <Skeletons flag={1} width={160} height={120} />
          )}

          <SelectionHolder>
            <Selection />
            <VendingButtons />
          </SelectionHolder>
        </>
      )}
    </ItemContainer>
  );
};

export default List;
