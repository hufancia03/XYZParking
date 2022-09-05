import React, { useContext } from 'react';
import { AppContext } from "../AppProvider";
import Entrance from './Entrance';

const Main = () => {
  const { isloading, emeasure, setEmeasure,
    pmeasure, setPmeasure, timer, carlist, setCarList } = useContext(AppContext);

  return <Entrance {...{isloading, emeasure, setEmeasure, pmeasure, setPmeasure, 
    timer, carlist, setCarList}} />
};

 export default Main;
