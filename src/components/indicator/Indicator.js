import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ViewPropTypes from '../../config/ViewPropTypes';
import color from '../../style/color';
import Style from '../../style//defaultStyle';

const Indicator = ({ persentase }) => (
  <View
    style={ styles.parentStyle }
  >
    <View
      style={[ styles.parameterStyle, persentase ]}
    />
  </View>
);

Indicator.propTypes = {
	persentase: ViewPropTypes.style,
};

const styles = {
	parentStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 30,
    height: 10
  },
	parameterStyle: {
    borderRadius: 30,
    backgroundColor: 'red',
    height: 10
  }
};

export { Indicator };
