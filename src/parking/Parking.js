
import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import ItemSeparatorComponent from "./ItemSeparatorComponent";
import { Parkings } from "../assets/MockData";
import ParkingSlot from "./ParkingSlot";
import Color from "../assets/Color";
import Entrance from "../entrance";
import _ from "lodash";

const Parking = ({ isloading, emeasure, setEmeasure, pmeasure, setPmeasure }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      let P = [];

      Parkings.forEach(item => {
        item?.ref?.current?.measureLayout(containerRef.current, (left, top, width, height) => {
          const X = (left + width)/2;
          const Y = (top + height)/2;

          P.push({ ...item, parkingdetails: item, X, Y });

          if(P.length === Parkings.length){
            setPmeasure(P);
          };
        });
      });
    }
  }, [isloading]);

  const onUnPark = (customer) => {
    let Entrances = [...emeasure];

    if(!customer.park) return;

    const carquee = _.findIndex(emeasure, item => {
      return !item.car;
    });

    if(carquee === -1){
      Alert.alert("Notice", "Car exit is queuing.");
      return;
    };

    const parkquee = _.findIndex(pmeasure, item => {
      return item.id === customer.id;
    });

    const entranceX = customer?.X;
    const entranceY = customer?.Y;
    let storeDistance = null;
    let entranceAvailable = null;

    _.every(Entrances, item => {

      const parkingX = item.X;
      const parkingY = item.Y;
      const x2x1 = Math.pow(parkingX - entranceX, 2);
      const y2y1 = Math.pow(parkingY - entranceY, 2);
      const distance =  Math.sqrt(x2x1 + y2y1);

      if(item.id === customer?.park.id && !item.car){    
        entranceAvailable = item;
        return false;
      }

      if(storeDistance === null || distance < storeDistance){    
        storeDistance = distance;
        entranceAvailable = item;
      }

      return true;
    });

    if(entranceAvailable){
      const resultent = Entrances.map((item) => {
        if(item.id === entranceAvailable.id) return {
          ...item, 
          car: {...customer.park.car, status: "exit" },
          parkingdetails: customer.parkingdetails 
        };

        return item;
      });

      setEmeasure(resultent);

      if(parkquee !== -1){
        const resultent = pmeasure.map((item, index) => {
          if(index === parkquee) {
            delete item.park;
  
            return {...item }
          };
  
          return item;
        });
        setPmeasure(resultent);
      };
    }
  };

  return (
    <View ref={containerRef} style={styles.container}>
      <FlatList
        numColumns={7}
        data={Parkings}
        ListHeaderComponent={
          <>
          <Entrance />
          <ItemSeparatorComponent />
          </>
        }
        ItemSeparatorComponent={() => <ItemSeparatorComponent />}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({item, index}) => {
          const customer = pmeasure[index] || {};

          return <ParkingSlot key={index.toString()} 
            ref={item.ref}
            item={item}
            customer={customer}
            onPress={()=> onUnPark(customer)} />
        }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  columnWrapperStyle: {
		flex: 1,
		justifyContent: "flex-start",
	},
  itemSeparator: { 
    height: 50, 
    justifyContent: "center",
    backgroundColor: Color.border1
  },
});

function areEqual (prevProps, nextProps) {
	return (
		prevProps.pmeasure === nextProps.pmeasure &&
		prevProps.emeasure === nextProps.emeasure &&
		prevProps.isloading === nextProps.isloading
	);
}

export default React.memo(Parking, areEqual);