import React from 'react';

import {
  View,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native';

import Dot from './Dot';

class ReminderCard extends React.Component {

  renderReminderDetail(dateTime, rules) {
    const dt = new Date(dateTime);
    const jam = dt.toTimeString();
    const rulesDrugs = rules === 'sesudahMakan' ? 'Sesudah Makan' : 'Sebelum Makan';

    return jam + '- ' + rulesDrugs;
  }

  render() {
    console.log('KEY ADA ', this.props)
    const { _id, is_active } = this.props.item;
    const { index } = this.props;
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
                <Text key={index} style={{ fontFamily: 'Montserrat-Light', color: '#9ea4af', fontSize: 9 }}>
                { this.renderReminderDetail(a.datetimeConsume, a.ruleConsume)}
                </Text>
              ))
            }
          </View>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.getReminderDetails(_id)}
          >
            <Text style={styles.btnRight}>UBAH</Text>
          </TouchableOpacity>
          <Switch 
            style={{ borderColor: '#000', borderWidth: 1 }}
            onValueChange={() => this.props.toUpdateStatusReminder({ index, _id, is_active })}
            value={this.props.statusReminder} 
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
    fontSize: 15
  },
  leftSide: { 
    flex: 0.5, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingVertical: 5 
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
  }
};

export default ReminderCard;
