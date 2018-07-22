import React from 'react';
import { Platform, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigationBar, Button, Spinner } from '../../components';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import { sliceString } from '../../utils/helpers';
import { dateFormateName, formatTimeFromDate, capitalize } from '../../utils/helpers';

class Notification extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
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

    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.redirectOnPress = this.redirectOnPress.bind(this);
    this.markAllAsRead = this.markAllAsRead.bind(this);
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  renderFooter() {
    const { page, pages } = this.state.pagination;

    const Loader = (
      <View style={styles.loadMoreContent}>
        <ActivityIndicator color="#EF434F" size={25} />
      </View>
    );

    return (
      <View style={styles.loadMoreContainer}>
        {this.state.isLoadMorePage && page < pages ? Loader : <View />}
      </View>
    );
  }

  async markAllAsRead() {
    const option = {
      method: 'put',
      url: `/api/notification/${this.props.currentUserId}/update-to-read`
    };

    try {
      await API_CALL(option);
      this.setState({
        notifications: this.state.notifications.map(item => {
          item.has_read = true;
          return item;
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  fetchNotifications({ refresh = false } = {}) {
    const { page, limit } = this.state.pagination;
    const option = {
      method: 'get',
      url: `/api/notification/${this.props.currentUserId}/list?page=${page}&limit=${limit}`
    };

    this.setState(
      {
        isLoading: true
      },
      async () => {
        try {
          const res = await API_CALL(option);
          const {
            data: {
              data: {
                notifications: { docs, ...pagination }
              }
            }
          } = await API_CALL(option);

          const data = refresh ? [] : this.state.notifications;

          this.setState({
            notifications: [...data, ...docs],
            pagination
          });
        } catch (error) {
          console.log(error);
        }

        this.setState({
          isLoading: false
        });
      }
    );
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={this.redirectOnPress(item, index)} style={{ padding: 1 }}>
        <View style={[styles.notificationWrapper, item.has_read ? {} : styles.unread]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                color: '#354052',
                fontWeight: 'bold'
              }}
            >
              {dateFormateName(item.createdAt)}
            </Text>
            <Text
              style={{
                color: '#AFAFAF'
              }}
            >
              {formatTimeFromDate(item.createdAt, '.')}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5
            }}
          >
            {this.renderActivityContent(item.activity)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  redirectOnPress({ activity, has_read, _id }, index) {
    let screen = '';
    let passProps = {};
    switch (activity.activityType) {
      case 'comment':
        screen = 'TemanDiabetes.ThreadDetails';
        passProps = { item: activity.comment.thread };
        break;
      case 'reply_comment':
        screen = 'TemanDiabetes.CommentDetails';
        passProps = { commentId: activity.comment._id };
        break;
      case 'followed':
        screen = 'TemanDiabetes.ProfileDetails';
        passProps = { id: activity.followedUser ? activity.followedUser._id : activity.user._id };
        break;
      case 'receiver_innercircle':
        screen = 'TemanDiabetes.InnerCircleList';
        passProps = { tab: 1 };
        break;
      case 'sender_innercircle':
        screen = 'TemanDiabetes.InnerCircleList';
        break;
      default:
        break;
    }
    return () => {
      // hit the api to set the status to has_read
      // let it be asynchronous operation
      if (!has_read || true) {
        const option = {
          method: 'put',
          url: `/api/notification/${this.props.currentUserId}/update-to-read/specific/${_id}`
        };

        API_CALL(option).then(res => {
          console.log(res);
        });
      }

      // set the clicked index to has_read status
      const mutatedItem = Object.assign({}, this.state.notifications[index]);
      mutatedItem.has_read = true;
      this.setState(
        {
          notifications: [
            ...this.state.notifications.slice(0, index),
            mutatedItem,
            ...this.state.notifications.slice(index + 1)
          ]
        },
        () => {
          if (screen !== '') {
            this.props.navigator.push({
              screen,
              passProps,
              navigatorStyle: {
                navBarHidden: true
              }
            });
          }
        }
      );
    };
  }

  renderActivityContent(activity) {
    switch (activity.activityType) {
      case 'comment':
        return (
          <Text>
            <Text style={activity.user ? styles.boldText : {}}>
              {activity.user ? activity.user.nama : 'Seseorang'}
            </Text>
            <Text> memberikan komentar </Text>
            <Text style={styles.boldText}>"{sliceString(activity.comment.text, 30)}"</Text>
            <Text> di thread Anda </Text>
            <Text style={styles.boldText}>{sliceString(activity.comment.thread.topic, 50)}</Text>
          </Text>
        );
      case 'reply_comment':
        return (
          <Text>
            <Text style={activity.user ? styles.boldText : {}}>
              {activity.user ? activity.user.nama : 'Seseorang'}
            </Text>
            <Text> membalas komentar </Text>
            <Text style={styles.boldText}>"{sliceString(activity.comment.text, 30)}"</Text>
            <Text> di thread Anda </Text>
            <Text style={styles.boldText}>{sliceString(activity.comment.thread.topic, 50)}</Text>
          </Text>
        );
        break;
      case 'followed':
        return (
          <Text>
            <Text style={activity.followedUser ? styles.boldText : {}}>
              {activity.followedUser ? activity.followedUser.nama : 'Seseorang'}
            </Text>
            <Text> mengikuti thread Anda </Text>
            <Text style={styles.boldText}>{sliceString(activity.thread.topic, 50)}</Text>
          </Text>
        );
        break;
      case 'drug_reminder':
        return (
          <Text>
            <Text>Jadwal Anda mengkonsumsi obat </Text>
            <Text style={styles.boldText}>{activity.drugReminder.drugName || ''}</Text>
            <Text> pada pukul </Text>
            <Text style={styles.boldText}>
              {new moment(new Date(activity.drugReminder.datetimeConsume)).format('HH:mm')}.
            </Text>
          </Text>
        );
        break;
      case 'receiver_innercircle':
        return (
          <Text>
            <Text style={styles.boldText}>{activity.innerCircle.name || 'Seseorang'}</Text>
            <Text> mengirimkan permintaan inner circle untuk Anda.</Text>
          </Text>
        );
        break;
      case 'sender_innercircle':
        return (
          <Text>
            <Text style={styles.boldText}>{activity.user.nama || 'Seseorang'}</Text>
            <Text> menerima permintaan inner circle Anda.</Text>
          </Text>
        );
        break;
      default:
        return activity.activityType;
        break;
    }
  }

  renderEmpty() {
    return (
      <View
        style={{
          ...styles.notificationWrapper,
          elevation: 0,
          backgroundColor: '#eee'
        }}
      >
        <Text style={styles.emptyText}>Notifikasi Kosong</Text>
      </View>
    );
  }

  onEndReached() {
    const { page, pages } = this.state.pagination;
    if (page < pages) {
      this.setState(
        {
          pagination: {
            ...this.state.pagination,
            page: this.state.pagination.page + 1
          }
        },
        this.fetchNotifications
      );
    }
  }

  onRefresh() {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.fetchNotifications({ refresh: true });
      }
    );
  }

  render() {
    const { notifications, isLoading, isRefreshing } = this.state;
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
        <NavigationBar onPress={() => this.props.navigator.pop()} title="NOTIFIKASI" />
        {this.state.notifications.length > 0 && (
          <TouchableOpacity onPress={this.markAllAsRead} style={{ padding: 5 }}>
            <Text style={styles.markAllAsRead}>Tandai semua sebagai telah dibaca</Text>
          </TouchableOpacity>
        )}
        {content}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    paddingTop: 20
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
    backgroundColor: '#fff'
  },
  unread: {
    backgroundColor: '#eee'
  },
  boldText: {
    fontWeight: 'bold'
  },
  loadMoreContainer: {
    // marginBottom: 70,
    marginTop: 10,
    justifyContent: 'center'
  },
  loadMoreContent: {
    height: 25
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#aaa',
    textAlign: 'center'
  },
  markAllAsRead: {
    textAlign: 'center',
    color: '#EF434F',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    width: '80%',
    elevation: 2
  }
};

const mapStateToProps = state => ({
  currentUserId: state.authReducer.currentUser._id
});

export default connect(mapStateToProps)(Notification);
