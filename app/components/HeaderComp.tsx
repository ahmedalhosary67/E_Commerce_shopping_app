import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from './customButton';

type Props = {};

export default function HeaderComp({}: Props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logo}>E_Commerce</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
