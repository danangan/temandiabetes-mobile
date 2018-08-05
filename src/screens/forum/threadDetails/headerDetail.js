import React from 'react';
import { View, Text } from 'react-native';

import { CardSection, Avatar } from '../../../components';
import { formatDateTime, capitalize } from '../../../utils/helpers';
import Style from '../../../style/defaultStyle';

class HeaderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCategory(item = '') {
    let category = '';
    if (Array.isArray(item)) {
      if (item.length > 0) {
        category = item[0] !== null ? item[0].category : category;
      }
    } else {
      category = item;
    }
    if (category !== '') {
      return (
        <View style={styles.wrapperButton}>
          <Text style={styles.titleButton}>{capitalize(category)}</Text>
        </View>
      );
    }
  }

  render() {
    const { authorItem, categoryItem, date, threadType } = this.props;
    return (
      <CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
        <View style={styles.container}>
          <Avatar
            avatarSize="Small"
            userName={authorItem.nama === null ? 'Loading' : authorItem.nama}
            imageSource={authorItem.foto_profile}
          />
          <View style={{ flex: 1, margin: 5 }}>
            <Text style={{ fontSize: 12 }}>
              {authorItem.nama === null ? 'Loading' : authorItem.nama}
            </Text>
            <Text style={{ fontSize: 10 }}>Posted on {formatDateTime(date, { isUTC: true })}</Text>
          </View>
          {this.renderCategory(threadType)}
          {this.renderCategory(categoryItem)}
        </View>
      </CardSection>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 15,
    paddingHorizontal: 15,
    borderRadius: 15
  },
  wrapperButton: {
    marginVertical: 5,
    marginHorizontal: 1,
    alignItems: 'center',
    backgroundColor: '#252c68',
    borderRadius: 10
  },
  titleButton: {
    // fontSize: 12,
    // color: '#FFFFFF',
    // paddingHorizontal: 10

    fontSize: Style.FONT_SIZE_SMALLER,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: '#FFFFFF',
    textAlign: 'center'
  }
};

export default HeaderDetail;
