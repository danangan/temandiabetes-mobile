import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from '../../components/Spinner';
import { updateDeepLink } from '../../actions';
import landingPageURL from '../../config/landingPageURL';

class AppLoader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // handling deeplink here
    // save to store to handle later in main app
    Linking.getInitialURL().then(url => {
      this.props.updateDeepLink(url);
    });
  }

  render() {
    return (
      <Spinner
      color="red"
      size="large"
      containerStyle={{ backgroundColor: 'white' }}
      textStyle={{ color: 'gray' }}
      text="Memuat aplikasi Teman Diabetes..."
    />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateDeepLink: deepLink => dispatch(updateDeepLink(deepLink))
});

export default connect(
  null,
  mapDispatchToProps
)(AppLoader);
