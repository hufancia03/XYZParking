import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { ParkingWay } from "../assets/MockData";
import Color from "../assets/Color";
import Res from "../assets/Photo";
import moment from "moment";
const SLOT_WIDTH = Dimensions.get("window").width / 9;

const Parking = React.forwardRef(({ item, customer, onPress }, ref) => {
  const park = customer?.park ?? {};
  const car = park?.car ?? {};
  const plateNo = car?.plateNo ?? "";
  const source = car?.name ?? "";
  const entrydate = car.entrydate ? moment(car.entrydate).format("MM/DD/YY hh:mm") : "";
  
  return (
    <>
      <TouchableOpacity ref={ref} onPress={onPress} 
        style={[styles.container, source && styles.activeStyle]}>
        <Text style={styles.txtSize}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.txtParking}>Slot {item.id}</Text>
        <Image style={styles.imageStyle} source={Res.get(source)} resizeMode="contain" />
        {!!source && <Text style={styles.txtPlateNo}>{plateNo}{"\n"}{entrydate}</Text>}
      </TouchableOpacity>
      {ParkingWay.includes(item.id) && 
      <View style={styles.viewWay} >
        <View style={{width: 5, height: 140, backgroundColor: "white"}} />
      </View>}
    </>
  );
});

Parking.displayName = "Parking";

const styles = StyleSheet.create({
  container: {
		width: SLOT_WIDTH - 4,
		height: 90,
		borderWidth: 1,
		borderRadius: 4,
		marginHorizontal: 2,
		alignItems: "center",
		justifyContent: "center",
		borderColor: Color.red,
	},
  activeStyle: {
    borderColor: Color.black,
  },
  imageStyle: { 
    height: 60,
    position: "absolute",
    width: SLOT_WIDTH - 2, 
  },
  viewWay: {
    height: 90,
    width: SLOT_WIDTH, 
    alignItems: "center",
    backgroundColor: Color.border1
  },
  txtSize: {
    top: 2,
    fontSize: 12, 
    color: Color.black, 
    position: "absolute",
  },
  txtParking: {
    fontSize: 10,
    color: Color.black,
    position: "absolute",
    transform: [{ rotate: "90deg"}]
  },
  txtPlateNo: {
    fontSize: 8,
    position: "absolute",
    bottom: 0,
    color: Color.black,
  },
});

export default Parking;
