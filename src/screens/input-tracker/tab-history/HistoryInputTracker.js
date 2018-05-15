import React from 'react';
import { View, StyleSheet } from 'react-native';

import HistoryHba1c from './HistoryHba1c';
import HistoryActivity from './HistoryActivity';
import HistoryBloodPressure from './HistoryBloodPressure';
import HistoryWeight from './HistoryWeight';
import Style from '../../../style/defaultStyle';

const HistoryInputTracker = () => (
  <View style={styles.containerStyle}>
    <HistoryHba1c />
    <HistoryActivity />
    <HistoryBloodPressure />
    <HistoryWeight />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Style.DEVICE_WIDTH,
    marginTop: 19.19,
    paddingTop: 5,
    paddingBottom: 5,
  }
});

export default HistoryInputTracker;
