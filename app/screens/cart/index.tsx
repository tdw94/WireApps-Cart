import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/colors';
import {useCart} from '../../context/Cart';
import {getCartItemCountAndTotal} from '../../helpers/products';
import CartCard from '../../components/cart-card';

const CartScreen = () => {
  const {cartProducts} = useCart();

  const cartItems = useMemo(() => {
    return getCartItemCountAndTotal(cartProducts);
  }, [cartProducts]);

  const checkout = () => {
    // todo
  };

  return (
    <View style={styles.screen}>
      {!cartProducts.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartProducts}
            renderItem={({item}) => <CartCard data={item} />}
            keyExtractor={item => `${item.itemData.size}_${item.item.id}`}
            contentContainerStyle={[
              styles.container,
              cartItems.noOfItem > 0 && styles.bottomPadding,
            ]}
          />
          {cartItems.noOfItem > 0 ? (
            <View style={styles.cartButtonContainer}>
              <TouchableOpacity style={styles.cartButton} onPress={checkout}>
                <Text style={styles.goToCart} numberOfLines={1}>
                  Checkout ✅ ({cartItems.noOfItem} items, {cartItems.total}{' '}
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

export default CartScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  emptyText: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  screen: {
    flex: 1,
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
    flexGrow: 1,
  },
});
