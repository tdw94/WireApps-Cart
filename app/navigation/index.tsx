import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import {ProductsProvider} from '../context/Products';
import {CartProvider} from '../context/Cart';

type StackList = {
  Home: undefined;
  Cart: undefined;
};

export type StackNavigationScreenProp = NativeStackNavigationProp<StackList>;

const Stack = createNativeStackNavigator<StackList>();

const AppContainer = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ProductsProvider>
  );
};
export default AppContainer;
