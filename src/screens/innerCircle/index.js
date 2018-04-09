import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { NavigationBar } from '../../components';
import color from '../../style/color';
import Style from '../../style/defaultStyle';
import TabFamily from './TabFamily';
import TabRequest from './TabRequest';
import TabPending from './TabPending';

const listTabs = ['KELUARGA', 'PERMINTAAN', 'PENDING'];

class InnerCircle extends Component {
	constructor(props) {
		super(props);
		this.state = {
      tab: 0,
      innerCircle: [1, 2, 3, 5, 6, 7]
		};
	}

	renderTabContent = () => {
		if (this.state.tab === 0) {
			return <TabFamily innerCircle={this.state.innerCircle} />;
		}
		if (this.state.tab === 1) {
			return <TabRequest innerCircle={this.state.innerCircle} />;
		}
		if (this.state.tab === 2) {
			return <TabPending innerCircle={this.state.innerCircle} />;
		}
	};

	render() {
		return (
			<View style={styles.containerStyle}>
				<NavigationBar onPress={() => this.props.navigator.pop()} title={'Inner Circle List'} />
				<View style={styles.countContainerStyle}>
					<View style={styles.countContentStyle}>
						{listTabs.map((tab, index) => (
							<TouchableOpacity onPress={() => this.setState({ tab: index })}>
								<Text
									style={[
										styles.countStyle,
										{
											fontWeight: this.state.tab === index ? '500' : '0',
											color: this.state.tab === index ? color.black : color.gray
										}
									]}
								>
									12
								</Text>
								<Text style={styles.titleStyle}>{tab}</Text>
								<Text
									style={[
										styles.indicatorStyle,
										{
											borderBottomWidth: this.state.tab === index ? 3 : 0,
											borderBottomColor: this.state.tab === index ? color.red : color.white
										}
									]}
								/>
							</TouchableOpacity>
						))}
					</View>
					<View style={{ flex: 5 }}>{this.renderTabContent()}</View>
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
		backgroundColor: color.white,
		padding: Style.PADDING
	},
	countContainerStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	countContentStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: Style.PADDING * 1.5
	},
	countStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE * 1.5,
		textAlign: 'center'
	},
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALL,
		color: 'rgba(74,74,74,1)',
		fontWeight: '300'
	},
	indicatorStyle: {
		width: '50%',
		borderBottomWidth: 3,
		borderBottomColor: color.red,
		alignSelf: 'center'
	}
};

export default InnerCircle;
