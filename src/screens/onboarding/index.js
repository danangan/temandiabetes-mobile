import React, { Component } from 'react';
import { StatusBar, Linking } from 'react-native';
import { connect } from 'react-redux';

import Screen from './Screen';
import { onBoarding, updateDeepLink } from '../../actions';
import landingPageURL from '../../config/landingPageURL';

class OnBoardingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.props.onBoarding();

    // handling deeplink here
    // save to store to handle later in main app
    const url = Linking.getInitialURL().then(url => {
      this.props.updateDeepLink(url);
    });
  }

  render() {
    return <Screen navigation={this.props.navigator} />;
  }
}

const mapDispatchToProps = dispatch => ({
  onBoarding: () => dispatch(onBoarding()),
  updateDeepLink: deepLink => dispatch(updateDeepLink(deepLink))
});

export default connect(
  null,
  mapDispatchToProps
)(OnBoardingScreen);
