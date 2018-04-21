import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import Swipper from './Swipper';
import Onboarding from './Onboarding';
import { Spinner } from '../../components/Spinner';
import Style from '../../style/defaultStyle';

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    // giving the time for the firebase to log in
    setTimeout(() => {
      this.setState({ loading: false })
    }, 500)
  }

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

    const mainScreen = (
			<Swipper navigation={this.props.navigation}>
        { onboardingScreens }
			</Swipper>
    )

    const loader = (
      <Spinner
        color="red"
        size="large"
        containerStyle={{ backgroundColor: 'white' }}
        textStyle={{ color: 'gray1' }}
        text="Loading your app..." />
    )

    return this.state.loading && onboarding.length === 0 ? loader  : mainScreen;
	}
}

const mapStateToProps = state => ({
	onboarding: state.onBoardingReducer.onboarding
});

export default connect(mapStateToProps, null)(Screen);
