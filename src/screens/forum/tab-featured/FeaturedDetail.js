import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import HeaderDetail from './HeaderDetail';
import color from '../../../style/color';
import ContentFeatured from './ContentFeatured';

class FeaturedDetail extends Component {
	static navigatorStyle = {
		tabBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
      <View style={styles.containerStyle}>
        {
            this.props.item.author &&
          <HeaderDetail author={this.props.item.author} />
        }
				<ContentFeatured item={this.props.item} />
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
