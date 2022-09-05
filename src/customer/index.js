import React, { useContext, useState, useEffect } from 'react';
import { Alert } from "react-native";
import { AppContext } from "../AppProvider";
import Customer from './Customer';
import moment from "moment";
import _ from "lodash"

const Main = () => {
  const { emeasure, setEmeasure, carlist, setCarList, timer, selectedCar, setSelectedCar } = useContext(AppContext);

  const onSelectCar = () => {
    const carlist_holder = [...carlist];

    let params = {
      ...selectedCar,
      isResume: false,
      status: "enter",
      entrydate: timer,
    };

    if(selectedCar.entrydate) {
      const start = moment(timer);
      const end = moment(selectedCar.entrydate);
      const duration = moment.duration(start.diff(end));
      const hours = duration.hours();

      if(hours < 1){
        params.entrydate = selectedCar.entrydate;
        params.isResume = true;
      };
    }

    const carentry = _.findIndex(carlist_holder, item => {
      return item.id === params.id;
    });

    const carquee = _.findIndex(emeasure, item => {
      return !item.car;
    });

    if(carquee === -1){
      Alert.alert("Notice", "Car entrance is queuing.");
      return;
    };

    const resultent = emeasure.map((item, index) => {
      if(index === carquee) return {...item, status: "enter", car: params};

      return item;
    });
  
    setEmeasure(resultent);
    carlist_holder.splice(carentry, 1);
    setCarList(carlist_holder);
    setSelectedCar({});
  };

  useEffect(() => {
    if(!_.isEmpty(selectedCar)){
      onSelectCar()
    }
  },[selectedCar]);

  return <Customer {...{ carlist, setSelectedCar }} />
};

 export default Main;
