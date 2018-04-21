import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import Swipper from './Swipper';
import Onboarding from './Onboarding';
import Style from '../../style/defaultStyle';

class Screen extends Component {
	render() {
    const { onboarding } = this.props
    let onboardingScreens = []
    for (let idx = 0; idx < onboarding.length; idx++) {
      const item = onboarding[idx];
      onboardingScreens.push(
        <Onboarding
          key={idx}
          imageURL={ item.image.imageURL }
          title={ item.title }
          article={ item.article }/>
      )
    }
		return (
			<Swipper navigation={this.props.navigation}>
        { onboardingScreens }
			</Swipper>
		);
	}
}

const mapStateToProps = state => ({
	onboarding: state.onBoardingReducer.onboarding
});

export default connect(mapStateToProps, null)(Screen);
