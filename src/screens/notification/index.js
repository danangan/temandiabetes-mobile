import React from 'react';
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { connect } from 'react-redux'

import { NavigationBar, Button, Spinner } from '../../components'
import { API_CALL } from '../../utils/ajaxRequestHelper'
import { dateFormateName, formatTimeFromDate, capitalize } from '../../utils/helpers'

class Notification extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true,
  };

	constructor(props) {
		super(props);
		this.state = {
      isLoading: true,
      isRefreshing: false,
      isLoadMorePage: false,
      notifications: [],
      pagination: {
        page: 1,
        pages: 0,
      }
    };

    this.renderFooter = this.renderFooter.bind(this)
    this.renderEmpty = this.renderEmpty.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
  }

  componentDidMount() {
    this.fetchNotifications()
  }

  renderFooter() {
    const { page, pages } = this.state.pagination

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

  async fetchNotifications() {
    const option = {
      method: 'get',
      url: `/api/notification/${this.props.currentUserId}/list?page=${this.state.pagination.page}`,
    };

    try {
      const res = await API_CALL(option);
      const { data: { data : { notifications }} } = await API_CALL(option);

      this.setState({
        notifications: [
          ...this.state.notifications,
          ...notifications
        ]
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      isLoading: false
    })
  }

  renderItem({item}) {
    return (
      <View style={styles.notificationWrapper}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            color: '#354052',
            fontWeight: 'bold'
          }}>
            {dateFormateName(item.createdAt)}
          </Text>
          <Text style={{
            color: '#AFAFAF'
          }}>
            {formatTimeFromDate(item.createdAt, '.')}
          </Text>
        </View>
        <Text style={{
          marginTop: 10
        }}>
          {capitalize(item.activity.activityType)}
        </Text>
      </View>
    )
  }

  renderEmpty() {
    return (
      <View style={{
        ...styles.notificationWrapper,
        elevation: 0,
        backgroundColor: '#eee',
      }}>
        <Text style={styles.emptyText}>
          Empty notification
        </Text>
      </View>
    )
  }

  onEndReached() {
    const { page, pages } = this.state.pagination
    if (page < pages) {
      this.setState({
        pagination: {
          ...this.state.pagination,
          page: this.state.pagination.page +1
        },
      }, this.fetchNotifications)
    }
  }

  onRefresh() {
    this.setState({
      isLoading: true
    }, this.fetchNotifications)
  }

  render() {
    const { notifications, isLoading, isRefreshing } = this.state
		const content = isLoading ? (
			<Spinner color="#FFDE00" size="large" />
		) : (
      <View style={styles.listContainer}>
        <FlatList
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          data={notifications}
          renderItem={this.renderItem}
          refreshing={isRefreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
        />
      </View>
		);
    return (
      <View style={styles.container}>
        <NavigationBar
          onPress={() => this.props.navigator.pop()}
          title="NOTIFIKASI"
        />
				{content}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
  notificationWrapper: {
		...Platform.select({
			android: { elevation: 3 },
			ios: {
				shadowColor: 'rgba(0,0,0, .2)',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 2.5
			}
    }),
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
		backgroundColor: '#fff',
  },
  loadMoreContainer: {
    marginBottom: 70,
    marginTop: 10,
    justifyContent: 'center',
  },
  loadMoreContent: {
    height: 25
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#aaa',
    textAlign: 'center',
  }
}

const mapStateToProps = state => ({
	currentUserId: state.authReducer.currentUser._id,
});

export default connect(mapStateToProps)(Notification)
