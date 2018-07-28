import React from 'react';
import { debounce } from 'lodash';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { Card, CardSection } from '../../../../components';
import Style from '../../../../style/defaultStyle';
import { sliceString } from '../../../../utils/helpers';
import Footer from './Footer';

import BookMark from '../../../../assets/icons/bookmark.png';
import BookMarked from '../../../../assets/icons/bookmark_dark.png';
import Share from '../../../../assets/icons/share.png';

export default (staticThreadItem = ({
  threads,
  toStaticThreadDetail,
  onPostBookmark,
  onShareThread
}) => {
  const { item, index } = threads;
  let { author } = item;

  if (!author) {
    author = {
      nama: '',
      foto_profile: '',
      tipe_user: ''
    };
  }

  return (
    <TouchableOpacity
      key={index}
      onPress={debounce(
        () => {
          toStaticThreadDetail(item);
        },
        500,
        { trailing: false, leading: true }
      )}
    >
      <Card containerStyle={styles.cardStyle}>
        <CardSection containerStyle={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              resizeMode={'cover'}
              style={styles.imageStyle}
              source={{
                uri:
                  item.image ||
                  'https://firebasestorage.googleapis.com/v0/b/temandiabetes.appspot.com/o/assets%2FplaceholderTD-Android.png?alt=media&token=d26ffbb4-08d5-4890-b6f5-fc8922300a0e'
              }}
            />
            <View style={styles.contentStyle}>
              <Text style={styles.titleStyle}>{sliceString(item.topic, 120)}</Text>
              <Footer threadItem={item} threadIndex={index} author={author} />
            </View>
          </View>
          <View style={styles.shareAndBookmark}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  onPostBookmark(item, index);
                }}
              >
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    source={item.isBookmarked ? BookMarked : BookMark}
                    style={styles.iconStyle}
                    resizeMode={'contain'}
                  />
                  <Text style={{ marginLeft: 5 }}>Tandai</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  onShareThread(item);
                }}
              >
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image source={Share} style={styles.iconStyle} resizeMode={'contain'} />
                  <Text style={{ marginLeft: 5 }}>Bagikan</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </CardSection>
      </Card>
    </TouchableOpacity>
  );
});

const styles = {
  contentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardStyle: {
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  titleStyle: {
    width: '100%',
    paddingRight: 50,
    numberOfLines: 5,
    flexWrap: 'wrap',
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
  shareAndBookmark: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 0
  },
  iconStyle: {
    width: 25
  }
};
