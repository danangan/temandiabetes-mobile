import React from 'react';
import moment from 'moment';

import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  Keyboard,
  ScrollView,
  TimePickerAndroid
} from 'react-native';

import { dateFormateName } from '../../../utils/helpers';

class ModalCreateReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDate: '',
      datetimeConsume: '',
      isTime: '',
      keyboardActive: false,
      drugName: '',
      ruleConsume: '',
      preReminders: [
        
      ],
      prefieldData: null
    };
    this.onSetReminder = this.onSetReminder.bind(this);
  }

  componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			this.setState({ keyboardActive: true });
		});
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			this.setState({ keyboardActive: false });
		});
  }
  
  componentDidMount() {
    console.log('ADA BELUM ', this.props.preData);
    this.setState({
      prefieldData: this.props.preData
    });
  }

  componentWillReceiveProps(nexProps) {
    console.log('PROPS RECEIPE MODAL ', nexProps);
    if (nexProps.preData !== null) {
      this.setState({
        drugName: nexProps.preData.drugName,
        preReminders: nexProps.preData.reminders
      });
    }
  }

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
  }

  onSetReminder() {
    const { drugName, isTime, ruleConsume, datetimeConsume, hours } = this.state;
    const currentReminder = this.state.preReminders;
    const rule = ruleConsume === 'Sesudah Makan' ? 'sesudahMakan' : 'sebelumMakan';
    const setDateFormat = new Date(datetimeConsume + ' ' + isTime + ':00');
    const newReminder = {
      drugName,
      hours: isTime,
      ruleConsume: rule,
      datetimeConsume: setDateFormat
    };

    if (drugName !== '' && isTime !== '' && ruleConsume !== '') {
      currentReminder.push(newReminder);
      this.setState({
        preReminders: currentReminder
      });
    } else {
      alert('Silahkan lengkapi inputan Anda.');
    }
  }

  async openTimePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        // console.log('JAM --- ' + hour + ' ' + minute);
        this.setState({
          isTime: `${hour}:${minute}`
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  transformDate(dt) {
    const now = moment(dt);
    const fixDays = now.day();
    const lisDays = ['SUN', 'MON', 'THU', 'WED', 'THUR', 'FRI', 'SAT'];
    const completeDate = lisDays[fixDays] + ' ' + now.date() + '/' + now.month() + '/' + now.year();

    return completeDate;
  }

  onSubmit() {
    const { drugName, preReminders } = this.state;
    const reduceKey = preReminders;
    reduceKey.map((item) => {
      delete item.hours;
      delete item.drugName;
    });
    const reminder = {
      drugName,
      reminders: reduceKey
    };

    console.log('CREATE', reduceKey);

    this.props.onSubmit(reminder);
    this.props.setModalVisible();
  }

  handleDefaultDate(dt) {
    const now = moment(dt);
    return `${now.year()}-${now.month()}-${now.date()}`;
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });

      const dt = new Date(year, month, day);
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const transformDate = this.transformDate(dt);
        const datetimeConsume = this.handleDefaultDate(dt);
        this.setState({
          isDate: transformDate,
          datetimeConsume
        }, () => {
          this.openTimePicker();
        });
        
        console.log('DATE SELECTED 2', year, month);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  renderButtonOpenDate() {
    const now = moment();
    const clock = now.hours() + ':' + now.minutes();
    const fixDays = now.day();
    const lisDays = ['SUN', 'MON', 'THU', 'WED', 'THUR', 'FRI', 'SAT'];
    const completeDate = lisDays[fixDays] + ' ' + now.date()+'/'+now.month()+'/'+now.year();
     
    return (
      <TouchableOpacity 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => this.openDatePicker()}
      >
          <Text style={{ fontSize: 30, fontFamily: 'OpenSans-Light' }}>
            { this.state.isTime === '' ? clock : this.state.isTime }
          </Text>
          <Text style={{ fontSize: 10, fontFamily: 'OpenSans-Light' }}>
            { this.state.isDate === '' ? completeDate : this.state.isDate }
          </Text>
      </TouchableOpacity>
    );
  }

  render() {
    // onPress={() => this.props.setModalVisible()} 
    console.log('PROPS MODAL', this.props);
    console.log('STATE MODAL', this.state);
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.modalVisible}
      >
        <View 
          style={styles.modalWrapper}
        >
          <View style={[styles.modalContent, { height: this.state.keyboardActive ? '80%' : '60%' }]}>
              <TouchableOpacity
                style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                onPress={() => this.props.setModalVisible()}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, borderBottomColor: '#000' }}>
                <Text style={{ fontFamily: 'OpenSans-Light', color: '#000' }}>Nama Obat</Text>
                <TextInput
                  value={this.state.drugName}
                  onChangeText={(text) => this.setState({ drugName: text })}
                  placeholder="masukkan nama obat"
                  style={{ textAlign: 'left', fontSize: 12, fontFamily: 'OpenSans-Light', paddingVertical: 1 }}
                  underlineColorAndroid="#000"
                />
              </View>
              <View style={{ flex: 1, borderBottomColor: '#000', flexDirection: 'row' }}>
                <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                  {this.renderButtonOpenDate()}
                </View>
                <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity 
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      onPress={() => this.setState({ ruleConsume: 'Sebelum Makan' })}
                      style={{
                        flex: 0, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        width: 10, 
                        height: 10, 
                        backgroundColor: this.state.ruleConsume === 'Sebelum Makan' ? '#f8b6bb' : '#fff',
                        borderColor: '#f25760',
                        borderWidth: 1
                    }}
                    ><Text />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Montserrat-Light', color: '#000', fontSize: 10, paddingHorizontal: 2 }}>Sebelum Makan</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity 
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      onPress={() => this.setState({ ruleConsume: 'Sesudah Makan' })}
                      style={{
                        flex: 0, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        width: 10, 
                        height: 10, 
                        backgroundColor: this.state.ruleConsume === 'Sesudah Makan' ? '#f8b6bb' : '#fff',
                        borderColor: '#f25760',
                        borderWidth: 1
                    }}
                    >
                    <Text />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Montserrat-Light', color: '#000', fontSize: 10, paddingHorizontal: 2 }}>Sesudah Makan</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity 
                  opacity={1}
                  style={{
                    flex: 0.5,
                    width: '30%',
                    alignItems: 'center',
                    backgroundColor: '#ef434e',
                    justifyContent: 'center',
                  }}
                  onPress={this.onSetReminder}
                >
                  <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff', fontSize: 10 }}>
                    ADD
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, height: '100%', backgroundColor: '#f2f2f2', borderColor: '#ccc', borderWidth: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <ScrollView>
                  {
                    this.state.preReminders.map((item, index) => (
                      <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                          {item.hours} - {item.ruleConsume === 'sesudahMakan' ? 'Sesudah Makan' : 'Sebelum Makan'}
                        </Text>
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
              
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity 
                opacity={1}
                style={{ flex: 0.5, backgroundColor: '#ef434f', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => this.onSubmit()}
              >
                <Text style={{ color: '#fff', paddingHorizontal: 30, fontFamily: 'Montserrat-Light', fontSize: 12 }}>
                  SELESAI
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  modalWrapper: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    opacity: 0.9,
    zIndex: -2,
  },
  modalContent: { 
    flex: 0, 
    zIndex: 2,
    padding: 20,
    backgroundColor: '#fff', 
    opacity: 1, 
    width: '70%', 
  }
};

export default ModalCreateReminder;
