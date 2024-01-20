export interface ProductItem {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: {amount: string; currency: string};
  sizes: string[];
  stockStatus: string;
  colour: string;
  description: string;
}

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

export type RemoveCartPayload = {
  item: ProductItem;
  size: string;
};
