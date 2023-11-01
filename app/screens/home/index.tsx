import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useProducts} from '../../context/Products';
import ProductCard from '../../components/product-card';
import {colors} from '../../constants/colors';
import {useCart} from '../../context/Cart';
import {StackNavigationScreenProp} from '../../navigation';
import {getCartItemCountAndTotal} from '../../helpers/products';

const HomeScreen = () => {
  const {navigate} = useNavigation<StackNavigationScreenProp>();
  const {isLoading, products, getProductsList} = useProducts();
  const {cartProducts} = useCart();

  const cartItems = useMemo(() => {
    return getCartItemCountAndTotal(cartProducts);
  }, [cartProducts]);

  const goToCart = () => {
    navigate('Cart', {mode: 'cart'});
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator
            animating={isLoading}
            color={colors.grey}
            size="large"
          />
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            refreshing={isLoading}
            renderItem={({item}) => <ProductCard data={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              styles.container,
              cartItems.noOfItem > 0 && styles.bottomPadding,
            ]}
            onRefresh={getProductsList}
          />
          {cartItems.noOfItem > 0 ? (
            <View style={styles.cartButtonContainer}>
              <TouchableOpacity style={styles.cartButton} onPress={goToCart}>
                <Text style={styles.goToCart} numberOfLines={1}>
                  Go to cart 🛒 ({cartItems.noOfItem} items, {cartItems.total}{' '}
                  GBP)
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomPadding: {
    paddingBottom: 120,
  },
  cartButton: {
    backgroundColor: colors.green,
    borderRadius: 10,
    padding: 15,
  },
  goToCart: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  cartButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.grey,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: colors.white,
  },
});
