import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CustomerItem from './CustomerItem';
import PropTypes from "prop-types";
import _ from "lodash"

const Customer = (props) => {
  const {  carlist, setSelectedCar } = props;

  return (
    <View style={styles.container}>
      <FlatList 
        horizontal
        data={carlist}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item, index}) => {
          return <CustomerItem 
            key={index.toString()}
            item={item}
            onPress={setSelectedCar}/>
        }} />
    </View>
  );
};

Customer.propTypes = {
  carlist: PropTypes.array,
  setSelectedCar: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
  },
});

function areEqual (prevProps, nextProps) {
	return (
    prevProps.carlist === nextProps.carlist &&
    prevProps.setSelectedCar === nextProps.setSelectedCar
	);
}

export default React.memo(Customer, areEqual);
