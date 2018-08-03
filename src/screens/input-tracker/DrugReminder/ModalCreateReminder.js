import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  Keyboard,
  ScrollView,
  TimePickerAndroid,
  ActivityIndicator,
  Alert
} from 'react-native';

import { dateFormateName } from '../../../utils/helpers';

class ModalCreateReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDateValue: new moment(),
      selectTimeValue: new moment(),
      keyboardActive: false,
      drugName: '',
      ruleConsume: '',
      preReminders: [

      ],
      prefieldData: null,
      status_action: 'CREATE_NEW',
      idReminder: '',
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
    this.setState({
      prefieldData: this.props.preData
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataReminder.detailsReminder.status_code === 200) {
      const { reminders } = nextProps.preData;
      const ruleConsume = reminders[0].ruleConsume === "sesudahMakan" ? 'Sesudah Makan' : 'Sebelum Makan';
      const now = moment(nextProps.preData.reminders[0].datetimeConsume);
      const clock = now.hours() + ':' + now.minutes();
      this.setState({
        idReminder: nextProps.preData._id,
        drugName: nextProps.preData.drugName,
        preReminders: nextProps.preData.reminders.map(item => {
          item.datetimeConsume = new moment(new Date(item.datetimeConsume))
          item.hours = item.datetimeConsume.format('HH:mm')
          return item
        }),
        status_action: 'UPDATE',
        isTime: clock,
        ruleConsume
      });
    }
  }

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
  }

  onSetReminder() {
    const { drugName, selectTimeValue, selectDateValue, ruleConsume, preReminders } = this.state;
    if (drugName !== '' && ruleConsume !== '') {
      const rule = ruleConsume === 'Sesudah Makan' ? 'sesudahMakan' : 'sebelumMakan';
      const setDateFormat = new moment(selectDateValue).hour(selectTimeValue.hour()).minute(selectTimeValue.minute())
      const newReminder = {
        hours: selectTimeValue.format('HH:mm'),
        ruleConsume: rule,
        datetimeConsume: setDateFormat
      };
      this.setState({
        preReminders: [
          ...preReminders,
          newReminder
        ]
      });
    } else {
      alert('Silakan lengkapi daftar Anda.');
    }
  }

  async openTimePicker() {
    const dateNow = moment();

    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.selectTimeValue.hour(),
        minute: this.state.selectTimeValue.minute(),
        is24Hour: true, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const { selectTimeValue } = this.state;
        const selectDate = new moment(selectTimeValue);
        selectDate.hour(hour).minute(minute);
        console.log('dateNow', dateNow);
        console.log('selectDate -->', selectDate);
        const isBeforeNow = selectDate.isAfter(dateNow);
        console.log('isBeforeNow ', isBeforeNow);
        if (isBeforeNow) {
          this.setState({
            selectTimeValue: new moment().hour(hour).minute(minute)
          });
        } else {
          Alert.alert(
            'Perhatian!',
            'Waktu tidak boleh sebelum dari jam saat ini',
            [
              { text: 'Pilih ulang', onPress: () => this.openTimePicker() },
            ],
            { cancelable: false }
          );
        }
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  onSubmit() {
    const { drugName, preReminders, status_action, idReminder, ruleConsume, datetimeConsume } = this.state;
    const reduceKey = preReminders;
    if (drugName === '' || preReminders.length === 0 || ruleConsume === '' || datetimeConsume === '') {
      alert('Silakan lengkapi daftar Anda.');
    } else {
      if (status_action === 'CREATE_NEW') {
        reduceKey.map((item) => {
          delete item.hours;
        });
        const reminder = {
          drugName,
          reminders: reduceKey
        };
        this.props.onSubmit(reminder);
      } else {
        const reminder = {
          drugReminderId: idReminder,
          drugName,
          reminders: preReminders,
        };
        this.props.toUpdateReminder(reminder);
      }
      this.props.setModalVisible();
    }
  }

  async openDatePicker() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(this.state.selectDateValue.format('MM/DD/YYYY')),
        minDate: currentDate
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new moment().year(year).month(month).date(day);
        // Selected year, month (0-11), day
        this.setState({
          selectDateValue: selectedDate,
        }, () => {
          this.openTimePicker();
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  renderButtonOpenDate() {
    const { selectDateValue, selectTimeValue } = this.state;
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
            { selectTimeValue.format('HH:mm') }
          </Text>
          <Text style={{ fontSize: 10, fontFamily: 'OpenSans-Light' }}>
            { selectDateValue.format('ddd DD/MM/YYYY') }
          </Text>
      </TouchableOpacity>
    );
  }

  removePreReminders(index) {
    const currentReminders = this.state.preReminders;
    currentReminders.splice(index, 1);
    this.setState({
      preReminders: currentReminders
    });
  }

  render() {
    // onPress={() => this.props.setModalVisible()}
    const { detailsReminder } = this.props.dataReminder;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.modalVisible}
      >
        {
          // detailsReminder.status_code === 0
          false ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="rgb(239, 67, 79)" size="large" />
          </View>
          :
          <View
            style={styles.modalWrapper}
          >
            <View style={[styles.modalContent, { height: this.state.keyboardActive ? '80%' : '60%' }]}>
                <TouchableOpacity
                  style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                  onPress={() => this.props.setModalVisible()}
                >
                  <Image
                    resizeModa={'contain'}
                    style={{ width: 20, height: 20 }}
                    source={require('../../../assets/icons/close.png')}
                  />
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
                      Tambahkan
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: '100%', backgroundColor: '#f2f2f2', borderColor: '#ccc', borderWidth: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                  <ScrollView>
                    {
                      this.state.preReminders.map((item, index) => (
                        <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', paddingVertical: 5, textAlign: 'left' }}>
                            {item.hours} - {item.ruleConsume === 'sesudahMakan' ? 'Sesudah Makan' : 'Sebelum Makan'}
                          </Text>
                          <TouchableOpacity
                            style={{ flex: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}
                            onPress={() => this.removePreReminders(index)}
                          >
                            <Image
                              resizeModa={'contain'}
                              style={{ width: 15, height: 15 }}
                              source={require('../../../assets/icons/close.png')}
                            />
                          </TouchableOpacity>
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
        }
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

const mapStateToProps = state => ({
  dataReminder: state.reminderReducer
});

export default connect(mapStateToProps, null)(ModalCreateReminder);
