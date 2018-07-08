import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Images from '../../../assets/images';

const MealTime = ({ foodStyle }) => (
  <View style={styles.ContainerStyle}>
    <View style={styles.mealTimeContainerStyle}>
      <Image source={Images.cutleryYellowIcon} style={styles.iconStyle} />
      <Text style={foodStyle}>Sarapan</Text>
    </View>
    <View style={styles.mealTimeContainerStyle}>
      <Image source={Images.cutleryBlueIcon} style={styles.iconStyle} />
      <Text style={foodStyle}>Makan Siang</Text>
    </View>
    <View style={styles.mealTimeContainerStyle}>
      <Image source={Images.cutleryRedIcon} style={styles.iconStyle} />
      <Text style={foodStyle}>Makan Malam</Text>
    </View>
    <View style={styles.mealTimeContainerStyle}>
      <Image source={Images.cutleryPurpleIcon} style={styles.iconStyle} />
      <Text style={foodStyle}>Snack</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  ContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  mealTimeContainerStyle: {
    flexDirection: 'row',
    marginTop: 3
  },
  iconStyle: {
    width: 12,
    height: 15,
    marginRight: 10.89
  }
});

export default MealTime;
