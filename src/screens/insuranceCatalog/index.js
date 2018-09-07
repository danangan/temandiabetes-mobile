import React, { Component } from 'react';
import { Text, View, FlatList, Platform, Image, TouchableOpacity } from 'react-native';
import { Spinner } from '../../components';
import color from '../../style/color';
import Style from '../../style/defaultStyle';
import { API_CALL } from '../../utils/ajaxRequestHelper';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insuranceList: [],
      isLoading: true
    };

    this.renderItem = this.renderItem.bind(this);
    this.renderEmptySection = this.renderEmptySection.bind(this);
  }

  async componentDidMount() {
    const option = {
      method: 'get',
      url: `/api/insurance-catalog/mobile/list`
    };

    try {
      const { data: { data: { docs } }} = await API_CALL(option);

      this.setState({
        isLoading: false,
        insuranceList: docs
      })

    } catch (error) {
      console.log(error);
    }
  }

  renderEmptySection() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
      }}>
        <Text style={styles.emptyContentText}>Katalog asuransi kosong.</Text>
      </View>
    );
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.push({
            screen: 'TemanDiabetes.InsuranceCatalogDetail',
            animated: true,
            animationType: 'slide-up',
            navigatorStyle: {
              tabBarHidden: true,
              navBarHidden: true
            },
            passProps: {
              ...item
            }
          });
        }}
      >
        <View
          style={[
            styles.cardStyle,
            index === this.state.insuranceList.length - 1 ? { marginBottom: 15 } : {}
          ]}
        >
          <Image
            style={styles.imageStyle}
            source={{ uri: item.imageURL }}
          />
          <Text
            style={styles.titleStyle}
          >{item.title}</Text>
          <Text
            style={styles.subTitleStyle}
          >{item.subTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.containerStyle}>
        {
          this.state.isLoading &&
          <Spinner
            containerStyle={styles.spinnerStyle}
            textStyle={{ color: color.black }}
            color={color.black}
            text={''}
            size="large"
          />
        }
        {
          !this.state.isLoading &&
          <FlatList
            ListEmptyComponent={this.renderEmptySection}
            data={this.state.insuranceList}
            renderItem={item => this.renderItem(item, this.props.navigator)}
          />
        }
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude
  },
  cardStyle: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#fff',
    height: 210,
    borderRadius: 10,
    padding: 10,
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    }),
  },
  imageStyle: {
    width: '100%',
    height: 140,
    marginBottom: 10
  },
  titleStyle: {
    fontFamily: Platform.OS === 'android' ? 'Montserrat-Regular' : 'MontSerrat',
    fontSize: Style.FONT_SIZE_TITLE / 1.2,
    marginBottom: 5
  },
  subTitleStyle: {
    fontFamily: Platform.OS === 'android' ? 'Montserrat-Regular' : 'MontSerrat-Light',
    fontSize: Style.FONT_SIZE_SMALLER / 1.2,
  },
  spinnerStyle: {
    backgroundColor: 'transparent',
    paddingBottom: Style.DEVICE_WIDTH / 2
  },
  emptyContentText: {
    fontFamily: 'Montserrat-Light',
    color: '#aaa',
  }
};
