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
		this.onPostBookmark = this.onPostBookmark.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.onShareThread = this.onShareThread.bind(this)
	}

	componentDidMount() {
		this.props.getThreadStatic();
	}

	componentDidUpdate() {
		const { saveBookmark } = this.props;
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
      url: `https://temandiabetes.com/thread-static/${thread._id}`,
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
                uri: 'https://i.imgur.com/zHd5A.jpg'
              }}
            />
            <View style={styles.contentStyle}>
              <Text style={styles.titleStyle}>{item.topic}</Text>
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
        <ActivityIndicator color='#EF434F' size={25} />
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

	render() {
    const { data } = this.props.dataThreads.item;
    const spinner = this.state.isLoading ? (
			<Spinner color="#FFDE00" text="Menyimpan..." size="large" />
		) : (
			<View />
		);
		return (
      <View style={styles.containerStyle}>
        {
          data.length > 0 &&
          <FlatList
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            data={data}
            renderItem={item => this.renderItem(item)}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.3}
          />
        }
				{spinner}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
    backgroundColor: color.solitude,
    paddingHorizontal: 5,
    flex: 1
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
    marginBottom: 70,
    marginTop: 10,
    justifyContent: 'center',
  },
  loadMoreContent: {
    height: 25
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
