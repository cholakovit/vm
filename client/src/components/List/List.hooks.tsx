import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AppDispatch } from "../../store/store.types";
import { getStatus, selectItems } from "../../store/dataSlice";
import { IDLE } from "../../constants/common";
import { VendingItemsHookResult } from "./List.types";
import { ItemProps } from "../Item/Item.types";

export const useEffectDispatchItems = (): void => {
  const status = useAppSelector(getStatus);
  const dispatch: AppDispatch = useAppDispatch();
  useEffect(() => {
    if (status === IDLE) {
      dispatch(selectItems());
    }
  }, [status, dispatch]);
}
export const useVendingItems = (items: ItemProps[] | undefined): VendingItemsHookResult => {
  const [vendingItems, setVendingItems] = useState<ItemProps[] | undefined>(items);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (items) {
      setVendingItems(items);
      setIsLoading(false);
    }
  }, [items]);

  return { vendingItems, isLoading };
};
