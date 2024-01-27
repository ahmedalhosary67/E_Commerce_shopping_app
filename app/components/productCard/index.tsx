import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import {ProductTypes} from '../../services/interfaces';
import CustomButton from '../customButton';
import {useAppDispatch} from '../../hooks/reduxHook';
import {addToCart} from '../../redux/slice/cartSlice';
type ItemProps = {
  item: ProductTypes;
  onClick: () => void;
};
export default function ProductCard({item, onClick}: ItemProps) {
  const dipatch = useAppDispatch();
  return (
    <TouchableOpacity onPress={onClick} style={styles.cardCont}>
      <Image
        source={
          item.image ? {uri: item.image} : require('../../assets/article.png')
        }
        resizeMode="contain"
        style={styles.imgCard}
      />
      <Text style={styles.nameText} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.descText} ellipsizeMode="tail" numberOfLines={3}>
        {item.description}
      </Text>
      <Text style={styles.priceText}>{item.price}$</Text>
      <CustomButton
        title="Add To Cart"
        onPressFunction={() => dipatch(addToCart(item))}
        color="orange"
        style={styles.addBtn}
        titleStyle={{color: '#fff'}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardCont: {
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 7,
  },
  imgCard: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    marginBottom: 3,
  },
  nameText: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  descText: {},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  addBtn: {
    // flex: 1,
    height: 30,
    width: '100%',
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
