import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

import UsersList from './UsersList';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';
import { getUsers, searchUser, resetResultSearch } from '../../../actions';
import { Spinner, TextField } from '../../../components';
import Images from '../../../assets/images';

class InnerCircle extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchBar: false
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  pushNavigation = item => {
    this.props.navigator.push({
      screen: 'TemanDiabetes.ProfileDetails',
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
    <View>
      {!this.state.searchBar && (
        <View style={styles.navBarContainerStyle}>
          <TouchableOpacity
            style={styles.leftButtonStyle}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              resizeMode={'contain'}
              style={styles.iconStyle}
              tintColor={color.red}
              source={Images.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.navBarTitleStyle}>TAMBAHKAN INNER CIRCLE</Text>
          <TouchableOpacity
            onPress={() => this.setState({ searchBar: true })}
            style={styles.rightButtonStyle}
          >
            <Image
              resizeMode={'contain'}
              style={styles.iconStyle}
              tintColor={color.red}
              source={Images.searchIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      {this.state.searchBar && (
        <View
          style={{
            marginTop: Style.PADDING + 10,
            paddingLeft: Style.PADDING,
            paddingRight: Style.PADDING,
            marginBottom: Style.PADDING
          }}
        >
          <TextField
            onPressRight={() => this.setState({ searchBar: false }, () => this.props.resetState())}
            placeholder="Search..."
            onChangeText={text => this.props.searchUser(text)}
            inputStyle={styles.searchBar}
            underlineColorAndroid="rgba(0,0,0,0)"
            rightIcon={Images.closeIcon}
            tintColor={color.red}
            rightButtonStyle={{ width: 35, height: 35 }}
            iconRightStyle={{
              alignSelf: 'flex-end',
              height: 10,
              width: 10
            }}
          />
        </View>
      )}
    </View>
  );

  renderInitialData() {
    const { users } = this.props.initData;
    if (users !== undefined) {
      return users.map((item, index) => (
        <UsersList navigation={this.pushNavigation} item={item} key={index} />
      ));
    }
  }

  renderResultData = () => {
    const { result } = this.props.resultData;
    return result.map((item, index) => (
      <UsersList navigation={this.pushNavigation} item={item} key={index} />
    ));
  };

  renderContent = () => {
    const { result, statusSearch } = this.props.resultData;
    switch (true) {
      case statusSearch === 400:
        return (
          <View style={styles.placeholderContainerStyle}>
            <Text style={styles.placeholderStyle}>Pencarian Anda tidak ditemukan.</Text>
          </View>
        );
      case result.length !== 0:
        return this.renderResultData();
      default:
        return this.renderInitialData();
    }
  };

  render() {
    const { users } = this.props.initData;
    if (users === undefined) {
      return <Spinner color={color.red} text="" size="large" />;
    }

    return (
      <View style={styles.containerStyle}>
        {this.renderNavBar()}
        <ScrollView>
          <View style={styles.contentStyle}>{this.renderContent()}</View>
        </ScrollView>
      </View>
    );
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
  },
  placeholderContainerStyle: {
    marginTop: Style.CARD_WIDTH / 2,
    alignSelf: 'center',
    alignItems: 'center'
  },
  placeholderStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    justifyContent: 'center',
    textAlign: 'center'
  }
};

const mapStateToProps = state => ({
  initData: state.userReducer,
  resultData: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  searchUser: name => dispatch(searchUser(name)),
  resetState: () => dispatch(resetResultSearch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerCircle);
