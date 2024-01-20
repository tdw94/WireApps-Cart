import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';

type StackList = {
  Home: undefined;
  Cart: undefined;
};

export type StackNavigationScreenProp = NativeStackNavigationProp<StackList>;

const Stack = createNativeStackNavigator<StackList>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
