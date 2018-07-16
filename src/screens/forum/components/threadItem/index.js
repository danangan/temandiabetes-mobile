import React from 'react';

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

export default threadItem = ({ threads, toThreadDetails, onPostBookmark, onShareThread }) => {
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
          category={author.tipe_user.toUpperCase()}
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
      />
    </Card>
  )
}

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
}
