import React, {useMemo} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {getCartItemCountAndTotal} from '../../helpers/products';
import CartCard from '../../components/cart-card';
import {useCart} from '../../redux/hooks/useCart';

const CartScreen = () => {
  const {cart, emptyCart} = useCart();
  // update and show cart total (price & qty) when cart is changing
  const cartItems = useMemo(() => {
    return getCartItemCountAndTotal(cart);
  }, [cart]);

  // on press checkout button
  const checkout = () => {
    // todo
  };

  // show confirmation message when emptying the cart
  const confirmEmpty = () => {
    Alert.alert('Empty cart?', 'Do you want to empty the cart?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: emptyCart,
      },
    ]);
  };

  // on press empty cart button
  const onPressEmptyCart = () => {
    confirmEmpty();
  };

  return (
    <View style={styles.screen}>
      {/* show a message when cart is empty */}
      {!cart.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({item}) => <CartCard data={item} />}
            keyExtractor={item => `${item.itemData.size}_${item.item.id}`}
            contentContainerStyle={[
              styles.container,
              cartItems.noOfItem > 0 && styles.bottomPadding,
            ]}
          />
          {/* show cart total details, checkout and empty cart buttons, at least one product is in the cart */}
          {cartItems.noOfItem > 0 ? (
            <>
              <View style={styles.cartButtonContainer}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.totalText}>
                    Total Qty: {cartItems.noOfItem} items
                  </Text>
                  <Text style={styles.totalText}>
                    Total Price: {cartItems.total} GBP
                  </Text>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={checkout}>
                    <Text style={styles.buttonText} numberOfLines={1}>
                      Checkout ✅
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.cartButton, styles.emptyCartButton]}
                    onPress={onPressEmptyCart}>
                    <Text style={styles.buttonText}>Empty cart 🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null}
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  totalText: {
    fontWeight: '700',
    fontSize: 18,
    paddingBottom: 5,
    color: colors.black,
  },
  detailsContainer: {
    marginLeft: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  emptyCartText: {
    fontSize: 18,
  },
  emptyCartButton: {
    backgroundColor: colors.red,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  emptyText: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    color: colors.black,
  },
  screen: {
    flex: 1,
  },
  bottomPadding: {
    paddingBottom: 140,
  },
  cartButton: {
    backgroundColor: colors.green,
    borderRadius: 10,
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  cartButtonContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    width: '100%',
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
