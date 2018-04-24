/*
  @daniel
  List Thread by user's id
*/
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Platform,
  FlatList,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import { getThreads } from '../../actions/threadActions';
import { Card, FooterThread, HeaderThread, Spinner } from '../../components';
import ContentThread from '../../components/thread/contentThread';

class TabThreadByUser extends React.Component {
  constructor(props) {
		super(props);
		this.state = {

		};
	}

  renderItem(threads) {
		const { threadType } = threads.item;
		const { nama, foto_profile } = this.props.dataAuth;
		return (
			<TouchableOpacity
				key={threads.index}
				onPress={() =>
					this.props.navi.push({
						screen: 'TemanDiabets.ThreadDetails',
						navigatorStyle: {
							navBarHidden: true,
						},
						passProps: threads
					})
				}
			>
				<Card containerStyle={styles.cardStyle}>
					<HeaderThread
						source={foto_profile}
						name={nama}
						category={threadType}
					/>
					<ContentThread
						title={threads.item.topic}
						content={threads.item.description}
					/>
					<FooterThread
						numOfComments={17}
						isOpen={this.togleModal}
						saveBookmark={this.onPostBookmark}
						threadItem={threads.item}
					/>
				</Card>
			</TouchableOpacity>
		);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 10, paddingBottom: 10 }}>
				<FlatList
					data={this.props.listThreads}
					renderItem={item => this.renderItem(item)}
				/>
      </View>
    );
  }
}

const styles = {
	containerStyle: {
		backgroundColor: '#ccc'
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
	},
	wrapButonSearch: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		marginVertical: 10,
		marginHorizontal: 5,
		elevation: 2.5,
		height: 50
	},
	wrapPostThread: {
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		marginHorizontal: 5,
		elevation: 2.5,
		height: 70,
		marginVertical: 10,
		paddingHorizontal: 10,
	}
};

const mapStateToProps = state => ({
	dataAuth: state.authReducer.currentUser,
	dataRegister: state.registerReducer,
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
	getThreads: (token) => dispatch(getThreads(token)),
	// makeBookmark: (idThread, token) => dispatch(makeBookmark(idThread, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabThreadByUser);
