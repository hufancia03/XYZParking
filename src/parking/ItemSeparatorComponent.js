import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from "../assets/Color";

const ItemSeparatorComponent = () => {

  return (
    <View style={styles.itemSeparator} >
      <View style={styles.viewLines} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeparator: { 
    height: 50, 
    justifyContent: "center",
    backgroundColor: Color.border1
  },
  viewLines: { 
    height: 5, 
    backgroundColor: "white"
  },
});

export default ItemSeparatorComponent;
