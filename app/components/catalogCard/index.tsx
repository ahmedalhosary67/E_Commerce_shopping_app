import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
type ItemProps = {
  item: string;
  onClick: () => void;
};
export default function CatalogCard({item, onClick}: ItemProps) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.cardCont}>
      <Text style={styles.catalogText}>{item}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardCont: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'silver',
    marginBottom: 16,
    padding: 12,
    marginHorizontal: 4,
    height: 45,
  },
  imgCard: {
    width: 70,
    height: 70,
    marginBottom: 3,
  },
  catalogText: {
    // fontSize: 21,
  },
});
