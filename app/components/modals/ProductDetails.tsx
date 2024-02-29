import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {ProductItem} from '../../constants/types';

interface ProductDetailsProps {
  data: ProductItem;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ProductDetails = ({data, visible, setVisible}: ProductDetailsProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>{data?.name}</Text>
        <Image
          source={{uri: data?.mainImage}}
          style={styles.modalImage}
          resizeMode="contain"
        />
        <Text style={styles.price}>
          {data.price?.amount} {data.price?.currency}
        </Text>
        <Text style={styles.modalDescription}>SKU: {data?.SKU}</Text>
        <Text style={styles.modalDescription}>Brand: {data?.brandName}</Text>
        <Text style={styles.modalDescription}>Color: {data?.colour}</Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.modalSizeText}>Sizes: </Text>
          <View style={styles.selectorButtonContainer}>
            {data?.sizes?.map(s => (
              <View key={s} style={[styles.button, styles.sizeButton]}>
                <Text style={styles.buttonText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.modalDescription}>{data?.description}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setVisible(false)}>
          <Text style={styles.goBackText}>⬅️ Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.black,
  },
  sizeButton: {
    marginRight: 10,
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
  selectorButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingBottom: 5,
  },
  cartButton: {
    backgroundColor: colors.green,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  goBackText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  modalSizeText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.black,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 10,
    color: colors.black,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.grey,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.black,
  },
  modalContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 50,
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 10,
    color: colors.black,
  },
});
