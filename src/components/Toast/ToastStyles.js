import { StyleSheet, Platform } from 'react-native';
import color from '../../style/color';

export const base = {
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 25
      },
      android: {
        paddingTop: 15
      }
    }),
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },
  text: {
    color: color.white,
    fontWeight: 'bold'
  }
};

export default {
  info: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: color.blue }]),
    text: base.text
  }),
  success: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: 'green' }]),
    text: base.text
  }),
  warning: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: '#ec971f' }]),
    text: base.text
  }),
  error: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: color.red }]),
    text: base.text
  })
};
