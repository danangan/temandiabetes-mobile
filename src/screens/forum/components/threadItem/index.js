import React from 'react';
import propTypes from 'prop-types';
import { debounce } from 'lodash';

import {
  Platform,
  TouchableOpacity,
} from 'react-native';

import {
  Card,
  FooterThread,
  HeaderThread }
from '../../../../components';

import ContentThread from './contentThread';

function capitalize(string) {
  switch (string) {
    case 'diabetesi':
      return 'Diabetesi';
      break;
    case 'non-diabetesi': 
      return 'Non-Diabetesi';
      break;
    case 'ahli': 
      return 'Ahli';
      break;
    default:
      return string;
      break;
  }
}

export default threadItem = ({ threads, toThreadDetails, onPostBookmark, onShareThread, btnShare, btnMark, btnComment }) => {
  let { author, comments } = threads.item;
  if (!author || author['tipe_user'] === undefined) {
    author = {
      nama: '',
      foto_profile: '',
      tipe_user: ''
    };
  }

  if (!comments) {
    comments = []
  }

  return (
    <Card containerStyle={styles.cardStyle}>
      <TouchableOpacity key={threads.index} onPress={debounce(() => {toThreadDetails(threads)}, 500, { trailing: false, leading: true })}>
        <HeaderThread
          source={author.foto_profile}
          name={author.nama}
          category={capitalize(author.tipe_user)}
        />
        <ContentThread property={threads.item} />
      </TouchableOpacity>
      <FooterThread
        leftAction={debounce(() => { toThreadDetails(threads)}, 500, { leading: true, trailing: false })}
        numOfComments={comments.length === 0 ? '' : comments.length}
        saveBookmark={onPostBookmark}
        threadItem={threads.item}
        threadIndex={threads.index}
        shareThread={onShareThread}
        btnShare={btnShare}
        btnMark={btnMark}
        btnComment={btnComment}
      />
    </Card>
  );
};

threadItem.propTypes = {
  threads: propTypes.object,
  toThreadDetails: propTypes.func,
  onPostBookmark: propTypes.func,
  onShareThread: propTypes.func,
  btnShare: propTypes.bool,
  btnMark: propTypes.bool,
  btnComment: propTypes.bool,
};

threadItem.defaultProps = {
  btnShare: true,
  btnMark: true,
  btnComment: true,
};

const styles = {
  cardStyle: {
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    }),
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
};


