import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { getThreadDetails, toFollowThread, toUnFollowThread, getCommentDetails } from '../../../actions/threadActions';

import { CardSection, Spinner } from '../../../components';

import { ContentDetail } from './contentDetail';
import HeaderDetail from './headerDetail';
import color from '../../../style/color';

class ThreadDetails extends React.Component {
	static navigatorStyle = {
		tabBarHidden: true
	};

	constructor(props) {
    super(props);
		this.state = {
			idThread: this.props.item._id,
			isProcess: true,
			isLoadingSubscribe: false
		};
		this.requestFollowThread = this.requestFollowThread.bind(this);
		this.requestUnfollowThread = this.requestUnfollowThread.bind(this);
		this.toCommentDetails = this.toCommentDetails.bind(this);
	}

	componentDidMount() {
		this.props.getThreadDetails(this.state.idThread);
	}

	shouldComponentUpdate() {
		return true;
	}

	componentDidUpdate() {
		const { listThreads, followThread } = this.props.dataThreads;
		if (listThreads.threadDetails !== null && this.state.isProcess) {
			this.setState({
				isProcess: false
			});
		} else if (followThread.status_code === 200 && this.state.isLoadingSubscribe) {
			setTimeout(() => {
				this.setState({
					isLoadingSubscribe: false,
				});
			}, 1000);
		}
	}

	requestUnfollowThread() {
		this.setState({
			isLoadingSubscribe: true
		}, () => {
			this.props.toUnFollowThread(this.state.idThread);
		});
	}

	requestFollowThread() {
		this.setState({
			isLoadingSubscribe: true
		}, () => {
			this.props.toFollowThread(this.state.idThread);
		});
	}

	toCommentDetails(idComment) {
		console.log('ID idThread ', idComment);
		this.props.getCommentDetails(idComment);
		this.props.navigator.push({
			screen: 'TemanDiabets.CommentDetails',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: {
				// commentItem: this.props.contentComment
			}
		});
	}

	toNavigateScreen(screen) {
		this.props.navigator.push({
			screen,
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: {
				// commentItem: this.props.contentComment
			}
		});
	}

	renderButtonFollow() {
		const { listThreads, followThread } = this.props.dataThreads;
		if (followThread.isFetch) {
			return (
				<TouchableOpacity
					onPress={this.requestFollowThread}
					style={{ justifyContent: 'center', minWidth: 100, height: 25, minHeight: 25, backgroundColor: '#252c68', marginRight: 10 }}>
					<ActivityIndicator size="small" color="#8084a7" />
					{/* <Text
						style={{
							fontSize: 12,
							paddingHorizontal: 20,
							paddingVertical: 3,
							color: '#8084a7'
						}}
					>
							Loading...
					</Text> */}
				</TouchableOpacity>
			);
		} else if (listThreads.threadDetails.isSubscriber) {
			return (
				<TouchableOpacity
					onPress={this.requestUnfollowThread}
					style={{ justifyContent: 'center', minWidth: 100, height: 25, minHeight: 25, backgroundColor: '#252c68', marginRight: 10 }}>
					<Text
						style={{
							fontSize: 12,
							paddingHorizontal: 20,
							paddingVertical: 3,
							color: '#8084a7',
							textAlign: 'center'
						}}
					>
						Unsubscribe
					</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				onPress={this.requestFollowThread}
				style={{ justifyContent: 'center', minWidth: 100, height: 25, minHeight: 25, backgroundColor: '#252c68', marginRight: 10 }}>
				<Text
					style={{
						fontSize: 12,
						paddingHorizontal: 20,
						paddingVertical: 3,
						color: '#8084a7',
						textAlign: 'center'
					}}
				>
					Ikuti
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
    const { topic, author, _id } = this.props.item;
		const { listThreads } = this.props.dataThreads;
		if (this.state.isProcess) {
			return (
				<Spinner
					containerStyle={{ backgroundColor: '#f2f4fd' }}
					color="#FFDE00"
					size="large"
				/>
			);
		}

		return (
			<View style={{ flex: 2, backgroundColor: color.solitude }}>
				<HeaderDetail authorItem={author} />
				<ScrollView>
					{/* <ContentDetail /> */}
					<CardSection containerStyle={{ backgroundColor: color.solitude, margin: 0 }}>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'flex-start',
								paddingHorizontal: 15,
								borderRadius: 15
							}}
						>
							<Text style={{ fontSize: 22 }}>
								{topic}
							</Text>
						</View>
					</CardSection>
					<CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'flex-start',
								paddingVertical: 5,
								paddingHorizontal: 15,
								borderRadius: 15
							}}
						>
							{
								listThreads.threadDetails !== null ? this.renderButtonFollow() : null
							}
							<TouchableOpacity
								onPress={() =>
									this.setState({
										isProcess: true
									}, () => {
										this.props.navigator.push({
											screen: 'TemanDiabets.ModalPostComment',
											navigatorStyle: {
												navBarHidden: true
											},
											passProps: {
												idThread: _id
											},
										});
									})
								}
								style={{ justifyContent: 'center', backgroundColor: '#252c68', minWidth: 100, height: 25, minHeight: 25, }}>
								<Text
									style={{
										fontSize: 12,
										paddingHorizontal: 20,
										paddingVertical: 3,
										color: '#8084a7',
										textAlign: 'center'
									}}
								>
									Balas
								</Text>
							</TouchableOpacity>
						</View>
					</CardSection>
					<ContentDetail
						threadItem={this.props.item}
						threadDetails={listThreads.threadDetails}
						navigator={this.toCommentDetails}
					/>
				</ScrollView>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							isProcess: true
						});
						this.props.navigator.pop();
					}}
					style={styles.buttonBack}
				>
					<Text style={styles.buttonText}>X</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	buttonBack: {
		width: '100%',
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: '#fff',
		fontSize: 30
	}
};

const mapStateToProps = state => ({
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
	getThreadDetails: (idThread) => dispatch(getThreadDetails(idThread)),
	toFollowThread: (idThread) => dispatch(toFollowThread(idThread)),
	toUnFollowThread: (idThread) => dispatch(toUnFollowThread(idThread)),
	getCommentDetails: (idComment) => dispatch(getCommentDetails(idComment))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadDetails);

