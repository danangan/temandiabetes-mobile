import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

import UsersList from './UsersList';
import color from '../../../style/color';
import Style from '../../../style/defaultStyle';
import SearchBar from './innerCircleList/Search';
import { getUsers } from '../../../actions';
import { Spinner } from '../../../components';
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
      notFound: false
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleResults = results => {
    this.setState({ results });
    if (results.length) {
      this.setState({ notFound: true });
    }
  };

  hideSearchBar = () => this.setState({ notFound: false }, () => this.searchBar.hide());

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
    <View style={styles.navBarContainerStyle}>
      <TouchableOpacity style={styles.leftButtonStyle} onPress={() => this.props.navigator.pop()}>
        <Image
          resizeMode={'contain'}
          style={styles.iconStyle}
          tintColor={color.red}
          source={Images.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.navBarTitleStyle}>ADD INNER CIRCLE</Text>
      <TouchableOpacity onPress={() => this.searchBar.show()} style={styles.rightButtonStyle}>
        <Image
          resizeMode={'contain'}
          style={styles.iconStyle}
          tintColor={color.red}
          source={Images.searchIcon}
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
    if (users !== undefined) {
      return users.map((item, index) => (
        <UsersList navigation={this.pushNavigation} item={item} key={index} />
      ));
    }
  }

  renderContent = () => (
    <View style={styles.containerStyle}>
      {this.renderNavBar()}
      <ScrollView>
        <View style={styles.contentStyle}>
          {this.state.results.length === 0 ? (
            this.state.notFound ? (
              <View style={styles.placeholderContainerStyle}>
                <Text style={styles.placeholderStyle}>Pencarian tidak ditemukan</Text>
              </View>
            ) : (
              this.renderData()
            )
          ) : (
            this.state.results.map((item, index) => (
              <UsersList navigation={this.pushNavigation} item={item} key={index} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );

  render() {
    const { users } = this.props.data;
    if (users === undefined) {
      return <Spinner color={color.red} text="" size="large" />;
    }

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
  data: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerCircle);
