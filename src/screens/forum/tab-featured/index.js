import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Share from 'react-native-share';

import { Card, CardSection, SearchButton, Spinner } from '../../../components';
import Style from '../../../style/defaultStyle';
import Footer from './Footer';
import color from '../../../style/color';

import { getThreadStatic, makeBookmarkFeaturedThreads } from '../../../actions/threadActions';
import { authToken } from '../../../utils/constants';
import { sliceString } from '../../../utils/helpers';
import landingPageURL from '../../../config/landingPageURL';

import Blood from '../../../assets/icons/explorer_icon.png';

class TabFeatured extends Component {
	static navigatorStyle = {
		topBarCollapseOnScroll: true,
		navBarHideOnScroll: true
	};

	constructor(props) {
		super(props);
		this.state = {
      refreshing: false,
      isLoadMorePage: false,
      isLoading: false
    };

    this.renderHeader = this.renderHeader.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderEmptySection = this.renderEmptySection.bind(this)
		this.onPostBookmark = this.onPostBookmark.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.onShareThread = this.onShareThread.bind(this)
	}

	componentDidMount() {
    if (this.props.dataThreads.initialLoading) {
      this.props.getThreadStatic();
    }
	}

	componentWillReceiveProps({saveBookmark}) {
		if ((saveBookmark.status_code === 201 || saveBookmark.status_code === 200) && this.state.isLoading) {
			this.setState(
				{
					isLoading: false
				},
				() => {
					Alert.alert('Success', saveBookmark.message);
				}
			);
		}
	}

	onPostBookmark = async (thread, threadIndex) => {
		this.setState(
			{
				isLoading: true
			},
			() => {
				this.props.makeBookmark(thread, threadIndex);
			}
		);
  };

	onPressDetail = item => {
		this.props.navigator.push({
			screen: 'TemanDiabets.FeaturedDetail',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: {
				item
			}
		});
  };

  onEndReached() {
    this.setState({
      isLoadMorePage: true
    }, () => {
      const { page, pages } = this.props.dataThreads.item

      if (page < pages) {
        this.props.getThreadStatic(page + 1);
      }
    })
  }

	handleRefresh = () => {
		this.setState(
			{
				refreshing: true
			},
			() => {
		    this.props.getThreadStatic(1, true);
				this.setState({ refreshing: false });
			}
		);
  };

  onShareThread(thread) {
    let options = {
      title: thread.topic,
      message: thread.topic,
      url: `${landingPageURL}/thread-static/${thread._id}`,
      subject: "Article from Teman Diabetes" //  for email
    };
    Share.open(options).catch((err) => { err && console.log(err); })
  }

	renderItem = (threads) => {
    const { item, index } = threads
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.onPressDetail(item)}>
        <Card containerStyle={styles.cardStyle}>
          <CardSection>
            <Image
              resizeMode={'cover'}
              style={styles.imageStyle}
              source={{
                uri: item.image || 'https://firebasestorage.googleapis.com/v0/b/temandiabetes.appspot.com/o/assets%2FplaceholderTD-Android.png?alt=media&token=d26ffbb4-08d5-4890-b6f5-fc8922300a0e'
              }}
            />
            <View style={styles.contentStyle}>
              <Text style={styles.titleStyle}>{sliceString(item.topic, 25)}</Text>
              <Footer
                threadItem={item}
                threadIndex={index}
                saveBookmark={this.onPostBookmark}
                author={item.author}
                shareThread={this.onShareThread}
              />
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    )
  }

  renderFooter() {
    const { page, pages } = this.props.dataThreads.item

    const Loader = (
      <View style={styles.loadMoreContent}>
        <ActivityIndicator color='#EF434F' size="large" />
      </View>
    )

    return (
      <View style={styles.loadMoreContainer}>
       {this.state.isLoadMorePage && page < pages ?  Loader : <View/>}
      </View>
    )
  }

  renderHeader() {
    return (
      <SearchButton
        style={{
          marginBottom: 10
        }}
        onPress={() => {
            this.props.navigator.push({
              screen: 'TemanDiabets.ModalSearch',
              navigatorStyle: {
                tabBarHidden: true
              },
              passProps: {
                threadType: 'latest'
              }
            })
          }
        }
      />
    )
  }

  renderEmptySection() {
    return (
      <Text style={{
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10,
        color: '#afafaf'
      }}>
        Beranda Anda Kosong
      </Text>
    )
  }

	render() {
    const { initialLoading, item } = this.props.dataThreads;
    const spinner = this.state.isLoading ? (
			<Spinner color="#EF434F" text="Menyimpan..." size="large" />
		) : (
			<View />
		);
		return (
      <View style={styles.containerStyle}>
        {
          !initialLoading &&
          <FlatList
            ListEmptyComponent={this.renderEmptySection}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            data={item.data}
            renderItem={item => this.renderItem(item)}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.3}
          />
        }
        {
          initialLoading &&
          <View style={styles.initialLoading}>
            <ActivityIndicator color="#1a1a1a" size={25} />
          </View>
        }
				{spinner}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
    flex: 1,
    backgroundColor: color.solitude,
    paddingHorizontal: 5,
	},
	contentStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
  },
  cardStyle: {
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE,
		fontStyle: 'normal',
		justifyContent: 'center',
		textAlign: 'justify',
		paddingLeft: 10,
		width: Style.DEVICE_WIDTH / 1.5
	},
	imageStyle: {
		height: 105,
		width: 100
  },
  loadMoreContainer: {
    justifyContent: 'center'
  },
  loadMoreContent: {
    marginVertical: 10,
    height: 25
  },
  initialLoading: {
    flex: 1,
    justifyContent: 'center'
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer.listThreadStatic,
  saveBookmark: state.threadsReducer.saveBookmark
});

const mapDispatchToProps = dispatch => ({
	makeBookmark: (thread, threadIndex) => dispatch(makeBookmarkFeaturedThreads(thread, threadIndex)),
	getThreadStatic: (page, isRefresh) => dispatch(getThreadStatic(page, isRefresh))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFeatured)
