import React, {useState, useMemo, createContext, useEffect} from 'react';
import {getProducts} from '../api/getProducts';

interface ContextProps {
  isLoading: boolean;
  products: ProductItem[];
  getProductsList: () => void;
}

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

export const ProductContext = createContext<ContextProps | null>(null);

export const ProductsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [products, setProducts] = useState<ProductItem[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // call to the endpoint when the app is starting
    getProductsList();
  }, []);

  // call the endpoint
  const getProductsList = () => {
    setIsLoading(true);
    getProducts()
      .then(res => {
        setProducts(res?.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const productContext = useMemo(
    () => ({
      isLoading,
      products,
      getProductsList,
    }),
    [products, isLoading],
  );

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('UserContext must be within UserContextProvider');
  }

  return context;
};
