import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import HeaderDetail from './HeaderDetail';
import color from '../../../style/color';
import { API_CALL } from '../../../utils/ajaxRequestHelper'
import ContentFeatured from './ContentFeatured';

class FeaturedDetail extends Component {
	static navigatorStyle = {
		tabBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
      thread: {}
    };
  }

  async fetchFeaturedDetail() {
    const option = {
      method: 'get',
      url: `/api/threads/${this.props.item._id}`,
    };

    try {
      const { data: { data : { thread } } } = await API_CALL(option);
      this.setState({thread})
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount(){
    this.fetchFeaturedDetail()
  }

	render() {
    const { thread } = this.state
		return (
      <View style={styles.containerStyle}>
        {
          thread.author &&
          <HeaderDetail author={thread.author} />
        }
				<ContentFeatured item={thread} />
				<TouchableOpacity
					style={styles.buttonContainerStyle}
					onPress={() => this.props.navigator.pop()}
				>
					<Image
						tintColor={color.white}
						borderWidth={15}
						resizeMode={'contain'}
						source={require('../../../assets/icons/close.png')}
						style={styles.buttonImageStyle}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 2,
		backgroundColor: color.solitude
	},
  buttonContainerStyle: {
    height: 43.02,
    width: '100%',
    backgroundColor: color.red,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImageStyle: {
    height: 25,
    width: 25
  }
};

export default FeaturedDetail;
