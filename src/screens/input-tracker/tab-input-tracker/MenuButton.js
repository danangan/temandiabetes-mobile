import React from 'react';
import { View } from 'react-native';

import BloodGlucose from './BloodGlucose';
import Hba1c from './Hba1c';
import Food from './Food';
import BloodPressure from './BloodPressure';
import Activity from './Activity';
import Weight from './Weight';
import Style from '../../../style/defaultStyle';

class MenuButton extends React.Component {
  render() {
    return (
      <View style={{ height: Style.DEVICE_HEIGHT / 1.69 }}>
        <BloodGlucose onModalInput={this.props.onModalInput} />
        <Hba1c onModalInput={this.props.onModalInput} />
        <Food toNavigate={this.props.toNavigate} />
        <BloodPressure onModalInput={this.props.onModalInput} />
        <Activity onModalInput={this.props.onModalInput} />
        <Weight onModalInput={this.props.onModalInput} />
      </View>
    );
  }
}

export default MenuButton;
