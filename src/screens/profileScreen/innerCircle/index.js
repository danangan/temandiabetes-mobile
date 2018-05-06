import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

import CardInnerCircle from './CardInnerCircle';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';
import SearchBar from './innerCircleList/Search';
import { getUsers, getOneUser } from '../../../actions';

class InnerCircle extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleResults = results => this.setState({ results });
  hideSearchBar = () => this.searchBar.hide();

  pushNavigation = item => {
    this.props.getOneUser(item._id);
    this.props.navigator.push({
      screen: 'TemanDiabets.ProfileDetails',
      passProps: {
        id: item._id,
        name: item.nama,
        typeOfUser: item.tipe_user,
        visitProfile: 'visited',
        innerCircles: item.innerCircles,
        profilePicture: item.foto_profile
      },
      animation: true,
      animationType: 'fade'
    });
  };

  renderNavBar = () => (
    <View style={styles.navBarContainerStyle}>
      <TouchableOpacity style={styles.leftButtonStyle} onPress={() => this.props.navigator.pop()}>
        <Image
          resizeMode={'contain'}
          style={styles.iconStyle}
          tintColor={color.red}
          source={require('../../../assets/icons/back.png')}
        />
      </TouchableOpacity>
      <Text style={styles.navBarTitleStyle}>ADD INNER CIRCLE</Text>
      <TouchableOpacity onPress={() => this.searchBar.show()} style={styles.rightButtonStyle}>
        <Image
          resizeMode={'contain'}
          style={styles.iconStyle}
          tintColor={color.red}
          source={require('../../../assets/icons/search.png')}
        />
      </TouchableOpacity>
      <SearchBar
        ref={ref => (this.searchBar = ref)}
        data={this.props.data.users}
        handleResults={this.handleResults}
        placeholder="Search..."
        onBack={this.hideSearchBar}
        fontFamily={'Montserrat-Regular'}
        fontSize={Style.FONT_SIZE}
      />
    </View>
  );

  renderData() {
    const { users } = this.props.data;
    if (users.length) {
      return users.map((item, index) => (
        <CardInnerCircle navigation={this.pushNavigation} item={item} key={index} />
      ));
    }
  }

  renderContent = () => (
    <View style={styles.containerStyle}>
      {this.renderNavBar()}
      <View style={styles.contentStyle}>
        <ScrollView>
          {this.state.results.length === 0 ? (
            this.props.data.status === null ? (
              <View />
            ) : (
              this.renderData()
            )
          ) : (
            this.state.results.map((item, index) => (
              <CardInnerCircle navigation={this.pushNavigation} item={item} key={index} />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );

  render() {
    return this.renderContent();
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.white
  },
  contentStyle: {
    paddingTop: 15,
    paddingLeft: Style.PADDING,
    paddingRight: Style.PADDING,
    paddingBottom: Style.PADDING
  },
  navBarContainerStyle: {
    paddingTop: Style.PADDING,
    paddingLeft: Style.PADDING,
    paddingRight: Style.PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftButtonStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 50
  },
  iconStyle: {
    width: 25,
    height: 25
  },
  navBarTitleStyle: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    textAlign: 'center',
    color: color.red
  },
  rightButtonStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 50
  }
};

const mapStateToProps = state => ({
  data: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  getOneUser: userId => dispatch(getOneUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerCircle);
