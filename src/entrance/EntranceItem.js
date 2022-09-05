import React, { useEffect, useState, useMemo  } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import Color from "../assets/Color";
import PropTypes from "prop-types";
import Res from "../assets/Photo";
import moment from "moment";
import _ from "lodash"
const SLOT_WIDTH = Dimensions.get("window").width / 5;

const EntranceItem = React.forwardRef(({ car, item, onPark, timer, onAddEntrance }, ref) => {
  const { parkingdetails = {} } = car;
  const source = car?.car?.name ?? "";
  const isExit = car?.car?.status === "exit";
  const isEnter = car?.car?.status === "enter";
  const [counter, setCounter] = useState(0);
  const entrydate = car.car?.entrydate ?? "";
  const isReturning = car.car?.isResume ?? false;

  const totalPrice = useMemo(() => {
    if(entrydate && parkingdetails.fixRate){
      const end = moment(entrydate);
      const start = moment(timer);
      var duration = moment.duration(start.diff(end));
  
      //Get Days and subtract from duration
      const days = Math.floor(duration.asDays());
      duration.subtract(moment.duration(days,'days'));
  
      //Get hours and subtract from duration
      const hours = duration.hours();

      const ratePer24hours = days > 0 ? (days * 5000) : 0;
      const flatRates = isReturning ? 0 : parkingdetails.fixRate || 0;
      const ratePerHours = parkingdetails.perHourRate * hours;
  
      return ratePer24hours + flatRates + ratePerHours;
    }
    return null;
  },[parkingdetails, entrydate, isReturning, timer]);

  useEffect(() => {
    if (!counter && source) {
      const argument1 = {
        ...car,
        status: null,
        car: null,
      }
      onPark(argument1, car );
      return;
    }
		if (!counter) return;
		
		const interval = setInterval(() => {
			setCounter(counter - 1);
			clearInterval(interval);
		}, 1000);
		
		return () => clearInterval(interval);
	}, [counter]);

  useEffect(() => {
		if (source) {
      setCounter(3)
    };
	}, [source]);

  if(item.name === "ADD"){
    return (
      <TouchableOpacity onPress={onAddEntrance} style={styles.viewAdd}>
        <View style={styles.viewCircle}>
          <Text style={{color: Color.black}}> ADD</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View ref={ref} style={styles.container}>
      {(isReturning && isEnter) && <View style={styles.viewFloat} >
        <Text style={styles.totalAmount}>Return to Parking</Text>
      </View>}
      {isExit && <View style={styles.viewFloat} >
        <Text style={styles.totalAmount}>Total{"\n"}{totalPrice}</Text>
      </View>}
      <View style={styles.viewEntrancePoint}>
        <View style={styles.circleStyle} >
          <Text style={styles.txtPark}>{!counter ? `${item.name}${item.id}` : counter}</Text>
        </View>
        <Image style={styles.imageStyle} source={Res.get("entrance")} resizeMode="contain" /> 
      </View>
      <View style={styles.viewWay} >
        <View style={styles.viewLines} />
        <Image style={[styles.carStyle, isEnter && { transform: [{rotate: "180deg"}]} ]} 
          source={Res.get(source)} resizeMode="cover" />
      </View>
    </View>
  );
});

EntranceItem.displayName = "EntranceItem";

EntranceItem.propTypes = {
  car: PropTypes.object,
  item: PropTypes.object,
  onPark: PropTypes.func,
  timer: PropTypes.number,
  onAddEntrance: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: SLOT_WIDTH,
    flexDirection: "row"
  },
  viewFloat: {
    position: "absolute", 
    zIndex: 5, 
    width: 50, 
    height: 40, 
    left: 10,
    elevation: 5,
    borderRadius: 13,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  totalAmount: {
    fontSize: 10,
    color: Color.black
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
    justifyContent: 'center',
    backgroundColor: Color.border1
  },
  viewLines: {
    width: 5,
    height: 140,
    backgroundColor: "white"
  },
  carStyle: {
    width: SLOT_WIDTH / 2,
    height: 60,
    position: "absolute",
	},
  viewAdd: { 
    height: 90,
    width: SLOT_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  viewCircle: { 
    width: 50, height: 50, 
    borderRadius: 50 /2, borderWidth: 1, 
    borderColor: Color.black, 
    alignItems: "center", justifyContent: "center"},
});

export default React.memo(EntranceItem);
