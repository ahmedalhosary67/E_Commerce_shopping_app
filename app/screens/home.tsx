import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import CatalogCard from '../components/catalogCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../hooks/reduxHook';
import {addToCart} from '../redux/slice/cartSlice';
import {ProductTypes} from '../services/interfaces';
import ProductCard from '../components/productCard';

export default function HomeScreen({navigation}: any) {
  const [state, setState] = React.useState<string[]>([]);
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    init();
  }, []);
  React.useEffect(() => {}, []);

  function init() {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setState(json))
      .then(() => setLoading(false));
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json))
      .then(() => setLoading(false));
  }

  const handleCatalog = (item: string) => {
    navigation.navigate('Catalog', {item});
  };
  const handleCategory = (item: any) => {
    navigation.navigate('Product Details', {item});
  };

  const onRefresh = () => {
    init();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Catalogs:</Text>
      <FlatList
        data={state}
        renderItem={({item}) => (
          <CatalogCard item={item} onClick={() => handleCatalog(item)} />
        )}
        horizontal
        // numColumns={2}
        keyExtractor={item => item}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['red', 'blue']}
          />
        }
      />
      <Text style={styles.titleText}>Products:</Text>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductCard item={item} onClick={() => handleCategory(item)} />
        )}
        numColumns={2}
        keyExtractor={(item: ProductTypes) => `${item.id}`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['red', 'blue']}
          />
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: StatusBar.currentHeight || 0,
  },
  titleText: {
    fontSize: 21,
    marginVertical: 10,
    marginHorizontal: 7,
  },
});
