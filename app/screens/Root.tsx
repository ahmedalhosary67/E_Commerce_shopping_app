import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './home';
import CatalogScreen from './catalogScreen';
import ProductScreen from './productScreen';
import CartScreen from './cartScreen';
import HeaderComp from '../components/HeaderComp';
import {Image, StyleSheet} from 'react-native';
import {useAppDispatch} from '../hooks/reduxHook';
import {getData, storageCartData} from '../redux/slice/cartSlice';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CatalogsStacks() {
  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: Colors.lighter}}}
      initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        options={{header: () => <HeaderComp />}}
        component={HomeScreen}
      />
      <Stack.Screen name="Catalog" component={CatalogScreen} />
      <Stack.Screen name="Product Details" component={ProductScreen} />
    </Stack.Navigator>
  );
}
export default function Root() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getData).then(res => dispatch(storageCartData(res)));
  }, []);

  return (
    <Tab.Navigator screenOptions={tapOptions}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.footerIcon}
              source={require('../assets/home2.png')}
            />
          ),
        }}
        component={CatalogsStacks}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.footerIcon}
              source={require('../assets/cart.png')}
            />
          ),
        }}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}

const tapOptions = () => ({
  tabBarActiveTintColor: '#77722e',
  tabBarActiveBackgroundColor: '#eee',
  tabBarColor: '#fff',
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarLabelStyle: {
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  footerIcon: {
    width: 30,
    height: 30,
  },
});
