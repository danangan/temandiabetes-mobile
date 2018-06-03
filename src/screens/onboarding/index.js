import React, { Component } from 'react';
import { StatusBar, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';

import Screen from './Screen';
import { onBoarding, updateDeepLink } from '../../actions';
import landingPageURL from '../../config/landingPageURL';

class OnBoardingScreen extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		StatusBar.setHidden(true);
    this.props.onBoarding();

    // handling deeplink here
    // save to store to handle later in main app
    let url = Linking.getInitialURL().then(url => {
      // check if it is a reset password
      // if not save it to redux store
      if (url.includes('reset-password')) {
        let pathname = url.replace(`${landingPageURL}/`, '');
        pathname = pathname.split('/')
        this.props.navigator.push({
          screen: 'TemanDiabets.ForgotPasswordInputNewPassword',
          navigatorStyle: {
            navBarHidden: true
          },
          animated: true,
          animationType: 'fade',
          passProps: {
            token: pathname[1]
          }
        });
      } else {
        this.props.updateDeepLink(url)
      }
    });
	}

	render() {
		return <Screen navigation={this.props.navigator}/>;
	}
}

const mapDispatchToProps = dispatch => ({
	onBoarding: () => dispatch(onBoarding()),
	updateDeepLink: (deepLink) => dispatch(updateDeepLink(deepLink)),
});

export default connect(null, mapDispatchToProps)(OnBoardingScreen);
