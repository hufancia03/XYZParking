import React, { createContext, useState, useEffect } from "react";
import { useInteractionManager } from "@react-native-community/hooks";
import { CustomerCar, ParkingEntrance } from "./assets/MockData";
export const AppContext = createContext();
import moment from "moment";

const AppProvider = ({ children }) => {
	const loaded = useInteractionManager();
  const [isloading, setLoading] = useState(loaded);
  const [selectedCar, setSelectedCar] = useState({});
  const [timer, setTimer] = useState(+moment());
  const [pmeasure, setPmeasure] = useState([]);
  const [emeasure, setEmeasure] = useState(ParkingEntrance);
  const [carlist, setCarList] = useState(CustomerCar);

  useEffect(() => {
    if(loaded){
      setLoading(loaded);
    }
  }, [loaded]);

  return (
    <AppContext.Provider value={{  
      isloading, setLoading,
      selectedCar, setSelectedCar,
      pmeasure, setPmeasure,
      emeasure, setEmeasure,
      timer, setTimer,
      carlist, setCarList }} >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
