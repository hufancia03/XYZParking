import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import Res from "../assets/Photo";
import _ from "lodash";
const SLOT_WIDTH = Dimensions.get("window").width / 7;

const CustomerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <Text style={{fontSize: 10, fontWeight: "800"}}>{item.plateNo}</Text>
      <Image style={styles.imageStyle} source={Res.get(item.name)} resizeMode="cover" />
    </TouchableOpacity>
  );
};

CustomerItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    width: SLOT_WIDTH,
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    width: SLOT_WIDTH,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    transform: [{rotate: "180deg"}],
	},
});

export default CustomerItem;
