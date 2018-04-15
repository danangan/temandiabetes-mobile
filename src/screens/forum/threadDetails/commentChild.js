import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../../../components';

const state = {
  data: [1, 2, 3]
};

const CommentChild = (props) => (
  <View style={{ flexDirection: 'row', padding: 5 }}>
    <Avatar 
      avatarSize="ExtraSmall"
      imageSource="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
    />
    <Text style={{ color: '#000', fontSize: 10 }}>{props.comment.text}</Text>
  </View>
  
);

export default CommentChild;
