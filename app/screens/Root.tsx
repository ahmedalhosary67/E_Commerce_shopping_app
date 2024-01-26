import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './home';
import CatalogScreen from './catalogScreen';
import ProductScreen from './productScreen';
import CartScreen from './cartScreen';
import HeaderComp from '../components/HeaderComp';
import {Image} from 'react-native';
import {useAppDispatch} from '../hooks/reduxHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductTypes} from '../services/interfaces';
import {addToCart} from '../redux/slice/cartSlice';

type Props = {};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function CatalogsStacks() {
  return (
    <Stack.Navigator
      // screenOptions={{header: () => <HeaderComp />}}
      screenOptions={{headerStyle: {backgroundColor: '#eee'}}}
      initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        options={{header: () => <HeaderComp />}}
        component={HomeScreen}
      />
      <Stack.Screen name="Catalog" component={CatalogScreen} />
      <Stack.Screen name="Product Details" component={ProductScreen} />
      {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
    </Stack.Navigator>
  );
}
export default function Root(props: Props) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const localStore: any = AsyncStorage.getItem('cartData');
    // console.log(localStore);
    // console.log(localStore);

    // localStore &&
    // localStore?.items?.map((el: ProductTypes) => dispatch(addToCart(el)));
  }, []);
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#39a935',
        tabBarActiveBackgroundColor: '#eee',
        tabBarColor: '#fff',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => (
            <Image
              style={{
                width: 30,
                height: 30,
              }}
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
              style={{
                width: 40,
                height: 40,
              }}
              source={require('../assets/cart.png')}
            />
          ),
        }}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}
