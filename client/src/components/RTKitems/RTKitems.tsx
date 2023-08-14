import { FC } from 'react'
import { useGetRTKitemsQuery } from '../../store/apiSlice'
import AlertMessage from '../Alert/Alert'
import Item from '../Item/Item'
import { ItemContainer, ItemsHolder, SelectionHolder } from '../List/List.styles'
import Selection from '../Selection/Selection'
import Skeletons from '../Skeletons/Skeletons'
import VendingButtons from '../VendingButtons/VendingButtons'
import { NETWORK_RESPONS_NOT_OK } from '../../constants/common'

const RTKitems: FC = () => {
  const { data: vendingItems, isLoading, isError } = useGetRTKitemsQuery('')
 
  return (
    <ItemContainer data-testid="ItemContainer">
      {isError ? (
        <AlertMessage alert={NETWORK_RESPONS_NOT_OK} type="error" />
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
          <ItemsHolder>
            {vendingItems?.map((item: any, index: any) => (
              <Item item={item} id={index} key={index} />
            ))}
          </ItemsHolder>

          <SelectionHolder>
            <Selection />
            <VendingButtons />
          </SelectionHolder>
        </>
      )}
    </ItemContainer>
  )
}

export default RTKitems