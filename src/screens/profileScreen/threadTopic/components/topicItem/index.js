import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import { capitalize } from '../../../../../utils/helpers';

export default class TopicItem extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { index, data, onChange } = this.props;
    return (
      <View style={styles.item}>
        <CheckBox
          style={styles.checkbox}
          onClick={() => {
            onChange(index);
          }}
          isChecked={data.isChecked}
          checkBoxColor="#EF434F"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{capitalize(data.label)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row'
  },
  checkbox: {
    paddingTop: 17,
    paddingRight: 10
  },
  textContainer: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: '#ddd'
  },
  text: {
    flex: 1
  }
});
