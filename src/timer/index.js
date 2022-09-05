import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { AppContext } from "../AppProvider";
import Res from "../assets/Photo";
import moment from "moment";

const Timer = () => {
  const [open, setOpen] = useState(false);
  const { timer, setTimer } = useContext(AppContext);

  useEffect(() => {
    const interval = setInterval(() => {
			setTimer(timer + 1000);
		}, 1000);
		
		return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>XYZ Parking</Text>
      <Text style={styles.txtWorld}>World clock</Text>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <Text>{moment(timer).format("ddd DD, MMM YYYY hh:mm:ss")}</Text>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Image style={styles.imageEdit} source={Res.get("edit")} resizeMode="cover" />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        mode={'datetime'}
        minimumDate={new Date()}
        date={new Date(moment(timer).toISOString())}
        onConfirm={(date) => {
          setOpen(false)
          setTimer(date.getTime())
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  txtWorld: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  imageEdit: {
    width: 25,
    height: 25,
    marginLeft: 10
  },
});

export default Timer;
