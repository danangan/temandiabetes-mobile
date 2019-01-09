import React from 'react';
import { result } from 'lodash';
import { View, FlatList } from 'react-native';

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

  renderItem(threadId, navigator) {
    return ({ item, index }) => (
      <CommentThread
        key={index}
        refreshThreadDetail={this.props.refreshPage}
        contentComment={item}
        threadId={threadId}
        idComment={item._id}
        navigator={navigator}
      />
    )
  }

  onEndReached() {
    this.props.nextPageCommentList();
  }

  onRefresh() {
    this.setState({
      isRefreshing: true
    }, () => {
      this.props.refreshPage(() => {
        this.setState({
          isRefreshing: false
        })
      })
    })
  }

  render () {
    const { isRefreshing } = this.state;
    const { threadItem, navigator, commentList, threadId } = this.props;
    return (
      <View>
        <FlatList
          ListHeaderComponent={
            <ThreadDesc desc={result(threadItem, 'description', '')} />
          }
          data={commentList}
          renderItem={this.renderItem(threadId, navigator)}
          refreshing={isRefreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
        />
      </View>
    );
  }
};

export { ContentDetail };
