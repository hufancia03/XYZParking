import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Color from "../assets/Color";
import Res from "../assets/Photo";
const SLOT_WIDTH = Dimensions.get("window").width / 5;

const EntranceItem = React.forwardRef(({ item, index }, ref) => {

  return (
    <View ref={ref} style={styles.container}>
      <View style={styles.viewEntrancePoint}>
        <View style={styles.circleStyle} >
          <Text style={styles.txtPark}>P{index+1}</Text>
        </View>
        <Image style={styles.imageStyle} source={Res.get("entrance")} resizeMode="contain" /> 
      </View>
      <View style={styles.viewWay} >
        <View style={styles.viewLines} />
      </View>
    </View>
  );
});

EntranceItem.displayName = "EntranceItem";

const styles = StyleSheet.create({
  container: {
    width: SLOT_WIDTH,
    flexDirection: "row"
  },
  viewEntrancePoint: {
		width: SLOT_WIDTH / 2,
		alignItems: "center",
		justifyContent: "center",
	},
  circleStyle: {
    width: 23, 
    height: 23, 
    borderWidth: 1,
    borderRadius: 23 / 2,
    alignItems: "center",
		justifyContent: "center",
  },
  txtPark: {
    fontSize: 10, 
    color: Color.black
  },
  imageStyle: {
    height: 50,
    width: SLOT_WIDTH / 2, 
  },
  viewWay: {
    height: 90,
    width: SLOT_WIDTH/2, 
    alignItems: "center",
    backgroundColor: Color.border1
  },
  viewLines: {
    width: 5,
    height: 140,
    backgroundColor: "white"
  },
});

export default EntranceItem;
