import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import {ProductTypes} from './../services/interfaces';
import CustomButton from './customButton';
import {useAppDispatch} from '../hooks/reduxHook';
import {
  handleDecrease,
  handleDelete,
  handleIncrease,
} from '../redux/slice/cartSlice';
type ItemProps = {
  item: ProductTypes;
};
export default function CardInCart({item}: ItemProps) {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.cardCont}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Image
          source={
            item.image ? {uri: item.image} : require('../assets/article.png')
          }
          resizeMode="contain"
          style={styles.imgCard}
        />
        <View style={{flex: 1, paddingEnd: 25}}>
          <Text style={styles.nameText} ellipsizeMode="tail" numberOfLines={1}>
            {item.title}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
      <CustomButton
        title="X"
        onPressFunction={() => dispatch(handleDelete(item.id))}
        color="red"
        style={styles.remove}
        titleStyle={{color: '#fff'}}
      />
      <View style={styles.footerCard}>
        <Text style={styles.priceText}>{item.price}$</Text>
        <View style={styles.amountBtns}>
          <CustomButton
            title="-"
            onPressFunction={() => dispatch(handleDecrease(item.id))}
            color="red"
            disabled={item.amount <= 1}
            style={styles.addBtn}
            titleStyle={{color: '#fff'}}
          />
          <Text style={{padding: 10}}>{item?.amount}</Text>
          <CustomButton
            title="+"
            onPressFunction={() => dispatch(handleIncrease(item.id))}
            color="green"
            style={styles.addBtn}
            titleStyle={{color: '#fff'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardCont: {
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
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
  amountBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  addBtn: {
    height: 30,
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remove: {
    width: 20,
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  priceText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
});
