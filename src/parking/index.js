import React, { useContext } from 'react';
import { AppContext } from "../AppProvider";
import Parking from './Parking';

const Main = () => {
  const { isloading, emeasure, setEmeasure, pmeasure, setPmeasure } = useContext(AppContext)

  return <Parking {...{ isloading, emeasure, setEmeasure, pmeasure, setPmeasure}} />
};

 export default Main;
