import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ProductTypes} from '../services/interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/customButton';
import {useAppDispatch} from '../hooks/reduxHook';
import {addToCart} from '../redux/slice/cartSlice';
export default function ProductScreen({navigate, route}: any) {
  const {item} = route.params;
  const [state, setState] = React.useState<ProductTypes>();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    init();
  }, []);

  async function init() {
    fetch(`https://fakestoreapi.com/products/${item.id}`)
      .then(res => res.json())
      .then(json => setState(json));
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.cardCont}>
      <ScrollView style={styles.detailCont}>
        <Image
          style={styles.imgCard}
          resizeMode="contain"
          source={
            item.image ? {uri: item.image} : require('./../assets/article.png')
          }
        />
        <View style={styles.detailTexts}>
          <Text style={styles.nameText}>Name:</Text>
          <Text>{item.title}</Text>
          <Text style={styles.nameText}>Description:</Text>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <Text style={styles.priceText}>price: {item.price}$</Text>
      <CustomButton
        title="Add To Cart"
        onPressFunction={() => dispatch(addToCart(item))}
        color="orange"
        style={styles.addBtn}
        titleStyle={{color: '#fff'}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardCont: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  imgCard: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    marginBottom: 3,
  },
  nameText: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  detailCont: {
    padding: 10,
  },
  detailTexts: {
    gap: 5,
    flex: 1,
  },
  addBtn: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    marginVertical: 14,
    fontSize: 21,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
