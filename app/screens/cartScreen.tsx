import React from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CardInCart from '../components/cardInCart';
import {ProductTypes} from '../services/interfaces';
import {useAppSelector} from '../hooks/reduxHook';
import {CartProducts} from '../redux/slice/cartSlice';
import CustomButton from '../components/customButton';

export default function CartScreen() {
  const {items, total} = useAppSelector(CartProducts);

  const totalCost = items.reduce((acc: number, product: any) => {
    acc += Number(product.price) * product.amount;
    return acc;
  }, 0);

  const totalAmount = items.reduce((acc: number, product: any) => {
    acc += product.amount;
    return acc;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cartTitle}>My Cart</Text>
      <View style={{flex: 1}}>
        <FlatList
          data={items}
          renderItem={({item}) => <CardInCart item={item} />}
          keyExtractor={(item: ProductTypes) => `${item.id}`}
        />
        <View style={styles.totalCostCont}>
          <View>
            <Text style={styles.costTitle}>Amount: </Text>
            <Text style={styles.costTitle}>Total Cost:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.costTitle}>{totalAmount}</Text>
            <Text style={styles.costTitle}>{totalCost.toFixed(2)}$</Text>
          </View>
          <CustomButton
            title="CheckOut"
            color="orange"
            style={styles.checkoutBtn}
            titleStyle={{color: '#fff'}}
            onPressFunction={() => console.log('CheckOut')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 5,
  },
  checkoutBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  costTitle: {
    fontSize: 18,
  },
  totalCostCont: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 15,
  },
});
