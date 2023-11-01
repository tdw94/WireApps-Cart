import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/colors';
import {ProductItem} from '../../context/Products';
import ProductDetails from '../modals/ProductDetails';
import {useCart} from '../../context/Cart';

interface ProductCardProps {
  data: ProductItem;
}

const ProductCard = ({data}: ProductCardProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [count, setCount] = useState(1);
  const {addToCart} = useCart();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onPressCard = () => {
    setModal(true);
  };

  const onPressSize = (size: string) => {
    setSelectedSize(size);
  };

  const onPressAddToCart = () => {
    addToCart(data, {
      size: selectedSize,
      count,
    });
    setSelectedSize('');
    setCount(1);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPressCard}>
        <View style={styles.innerContainer}>
          <Image source={{uri: data?.mainImage}} style={styles.image} />
          <View style={styles.dataContainer}>
            <Text numberOfLines={2} style={[styles.title, styles.text]}>
              {data?.name}
            </Text>
            <Text style={styles.text} numberOfLines={2}>
              {data?.description}
            </Text>
            <Text style={styles.price}>
              {data.price?.amount} {data.price?.currency}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              Color: {data?.colour}
            </Text>
            <Text style={styles.text}>Sizes: </Text>
            <View style={styles.selectorButtonContainer}>
              {data?.sizes?.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.button,
                    styles.sizeButton,
                    s === selectedSize && styles.selectedButton,
                  ]}
                  onPress={() => {
                    onPressSize(s);
                  }}>
                  <Text style={styles.buttonText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedSize ? (
              <>
                <Text style={[styles.text, styles.qtyText]}>Qty: </Text>
                <View style={styles.itemSelectorContainer} key={selectedSize}>
                  <View style={styles.selectorButtonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.sizeButton]}
                      onPress={decrement}>
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <View style={[styles.button, styles.sizeButton]}>
                      <Text style={styles.buttonText}>{count}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.button, styles.sizeButton]}
                      onPress={increment}>
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={onPressAddToCart}>
                    <Text style={styles.buttonText}>🛒</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <ProductDetails data={data} visible={modal} setVisible={setModal} />
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  qtyText: {
    marginTop: 5,
  },
  sizeButton: {
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: colors.grey,
  },
  selectorButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
  },
  itemSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  midButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
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
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 5,
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
