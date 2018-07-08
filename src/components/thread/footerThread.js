import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { CardSection } from '../card/CardSection';
import ViewPropTypes from '../../config/ViewPropTypes';
import BookMark from '../../assets/icons/bookmark.png';
import BookMarked from '../../assets/icons/bookmark_dark.png';
// import Report from '../../assets/icons/flag.png';
import Share from '../../assets/icons/share.png';
import Comment from '../../assets/icons/comment.png';

const FooterThread = ({
  containerStyle,
  numOfComments,
  threadItem,
  threadIndex,
  saveBookmark,
  leftAction,
  shareThread
}) => {
  threadItem = threadItem || {};
  const isBookmarked = threadItem.hasOwnProperty('isBookmarked') ? threadItem.isBookmarked : false;
  return (
    <CardSection>
      <View style={[styles.containerStyle, containerStyle]}>
        <TouchableOpacity onPress={() => leftAction()} style={styles.itemContainer}>
          <Image source={Comment} style={{ width: 20, height: 20 }} />
          <Text style={styles.titleItem}>{numOfComments} Balasan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saveBookmark(threadItem, threadIndex)}
          style={styles.itemContainer}
        >
          <Image source={isBookmarked ? BookMarked : BookMark} style={{ width: 20, height: 20 }} />
          <Text style={styles.titleItem}>Tandai</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={() => shareThread(threadItem)}>
          <Image source={Share} style={{ width: 20, height: 20 }} />
          <Text style={styles.titleItem}>Bagikan</Text>
        </TouchableOpacity>
      </View>
    </CardSection>
  );
};

FooterThread.propTypes = {
  containerStyle: ViewPropTypes.style,
  numOfComments: PropTypes.number,
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleItem: { fontSize: 12, fontFamily: 'Montserrat-Light' }
};

export { FooterThread };
