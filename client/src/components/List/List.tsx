// Styled Elements
import { ItemContainer, ItemsHolder, SelectionHolder } from './List.styles';

// Components
import Skeletons from '../Skeletons/Skeletons';
import Item from '../Item/Item';
import Selection from '../Selection/Selection';
import VendingButtons from '../VendingButtons/VendingButtons';
import AlertMessage from '../Alert/Alert';

// Custom Hook
import { useEffectDispatchItems, useVendingItems } from './List.hooks';

// Redux
import { useAppSelector } from '../../store/hooks';
import { getItems, getItemsError } from '../../store/dataSlice';

import ErrorBoundary from '../../ErrorBoundaries';
import { ItemsProps } from '../Item/Item.types';
import { FC, Suspense } from 'react';

const List: FC = () => {
  // By using the custom hooks, I have encapsulated the specific logic for form submission and input change in separate hooks,
  // making my code cleaner and more reusable. Now, the logic for handling the form submission and input change is abstracted
  // away in the custom hooks, and I can easily reuse these hooks in other components if needed.

  const error: any = useAppSelector(getItemsError);

  useEffectDispatchItems();

  const items = useAppSelector(getItems);

  // custom hook for using the vending items with useEffect
  const { vendingItems, isLoading } = useVendingItems(items);

  return (
    <ItemContainer data-testid="ItemContainer">
      {error ? (
        <AlertMessage alert={error} type="error" />
      ) : isLoading ? (
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
                {/* {vendingItems?.slice(0, 1).map((item, index) => ( */}
                {vendingItems?.map((item, index) => (
                  <Item item={item} id={index} key={index} />
                  // <ErrorBoundary fallback="Error">
                  //   <Suspense fallback="Loading ...">
                  //     <Item item={item} id={index} key={index} />
                  //   </Suspense>
                  // </ErrorBoundary>
                ))}
              </ItemsHolder>
            </>
          ) : (
            <ItemsHolder>
              <Skeletons flag={1} width={160} height={120} />
            </ItemsHolder>
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
