import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useInteractionManager } from "@react-native-community/hooks";
import AppProvider from "./AppProvider"
import Customer from "./customer";
import Parking from "./parking";
import Entrance from "./entrance";
import Timer from "./timer";

const App = () => {

  return (
    <AppProvider>
      <SafeAreaView style={styles.container} >
        <Timer />
        <Customer />
        {/* <Entrance /> */}
        <Parking />
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
