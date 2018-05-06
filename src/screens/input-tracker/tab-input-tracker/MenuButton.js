import React from 'react';
import { View } from 'react-native';

import BloodGlucose from './BloodGlucose';
import Hba1c from './Hba1c';
import Food from './Food';
import BloodPressure from './BloodPressure';
import Activity from './Activity';
import Weight from './Weight';

const MenuButton = () => (
  <View>
    <BloodGlucose />
    <Hba1c />
    <Food />
    <BloodPressure />
    <Activity />
    <Weight />
  </View>
);

export default MenuButton;
