import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert
} from 'react-native';

import debounce from 'lodash/debounce';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getFoodSuggetion, inputTrackerFood } from '../../../../actions';
import { dateFormateName } from '../../../../utils/helpers';

const TextInputHoc = (props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: '#fff'
    }}
  >
  <View style={{ flex: 1, width: '70%' }}>
      <Text style={{ color: '#b6b6b6' }}>{props.title}</Text>
      <TextInput
        onFocus={this.onFocus}
        onChangeText={props.onChangesText(props.type)}
        value={props.value}
        placeholder={props.placeholder}
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'OpenSans-Italic',
        }}
        underlineColorAndroid="#ef434e"
      />
    </View>
  </View>
);

class PreviewSearchMakanan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        sarapan: null,
        makanSiang: null,
        makanMalam: null,
        snack: null,
        dateInput: new moment()
      },
      textOnChange: '',
      sarapan: '',
      makanSiang: '',
      makanMalam: '',
      snack: '',
      typingText: '',
      isDate: '',
      inputDate: new moment(),
      isTime: new moment(),
      isProcess: false,
      date: null,
      time: '',
      hasSetTime: false
    };
    this.onChangesText = this.onChangesText.bind(this);
    this.getRecomendation = debounce(this.getRecomendation, 500);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState != this.state;
  // }

  getDateDefault() {
    const dt = new Date();
    const defaultDate = {
      day: dt.getDate(),
      month: dt.getMonth() + 1,
      year: dt.getFullYear()
    };
    return defaultDate;
  }

  componentDidMount() {
    this.setState({
      date: this.getDateDefault()
    });
    this.Clock = setInterval(() => this.GetTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  componentDidUpdate() {
    const { inputTracker } = this.props.dataInputTracker;
    if (this.state.isProcess && inputTracker.status_code === 201) {
      this.setState({
        isProcess: false
      }, () => {
        this.props.navigator.pop();
      });
    }
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(this.state.inputDate.format('MM/DD/YYYY')),
        maxDate: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        console.log('DAY NYAA', day);
        const selectedDate = new moment().year(year).month(month).date(day);
        console.log('INi datenyaa ',  selectedDate);
        this.setState({
          date: {
            day,
            month,
            year
          },
          isDate: `${day} ${monthNames[month]} ${year}`,
          inputDate: selectedDate 
        }, () => {
          this.openTimePicker();
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  async openTimePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false,
      });
      const menit = minute === 0 ? '00' :
                    minute.toString().length === 1 ? `0${minute}` : '00';
      // console.log('MENITE BRE ', minute);
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({
          time: {
            hour,
            minute: menit
          },
          isTime: new moment().hour(hour).minute(minute),
          hasSetTime: true
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  GetTime() {
    // Creating variables to hold time.
    let date = '';
    let TimeType = '';
    let hour = '';
    let minutes = '';
    // let seconds = '';
    let fullTime = '';

    // Creating Date() function object.
    date = new Date();

    // Getting current hour from Date object.
    hour = date.getHours();

    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 11) {
      TimeType = 'AM';
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = 'PM';
    }
    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour === 0) {
      hour = 12;
    }

    // Getting the current minutes from date object.
    minutes = date.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    //Getting current seconds from date object.
    seconds = date.getSeconds();
    // If seconds value is less than 10 then add 0 before seconds.
    // if (seconds < 10) {
    //   seconds = '0' + seconds.toString();
    // }
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString();
    // + ':' + seconds.toString()
    // + ' ' + TimeType.toString()
    // Setting up fullTime variable in State.
    if (!this.state.hasSetTime) {
      this.setState({
        time: fullTime
      });
    }
  }

  renderButtonOpenDate() {
    const { isTime, inputDate } = this.state;
    // const displayDate = `${dateNow} at ${displayTime === '' ? '00:00' : displayTime}`;
    const displayDate = `${inputDate.format('ddd DD/MM/YYYY')} at ${isTime.format('HH:mm')}`;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10
        }}
        onPress={() => this.openDatePicker()}
      >
          <Image
            resizeModa={'contain'}
            style={{ width: 20, height: 20 }}
            source={require('../../../../assets/icons/calendar.png')}
          />
          <Text style={{ fontSize: 20, fontFamily: 'OpenSans-Light', paddingLeft: 15, }}>
          {/* {this.state.isDate === '' || this.state.isTime === '' ? dateNow : displayDate} */}
          { displayDate }
          </Text>
      </TouchableOpacity>
    );
  }

  onChangesText(type) {
    return (text) => {
      this.setState({
        [type]: text
      }, () => {
        this.setState({
          selected: {
            ...this.state.selected, [type]: null
          }
        });
      });

      // It's debounced!
      this.getRecomendation(type);
    };
  }

  getRecomendation(type) {
    this.props.getFoodSuggetion(this.state[type]);
  }

  validationInput(params) {
    const checking = params.split('');
    if (checking[0] === ',' || checking[0] === '.') {
      return false;
    } else {
      return true;
    }
  }

  submitInputFood() {
    const { sarapan, makanSiang, makanMalam, snack } = this.state.selected;
    const { date, time, inputDate } = this.state;
    
    // const inputDate = new Date(dateInput + ' ' + isTime + ':00');
    // else if (date === null || sarapan === null || makanSiang === null || makanMalam === null || snack === null || time === '') {
    //   Alert.alert(
    //     'Perhatian!',
    //     'Silahkan lengkapi semua inputan'
    //   );
    // } 
    if (this.state.sarapan !== '' || this.state.makanSiang !== '' || this.state.makanMalam !== '' || this.state.snack !== '') {
      Alert.alert(
        'Perhatian!',
        'Makanan yang diisi tidak ada didalam daftar'
      );
    } else {
      // const checkingSarapan = this.validationInput(sarapan);
      // const checkingMakanSiang = this.validationInput(makanSiang);
      // const checkingMakanMalam = this.validationInput(makanMalam);
      // const checkingSnack = this.validationInput(snack);
      // const inputDate = new Date(date.year, date.month, date.day, time.hour, time.minute, 0);
      // inputDate.toUTCString();
      const value = {
        waktuInput: inputDate,
        sarapan,
        makanSiang,
        makanMalam,
        snack
      };
      this.setState({
        isProcess: true
      }, () => {
        this.props.inputTrackerFood(value);
      });
      // if (!checkingSarapan) {
      //   alert('Inputan Sarapan Anda salah');
      // } else if (!checkingMakanSiang) {
      //   alert('Inputan Makan Siang Anda salah');
      // } else if (!checkingMakanMalam) {
      //   alert('Inputan Makan Malam Anda salah');
      // } else if (!checkingSnack) {
      //   alert('Inputan Snack Anda salah');
      // } else {

      // }
    }
  }

  renderFoodSuggetion(paramsState) {
    const { suggetion } = this.props.dataInputTracker;
    if (suggetion.food.length === 0 && suggetion.status_code === 0) {
      return (
        <View style={styles.cardResult}>
          <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
        </View>
      );
    } else if (suggetion.food.length === 0 && suggetion.status_code === 204) {
      return (
        <View style={styles.cardResult}>
          <Text>Rekomendasi tidak ditemukan.</Text>
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.cardResult}>
          {
           suggetion.food.map((item, index) => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  width: '100%',
                  backgroundColor: index % 2 === 1 ? '#EEEEEE' : '#FAFAFA',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  this.setState({
                    selected: {
                      ...this.state.selected,
                      [paramsState]: item
                    },
                    [paramsState]: ''
                  });
                }}
                key={index}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    );
  }

  render() {
    console.log('THIS STATE ', this.state);
    if (this.state.isProcess) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 15 }}
        resetScrollToCoords={{
          x: 120,
          y: 120
        }}
        // contentContainerStyle={{ flex: 1, backgroundColor: '#000' }}
        scrollEnabled
      >
        { this.renderButtonOpenDate() }
        <TextInputHoc
          title="Sarapan"
          type="sarapan"
          onFocus={() => this.setState({ typingText: 'MAKAN_SIANG' })}
          placeholder="Input Sarapan"
          value={
            this.state.selected.sarapan === null ?
            this.state.sarapan :
            this.state.selected.sarapan.title
          }
          onChangesText={this.onChangesText}
        />
          {
            this.state.sarapan === '' ? null :
            this.renderFoodSuggetion('sarapan')
          }

          <TextInputHoc
            type="makanSiang"
            title="Makan Siang"
            placeholder="Input Makan Siang"
            value={
              this.state.selected.makanSiang === null ?
              this.state.makanSiang :
              this.state.selected.makanSiang.title
            }
            onChangesText={this.onChangesText}
          />
          {
            this.state.makanSiang === '' ? null :
            this.renderFoodSuggetion('makanSiang')
          }

          <TextInputHoc
            type="makanMalam"
            title="Makan Malam"
            placeholder="Input Makan Malam"
            value={
              this.state.selected.makanMalam === null ?
              this.state.makanMalam :
              this.state.selected.makanMalam.title
            }
            onChangesText={this.onChangesText}
          />
          {
            this.state.makanMalam === '' ? null :
            this.renderFoodSuggetion('makanMalam')
          }

          <TextInputHoc
            type="snack"
            title="Snack"
            placeholder="Input Snack"
            value={
              this.state.selected.snack === null ?
              this.state.snack :
              this.state.selected.snack.title
            }
            onChangesText={this.onChangesText}
          />
          {
            this.state.snack === '' ? null :
            this.renderFoodSuggetion('snack')
          }

          <View
            style={{
              flex: 2,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: '#fff'
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0,
                width: '40%',

                paddingHorizontal: 5,
                alignItems: 'center',
                backgroundColor: '#ef434e',
                justifyContent: 'center',
              }}
              onPress={() => this.submitInputFood()}
            >
              <Text style={{ fontSize: 15, paddingVertical: 5, fontFamily: 'Montserrat-Bold', color: '#fff' }}>
                SIMPAN
              </Text>
            </TouchableOpacity>
          </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  cardResult: {
    flex: 1,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1'
  }
};

const mapStateToProps = state => ({
  dataInputTracker: state.inputTrackerReducer,
  deepLink: state.appReducer.deepLink
});

const mapDispatchToProps = dispatch => ({
  getFoodSuggetion: (keyword) => dispatch(getFoodSuggetion(keyword)),
  inputTrackerFood: (params) => dispatch(inputTrackerFood(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSearchMakanan);
