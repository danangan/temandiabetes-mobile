import React from 'react';
import { View } from 'react-native';

import BloodGlucose from './BloodGlucose';
import Hba1c from './Hba1c';
import Food from './Food';
import BloodPressure from './BloodPressure';
import Activity from './Activity';
import Weight from './Weight';

class MenuButton extends React.Component {
  render() {
    console.log('PROPS MENU BUTTON ', this.props);
    return (
      <View>
        <BloodGlucose onModalInput={this.props.onModalInput} />
        <Hba1c onModalInput={this.props.onModalInput} />
        <Food onModalInput={this.props.onModalInput} />
        <BloodPressure onModalInput={this.props.onModalInput} />
        <Activity onModalInput={this.props.onModalInput} />
        <Weight onModalInput={this.props.onModalInput} />
      </View>
    );
  } 
};

export default MenuButton;
