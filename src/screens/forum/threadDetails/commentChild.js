import React from 'react';
import { View, Text } from 'react-native';
import { result } from 'lodash';

import { Avatar, TextWithClickableURL } from '../../../components';

const CommentChild = props => (
  <View style={props.containerStyle}>
    <Avatar
      avatarSize="ExtraSmall"
      imageSource={result(props.comment.user, 'foto_profile')}
      userName={result(props.comment.user, 'nama', 'N A')}
    />
    <Text style={textStyle}>
      <TextWithClickableURL inputText={props.comment.text} />
    </Text>
  </View>
);

const textStyle = {
  flex: 1,
  flexDirection: 'column',
  paddingLeft: 10,
  color: '#000',
  fontSize: 10
};

export default CommentChild;
