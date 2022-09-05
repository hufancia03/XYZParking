import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import EntranceItem from './EntranceItem';
import PropTypes from "prop-types";
import _ from "lodash";

const Entrance = ({ isloading, emeasure, setEmeasure, pmeasure, setPmeasure, timer, carlist, setCarList  }) => {
  const containerRef = useRef();

  const onPark = (arg1, arg2) => {
    const carquee = _.findIndex(emeasure, item => {
      return item.id === arg1.id;
    });

    if(carquee !== -1){
      const resultent = emeasure.map((item, index) => {
        if(index === carquee) return {...item, ...arg1};

        return item;
      });
      setEmeasure(resultent)
    };

    if(arg2.car.status === "enter"){
      const carSize = arg2.car.name;
      const entranceX = arg2.X;
      const entranceY = arg2.Y;
      let storeDistance = null;
      let parkingAvailable = null;

      _.forEach(pmeasure, park => {
        const parkingX = park.X;
        const parkingY = park.Y;
        const x2x1 = Math.pow(parkingX - entranceX, 2);
        const y2y1 = Math.pow(parkingY - entranceY, 2);
        const distance =  Math.sqrt(x2x1 + y2y1);

        if((carSize === "L" && ["LP"].includes(park.name)) && !park.park ){
          if(storeDistance === null || distance < storeDistance){    
            storeDistance = distance;
            parkingAvailable = park;
          }
         
        }else if((carSize === "M" && ["LP", "MP"].includes(park.name)) && !park.park ){
           if(storeDistance === null || distance < storeDistance){    
            storeDistance = distance;
            parkingAvailable = park;
          }
        }else if((carSize === "S" && ["LP", "MP", "SP"].includes(park.name)) && !park.park ){
           if(storeDistance === null || distance < storeDistance){    
            storeDistance = distance;
            parkingAvailable = park;
          }
        }
      });

      if(parkingAvailable){
        const resultent = pmeasure.map((item) => {
          if(item.id === parkingAvailable.id) return {...item, park: arg2};
  
          return item;
        });
        setPmeasure(resultent);
      }
    };

    if(arg2.car.status === "exit"){
      const CarListHolder = [...carlist];

      CarListHolder.push({...arg2.car, status: "exit"});
      setCarList(CarListHolder);
    }
  };

  const onAddEntrance = () => {
    const newEmeasure = [...emeasure];
    const lastEntry = newEmeasure[newEmeasure.length - 1];
    const top = lastEntry.top;
    const width = lastEntry.width;
    const height = lastEntry.height;
    const left = lastEntry.left + width;
    const X = (left + width)/2;
    const Y = (top + height)/2;

    newEmeasure.push({
      id: lastEntry.id + 1,
      name: "P",
      top,
      width,
      height,
      left, X, Y,
      ref: React.createRef(),
    });

    setEmeasure(newEmeasure);
  };

  useEffect(() => {
    if (containerRef.current) {
      let E = [];

      emeasure.forEach(item => {
        item?.ref?.current?.measureLayout(containerRef.current, (left, top, width, height) => {
          const X = (left + width)/2;
          const Y = (top + height)/2;

          E.push({ ...item, X, Y, left, top, width, height });

          if(E.length === emeasure.length){
            setEmeasure(E);
          }
        });
      })
    }
  }, [isloading]);

  return (
    <View ref={containerRef} style={styles.container}>
      <FlatList 
        horizontal
        data={emeasure.concat({name: "ADD"})}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item, index}) => {
          const car = emeasure[index] || {};

          return (
            <EntranceItem key={index.toString()}
              car={car}
              item={item}
              timer={timer}
              ref={item.ref}
              onPark={onPark}
              onAddEntrance={onAddEntrance} />
          );
        }} />
    </View>
  );
};

Entrance.propTypes = {
  emeasure: PropTypes.array,
  isloading: PropTypes.bool,
  setEmeasure: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 90
  },
});

function areEqual (prevProps, nextProps) {
	return (
		prevProps.emeasure === nextProps.emeasure &&
		prevProps.pmeasure === nextProps.pmeasure &&
		prevProps.timer === nextProps.timer &&
    prevProps.isloading === nextProps.isloading
	);
}

export default React.memo(Entrance, areEqual);
