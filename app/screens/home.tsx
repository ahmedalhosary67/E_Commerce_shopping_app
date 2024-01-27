import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CatalogCard from '../components/catalogCard';
import {ProductTypes} from '../services/interfaces';
import ProductCard from '../components/productCard';

export default function HomeScreen({navigation}: any) {
  const [state, setState] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(5);
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [pageloading, setPageLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    init();
  }, []);
  React.useEffect(() => {
    fetchProducts();
  }, [page]);

  function init() {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setState(json));
    setLoading(false);
  }

  function fetchProducts() {
    setPageLoading(true);
    fetch(`https://fakestoreapi.com/products?limit=${page}`)
      .then(res => res.json())
      .then(json => setProducts(json))
      .then(() => setPageLoading(false));
  }

  const handleCatalog = (item: string) => {
    navigation.navigate('Catalog', {item});
  };
  const handleProduct = (item: any) => {
    navigation.navigate('Product Details', {item});
  };
  const handleIncreaseData = () => {
    setPage(prevpage => prevpage + 5);
  };

  const onRefresh = () => {
    setPage(5);
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
          <ProductCard item={item} onClick={() => handleProduct(item)} />
        )}
        numColumns={2}
        keyExtractor={(item: ProductTypes) => `${item.id}`}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        contentContainerStyle={{gap: 10}}
        onEndReached={handleIncreaseData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <>
            {pageloading && (
              <Text style={{alignSelf: 'center', marginBottom: 10}}>
                Loading...
              </Text>
            )}
          </>
        )}
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
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 7,
  },
});
