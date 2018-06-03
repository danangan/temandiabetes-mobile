import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../../../components';

const state = {
  data: [1, 2, 3]
};

const CommentChild = (props) => {
  // console.log('PROPS COMMENT CHILD ', props);
  return (
    <View style={props.containerStyle}>
      <Avatar
        avatarSize="ExtraSmall"
        imageSource={props.comment.user.foto_profile}
        userName={props.comment.user.nama || 'N A'}
      />
      <Text style={{ color: '#000', fontSize: 10 }}>{props.comment.text}</Text>
    </View>
  );
};

export default CommentChild;
