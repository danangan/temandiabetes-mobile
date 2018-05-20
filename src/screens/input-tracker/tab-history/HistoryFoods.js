import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import moment from 'moment';

import { Card } from '../../../components';
import MealTime from './MealTime';
import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

const today = new Date();
const hours = moment(today).format('LT');
const LineVertical = () => (
  <View
    style={{
      borderLeftColor: color.gray,
      borderLeftWidth: 1,
      opacity: 0.12
    }}
  />
);

const HistoryFoods = ({ history }) => {
  const mealTime =
    history.foods === undefined
      ? {
        sarapan: { title: '', calories: '' },
        makanSiang: { title: '', calories: '' },
        makanMalam: { title: '', calories: '' },
        snack: { title: '', calories: '' }
        }
      : history.foods;

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Log Makanan</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.todayStyle}>Hari Ini</Text>
        <Text style={styles.hourStyle}>{hours}</Text>
      </View>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.cardContentStyle}>
          <MealTime foodStyle={styles.foodsStyle} />
          <LineVertical />
          <View style={styles.foodListStyle}>
            <Text style={styles.foodsStyle}>{mealTime.sarapan.title}</Text>
            <Text style={styles.foodsStyle}>{mealTime.makanSiang.title}</Text>
            <Text style={styles.foodsStyle}>{mealTime.makanMalam.title}</Text>
            <Text style={styles.foodsStyle}>{mealTime.snack.title}</Text>
          </View>
          <LineVertical />
          <View style={styles.calorieStyle}>
            <View style={styles.calorieListStyle}>
              <Text style={[styles.foodsStyle]}>{mealTime.sarapan.calories}</Text>
              <Text style={styles.foodsStyle}> Kkl</Text>
            </View>
            <View style={styles.calorieListStyle}>
              <Text style={styles.foodsStyle}>{mealTime.makanSiang.calories}</Text>
              <Text style={styles.foodsStyle}> Kkl</Text>
            </View>
            <View style={styles.calorieListStyle}>
              <Text style={styles.foodsStyle}>{mealTime.makanMalam.calories}</Text>
              <Text style={styles.foodsStyle}> Kkl</Text>
            </View>
            <View style={styles.calorieListStyle}>
              <Text style={styles.foodsStyle}>{mealTime.snack.calories}</Text>
              <Text style={styles.foodsStyle}> Kkl</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: 'bold',
    color: '#252c58',
    marginTop: 18.25
  },
  todayStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    color: '#252C68'
  },
  hourStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER / 1.5,
    color: '#252C68',
    left: 8.39,
    top: 2.61
  },
  cardStyle: {
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: Style.PADDING,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 11.35,
    marginBottom: 24.18,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 3.5
      }
    })
  },
  cardContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  foodsStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#556299'
  },
  foodListStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  calorieStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  calorieListStyle: {
    flexDirection: 'row',
    marginTop: 3
  }
});

const mapStateToProps = state => ({
  history: state.historyEstimationReducer
});

export default connect(mapStateToProps, null)(HistoryFoods);
