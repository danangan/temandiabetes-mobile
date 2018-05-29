import React from 'react';
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import { NavigationBar, Button, Spinner } from '../../components'
import { API_CALL } from '../../utils/ajaxRequestHelper'
import { sliceString } from '../../utils/helpers'
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
        limit: 15
      }
    };

    this.renderFooter = this.renderFooter.bind(this)
    this.renderEmpty = this.renderEmpty.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPressHandler = this.onPressHandler.bind(this)
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

  onPressHandler(notificationType) {

  }

  async fetchNotifications({ refresh = false } = {}) {
    const { page, limit } = this.state.pagination
    const option = {
      method: 'get',
      url: `/api/notification/${this.props.currentUserId}/list?page=${page}&limit=${limit}`,
    };

    try {
      const res = await API_CALL(option);
      const { data: { data : { notifications: { docs, ...pagination } }} } = await API_CALL(option);

      const data = refresh ? [] : this.state.notifications

      this.setState({
        notifications: [
          ...data,
          ...docs
        ],
        pagination
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
      <TouchableOpacity onPress={() => {this.onPressHandler(item.activity.activityType)}}>
        <View style={[styles.notificationWrapper, item.has_read ? {} : styles.unread]}>
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
            marginTop: 5
          }}>
            {this.renderActivityContent(item.activity)}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderActivityContent(activity) {
    switch (activity.activityType) {
      case 'comment':
        return (
          <Text>
            <Text style={activity.comment.user ? styles.boldText: {}}>
            {activity.comment.user ? activity.comment.user.nama : 'Seseorang'}
            </Text>
            <Text> memberikan komentar </Text>
            <Text style={styles.boldText}>
              "{sliceString(activity.comment.text, 30)}"
            </Text>
            <Text> di thread Anda </Text>
            <Text style={styles.boldText}>
              {sliceString(activity.comment.thread.topic, 50)}
            </Text>
          </Text>
        )
        break;
      case 'follow':
        return (
          <Text>
            <Text style={activity.thread.user ? styles.boldText: {}}>
              {activity.thread.user ? activity.thread.user.nama : 'Seseorang'}
            </Text>
            <Text> mengikuti thread Anda </Text>
            <Text style={styles.boldText}>
              {sliceString(activity.thread.topic, 50)}
            </Text>
          </Text>
        )
        break;
      default:
        return activity.activityType
        break;
    }
  }

  renderEmpty() {
    return (
      <View style={{
        ...styles.notificationWrapper,
        elevation: 0,
        backgroundColor: '#eee',
      }}>
        <Text style={styles.emptyText}>
          Notifikasi Kosong
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
    }, () => {
      this.fetchNotifications({refresh: true})
    })
  }

  render() {
    const { notifications, isLoading, isRefreshing } = this.state
		const content = isLoading ? (
			<Spinner color="#EF434F" size="large" />
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
          onEndReachedThreshold={0.2}
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
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  listContainer: {
    paddingVertical: 20,
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
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
		backgroundColor: '#fff',
  },
  unread: {
    backgroundColor: '#eee',
  },
  boldText: {
    fontWeight: 'bold'
  },
  loadMoreContainer: {
    // marginBottom: 70,
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
