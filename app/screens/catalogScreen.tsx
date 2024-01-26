import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {products} from '../services/data';
import {CatalogTypes, ProductTypes} from '../services/interfaces';
import ProductCard from '../components/productCard';

export default function CatalogScreen({navigation, route}: any) {
  const {item} = route.params;
  const [state, setState] = React.useState<ProductTypes[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    init();
  }, []);

  function init() {
    fetch(`https://fakestoreapi.com/products/category/${item}`)
      .then(res => res.json())
      .then(json => setState(json))
      .then(() => setLoading(false));
    // const productOfCatalog = products.filter(el => el.catalogId === item.id);
    // setState(productOfCatalog);
  }

  const handleCategory = (item: any) => {
    navigation.navigate('Product Details', {item});
  };

  const onRefresh = () => {
    setLoading(true);
    init();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', padding: 10}}>
        <Text style={{fontSize: 21}}>Catalog: {item}</Text>
      </View>
      <FlatList
        data={state}
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
    // marginTop: StatusBar.currentHeight || 0,
  },
});
