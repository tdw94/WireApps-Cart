import {CartItem} from '../constants/types';

// get total qty and price for card list
export const getCartItemCountAndTotal = (cartProducts: CartItem[]) => {
  let noOfItem = 0;
  let total = 0;
  cartProducts.forEach(cp => {
    noOfItem += cp.itemData.count;
    total += cp.itemData.count * Number(cp.item.price.amount);
  });
  return {
    noOfItem,
    total,
  };
};
