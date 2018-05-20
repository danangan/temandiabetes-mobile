import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, SearchButton } from '../../../components';
import Style from '../../../style/defaultStyle';
import Footer from './Footer';
import color from '../../../style/color';

import { getThreadStatic } from '../../../actions/threadActions';
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
      isLoadMorePage: false
    };

    this.renderHeader = this.renderHeader.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
	}

	componentDidMount() {
		this.props.getThreadStatic();
	}

	onBookmark = () => {};

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
      const { page, pages } = this.props.threadsReducer.listThreadStatic.item

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

	renderItem = ({ item }) => (
		<TouchableOpacity onPress={() => this.onPressDetail(item)}>
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
            <Footer author={item.author} />
					</View>
				</CardSection>
			</Card>
		</TouchableOpacity>
	);

  renderFooter() {
    const { page, pages } = this.props.threadsReducer.listThreadStatic.item

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
                navBarHidden: true
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
		const { data } = this.props.threadsReducer.listThreadStatic.item;
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
	threadsReducer: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
	getThreadStatic: (page, isRefresh) => dispatch(getThreadStatic(page, isRefresh))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFeatured)
