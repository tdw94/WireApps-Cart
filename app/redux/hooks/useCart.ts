import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../store';
import {addToCart, emptyCart, removeFromCart} from '../reducers/cart-slice';
import {CartItem, RemoveCartPayload} from '../../constants/types';

export const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart.cartProducts);
  const dispatch = useDispatch();
  return {
    cart,
    addToCart: (payload: CartItem) => dispatch(addToCart(payload)),
    removeFromCart: (payload: RemoveCartPayload) =>
      dispatch(removeFromCart(payload)),
    emptyCart: () => dispatch(emptyCart()),
  };
};
