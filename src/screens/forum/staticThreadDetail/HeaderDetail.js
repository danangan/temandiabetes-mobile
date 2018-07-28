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

  renderCategory(categoryItem) {
    let category = '';
    if (categoryItem) {
      if (categoryItem.length > 0) {
        category = categoryItem[0] !== null ? categoryItem[0].category : category;
      }
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
    const { author, category, date } = this.props;
    return (
      <CardSection containerStyle={{ backgroundColor: '#f2f4fd', margin: 0 }}>
        <View style={styles.container}>
          <Avatar avatarSize="Small" imageSource={author.foto_profile} userName={author.nama} />
          <View style={{ flex: 1, margin: 5 }}>
            <Text style={{ fontSize: 12 }}>{author.nama}</Text>
            <Text style={{ fontSize: 10 }}>Posted on {formatDateTime(date, { isUTC: true })}</Text>
            <Text style={{ fontSize: 10 }}>{author.tipe_user}</Text>
          </View>
          {this.renderCategory(category)}
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
    fontSize: 12,
    color: '#8084a7',
    paddingHorizontal: 10
  }
};

export default HeaderDetail;
