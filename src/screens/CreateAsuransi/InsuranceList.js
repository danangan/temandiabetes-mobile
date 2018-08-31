import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../components';
import Style from '../../style/defaultStyle';
import color from '../../style/color';

const InsuranceList = () => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.content}>
        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <View style={{ flex: 0.35, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Asuransi</Text>
              <Text>:</Text>
            </View>
            <Text style={styles.text}>FWD</Text>
          </View>
        </View>
        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <View style={{ flex: 0.39, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Type Asuransi</Text>
              <Text>:</Text>
            </View>
            <Text style={styles.text}>Corporate</Text>
          </View>
        </View>
        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>No Asuransi</Text>
              <Text>:</Text>
            </View>
            <Text style={styles.text}>123456789</Text>
          </View>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: Style.PADDING - 3,
    marginRight: Style.PADDING - 3,
    backgroundColor: color.solitude
  },
  content: {
    padding: Style.PADDING,
    marginLeft: 0,
    marginRight: 0
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  label: {},
  text: {
    left: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Style.PADDING + 10,
    paddingRight: Style.PADDING + 10,
    paddingTop: Style.PADDING - 10,
    paddingBottom: Style.PADDING - 10,
    backgroundColor: color.solid
  }
});

export default InsuranceList;
