import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { getThreadDetails, toFollowThread } from '../../../actions/threadActions';

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
			this.setState({
				isLoadingSubscribe: false,
				isProcess: true
			}, () => {
				setTimeout(() => {
					this.props.getThreadDetails(this.state.idThread);
				}, 3000);
			});
		}
	}

	requestFollowThread() {
		this.setState({
			isLoadingSubscribe: true
		}, () => {
			this.props.toFollowThread(this.state.idThread);
		});
	}

	render() {
		const { topic, author, _id } = this.props.item;
		const { listThreads } = this.props.dataThreads;
		// console.log('this.state.isProcess ', this.state.isProcess);
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
						
							<TouchableOpacity 
								onPress={this.requestFollowThread}
								style={{ backgroundColor: '#252c68', marginRight: 10 }}>
								{/* <ActivityIndicator size="small" color="#0000ff" /> */}
								<Text
									style={{
										fontSize: 12,
										paddingHorizontal: 20,
										paddingVertical: 3,
										color: '#8084a7'
									}}
								>
									{ this.state.isLoadingSubscribe ? 'Loading...' :
										this.props.dataThreads.listThreads.threadDetails === null ? 'Loading...' :
										this.props.dataThreads.listThreads.threadDetails.isSubscriber ? 
										'Berhenti mengikuti' : 
										'Ikuti' 
									}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={() => 
									this.setState({
										isProcess: true
									}, () => {
										Navigation.showModal({
											screen: 'TemanDiabets.ModalPostComment',
											title: 'Modal',
											passProps: {
												idThread: _id
											},
											navigatorButtons: {
												leftButtons: [
													{}
												]
											},
											animationType: 'slide-up'
										});
									})
								}
								style={{ backgroundColor: '#252c68' }}>
								<Text
									style={{
										fontSize: 12,
										paddingHorizontal: 20,
										paddingVertical: 3,
										color: '#8084a7'
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
	toFollowThread: (idThread) => dispatch(toFollowThread(idThread))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadDetails);

