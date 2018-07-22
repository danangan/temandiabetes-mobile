import React from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, FlatList } from 'react-native';

import CommentThread from './commentThread';
import ThreadDesc from './threadDesc';

class ContentDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isRefreshing: false
    }

    this.renderItem = this.renderItem.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  renderItem(threadItem, navigator) {
    return ({ item, index }) => (
      <CommentThread
        key={index}
        contentComment={item}
        idThread={threadItem._id}
        idComment={item._id}
        navigator={navigator}
      />
    )
  }

  onEndReached() {
    this.props.nextPageCommentList()
  }

  onRefresh() {
    console.log('refreshing')
    this.setState({
      isRefreshing: true
    })
  }

  render () {
    const { isRefreshing } = this.state;
    const { threadItem, navigator, threadDetails, commentList } = this.props;
    return (
      <View style={{ marginBottom: 15 }}>
        <ThreadDesc desc={threadItem.description} />
        {
          threadDetails === null ?
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
          </View>
          :
          <FlatList
            data={commentList}
            renderItem={this.renderItem(threadItem, navigator)}
            refreshing={isRefreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.2}
          />
        }
      </View>
    );
  }
};

export { ContentDetail };
