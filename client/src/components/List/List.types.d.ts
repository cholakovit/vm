import { ItemProps } from '../types';

interface VendingItemsHookResult {
  vendingItems: ItemProps[] | undefined;
  isLoading: boolean;
}