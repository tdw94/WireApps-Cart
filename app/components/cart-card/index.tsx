import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {CartItem} from '../../constants/types';
import {useCart} from '../../redux/hooks/useCart';
import commonStyles from '../../styles';

interface CartCardProps {
  data: CartItem;
}

const CartCard = ({data}: CartCardProps) => {
  const {removeFromCart} = useCart();

  const confirmDeletion = () => {
    Alert.alert('Delete?', 'Do you want to delete this item from the cart?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () =>
          removeFromCart({item: data.item, size: data.itemData.size}),
      },
    ]);
  };

  const onPressDelete = () => {
    confirmDeletion();
  };

  return (
    <>
      <TouchableOpacity style={styles.container} disabled>
        <View style={styles.innerContainer}>
          <Image source={{uri: data?.item?.mainImage}} style={styles.image} />
          <View style={styles.dataContainer}>
            <Text numberOfLines={2} style={[styles.title, styles.text]}>
              {data?.item?.name}
            </Text>
            <Text style={[styles.price, styles.text]}>
              {data?.item?.price?.amount} {data?.item?.price?.currency}
            </Text>
            <Text
              style={[styles.text, commonStyles.capitalizeText]}
              numberOfLines={1}>
              Color: {data?.item?.colour}
            </Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.text}>Size: </Text>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{data.itemData.size}</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.col}>
                <Text style={styles.text}>Qty: </Text>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{data.itemData.count}</Text>
                </View>
              </View>
            </View>
            <View style={styles.deleteItemContainer}>
              <View style={styles.row}>
                <Text style={[styles.text, styles.totalPriceText]}>
                  Total:{' '}
                </Text>
                <Text style={styles.price}>
                  {Number(data?.item.price?.amount) * data.itemData.count}{' '}
                  {data?.item.price?.currency}
                </Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={onPressDelete}>
                <Text style={styles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  totalPriceText: {
    paddingBottom: 0,
  },
  separator: {
    paddingHorizontal: 5,
  },
  deleteItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  col: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.black,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
  },
  text: {
    paddingBottom: 5,
    color: colors.black,
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.black,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontWeight: '600',
  },
  dataContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  container: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
});
