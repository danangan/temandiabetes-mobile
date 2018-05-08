import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Platform, TouchableOpacity, FlatList } from 'react-native';

import { Card, FooterThread, HeaderThread } from '../../../components';
import { getLatestThreads, makeBookmark } from '../../../actions/threadActions';
import ContentThread from './contentThread';
import color from '../../../style/color';

class TabLatest extends Component {
	static navigatorStyle = {
		topBarCollapseOnScroll: true,
		navBarHideOnScroll: true
	};

	constructor(props) {
		super(props);
		this.state = {
      refreshing: false
    };

    this.toThreadDetails = this.toThreadDetails.bind(this)
    this.onPostBookmark = this.onPostBookmark.bind(this)
	}

  componentDidMount() {
    this.props.getLatestThreads()
  }

	toThreadDetails(threads) {
		this.props.navigator.push({
			screen: 'TemanDiabets.ThreadDetails',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: threads
		});
	}

	onPostBookmark = async (thread, threadIndex) => {
		this.setState(
			{
				isProses: true
			},
			() => {
				this.props.makeBookmark(thread, threadIndex);
			}
		);
	};

	renderItem(threads) {
		const { author, comments } = threads.item;
		return (
			<TouchableOpacity
				key={threads.index}
				onPress={() => this.toThreadDetails(threads)}
			>
				<Card containerStyle={styles.cardStyle}>
					<HeaderThread
						source={author.foto_profile}
						name={author.nama}
						category={author.tipe_user.toUpperCase()}
					/>
					<ContentThread property={threads.item} />
					<FooterThread
						leftAction={() => this.toThreadDetails(threads)}
						numOfComments={comments.length === 0 ? '' : comments.length}
						isOpen={this.togleModal}
						saveBookmark={this.onPostBookmark}
						threadItem={threads.item}
						threadIndex={threads.index}
					/>
				</Card>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<FlatList
					data={this.props.dataThreads.item.data}
					renderItem={item => this.renderItem(item)}
					refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
				/>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: color.solitude
	},
	cardStyle: {
		...Platform.select({
			android: { elevation: 4 },
			ios: {
				shadowColor: 'rgba(0,0,0, .2)',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 2.5
			}
		})
	}
};

const mapStateToProps = state => ({
	dataThreads: state.threadsReducer.listLatestThreads,
});

const mapDispatchToProps = dispatch => ({
	getLatestThreads: () => dispatch(getLatestThreads()),
	makeBookmark: (thread, threadIndex) => dispatch(makeBookmark(thread, threadIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabLatest);
