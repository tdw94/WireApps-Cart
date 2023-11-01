import React, {useState, useMemo, createContext} from 'react';
import {cloneDeep} from 'lodash';
import {ProductItem} from './Products';

export type CartItemData = {
  size: string;
  count: number;
};

export type CartItem = {
  item: ProductItem;
  itemData: CartItemData;
};

export type CartPayload = {
  itemId: string;
  size: string;
};

type ContextProps = {
  addToCart: (item: ProductItem, itemData: CartItemData) => void;
  removeFromCart: (item: ProductItem, size: string) => void;
  emptyCart: () => void;
  cartProducts: CartItem[];
};

export const CartContext = createContext<ContextProps | null>(null);

export const CartProvider = ({children}: React.PropsWithChildren<unknown>) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  const addToCart = (item: ProductItem, itemData: CartItemData) => {
    const clonedProducts = cloneDeep(cartProducts);
    // check for existing cart item with product id and size
    const existingItem = clonedProducts.find(
      cp => cp.item.id === item.id && cp.itemData.size === itemData.size,
    );

    // if found, add item count
    if (existingItem) {
      existingItem.itemData.count += itemData.count;
      const cartWithoutExisting = clonedProducts.filter(
        cp => cp.item.id !== item.id || cp.itemData.size !== itemData.size,
      );
      cartWithoutExisting.push(existingItem);
      setCartProducts(cartWithoutExisting);
    } else {
      // else, add to cart
      clonedProducts.push({
        item,
        itemData,
      });
      setCartProducts(clonedProducts);
    }
  };

  const removeFromCart = (item: ProductItem, size: string) => {
    const clonedProducts = cloneDeep(cartProducts);
    setCartProducts(
      clonedProducts.filter(
        cp => !(cp.item.id === item.id || cp.itemData.size === size),
      ),
    );
  };

  const emptyCart = () => {
    setCartProducts([]);
  };

  const cartContext = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      emptyCart,
      cartProducts,
    }),
    [cartProducts],
  );

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('UserContext must be within UserContextProvider');
  }
  return context;
};
