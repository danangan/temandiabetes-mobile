import React, { Component } from 'react';
import { connect } from 'react-redux';

import Swipper from './Swipper';
import Onboarding from './Onboarding';
import { Spinner } from '../../components/Spinner';

class Screen extends Component {
  constructor(props) {
    super(props)
  }

	render() {
    const { onboarding } = this.props
    let onboardingScreens = []
    for (let idx = 0; idx < onboarding.length; idx++) {
      const item = onboarding[idx];
      onboardingScreens.push(
        <Onboarding
          key={idx}
          imageURL={item.image.imageURL}
          title={item.title}
          article={item.article}
        />
      );
    }

    const mainScreen = (
			<Swipper navigation={this.props.navigation} fcmToken={this.props.fcmToken}>
        { onboardingScreens }
			</Swipper>
    );

    const loader = (
      <Spinner
        color="red"
        size="large"
        containerStyle={{ backgroundColor: 'white' }}
        textStyle={{ color: 'gray' }}
        text="Loading your app..."
      />
    );

    return mainScreen;
	}
}

const mapStateToProps = state => ({
	onboarding: state.onBoardingReducer.onboarding
});

export default connect(mapStateToProps, null)(Screen);
