import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import moment from 'moment';

import Dot from './Dot';

import Style from '../../../style/defaultStyle';

class ReminderCard extends React.Component {

  renderReminderDetail(dateTime, rules) {
    const rulesDrugs = rules === 'sesudahMakan' ? 'Sesudah Makan' : 'Sebelum Makan';
    return `${moment(dateTime).format('HH:mm')} - ${rulesDrugs}`;
  }

  shouldComponentUpdate(nextProps) {
    const { index } = this.props;
    if (nextProps.index === index) return true;

    return false;
  }

  render() {
    const { _id, is_active } = this.props.item;
    const { index, statusReminder } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <Dot />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.titleDrug}>{this.props.item.drugName}</Text>
          <View style={{ flex: 0, paddingVertical: 10 }}>
            {
              this.props.item.reminders.map((a, index) => (
                <Text key={index} style={styles.reminderDesc}>
                { this.renderReminderDetail(a.datetimeConsume, a.ruleConsume)}
                </Text>
              ))
            }
          </View>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.wrappButtonOption}>
            <TouchableOpacity
              style={styles.buttonOption}
              activeOpacity={0.8}
              onPress={() => this.props.getReminderDetails(this.props.item)}
            >
              <Text style={styles.btnRight}>UBAH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOption}
              activeOpacity={0.8}
              onPress={() => this.props.deleteReminder({ reminderId: _id })}
            >
              <Text style={styles.btnRight}>HAPUS</Text>
            </TouchableOpacity>
          </View>
          <Switch
            style={Platform.select({ ios: { marginTop: 5 }})}
            onValueChange={() => this.props.toUpdateStatusReminder({ index, _id, is_active })}
            value={statusReminder}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderBottomColor: '#ff1200',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  titleDrug: {
    color: '#696977',
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALL
  },
  leftSide: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5
  },
  reminderDesc: {
    fontFamily: 'Montserrat-Light',
    color: '#9ea4af',
    fontSize: Style.FONT_SIZE_SMALLER
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnRight: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 9,
    backgroundColor: '#ef434f'
  },
  wrappButtonOption: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonOption: {
    marginHorizontal: 5,
    maxWidth: 50,
    minWidth: 40
  }
};

const mapStateToProps = state => ({
  reminder: state.reminderReducer.updateReminder
});

export default connect(mapStateToProps)(ReminderCard);
