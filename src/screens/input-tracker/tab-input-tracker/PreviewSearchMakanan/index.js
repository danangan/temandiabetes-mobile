import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native';

import debounce from 'lodash/debounce';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getFoodSuggetion, inputTrackerFood } from '../../../../actions';
import { dateFormateName } from '../../../../utils/helpers';

const TextInputHoc = (props) => (
  <View
    style={{
      flex: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: '#fff'
    }}
  >
    {/* {this.renderButtonOpenDate()} */}
  <View style={{ flex: 1, width: '70%' }}>
      <Text style={{ color: '#b6b6b6' }}>{props.title}</Text>
      <TextInput
        onFocus={this.onFocus}
        onChangeText={props.onChangesText(props.type)}
        value={props.value}
        placeholder={props.placeholder}
        style={{ 
          textAlign: 'center', 
          fontSize: 19, 
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
        dateInput: ''
      },
      textOnChange: '',
      sarapan: '',
      makanSiang: '',
      makanMalam: '',
      snack: '',
      typingText: '',
      isDate: '',
      inputDate: '',
      isTime: '',
      isProcess: false
    };
    this.onChangesText = this.onChangesText.bind(this);
    this.getRecomendation = debounce(this.getRecomendation, 500);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState != this.state;      
  // }

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
        date: new Date(),
        maxDate: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.setState({
          date: {
            day,
            month: month + 1,
            year
          },
          isDate: `${day} ${monthNames[month]} ${year}`,
          dateInput: ` ${year}-${month + 1}-${day}`
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
            minute
          },
          isTime: `${hour}:${menit}`
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  renderButtonOpenDate() {
    const { isDate, isTime } = this.state;
    const dt = new Date();
    const displayDate = `${isDate} at ${isTime}`;
    const dateNow = dateFormateName(dt);
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => this.openDatePicker()}
      >
          <Text style={{ fontSize: 20, fontFamily: 'OpenSans-Light' }}>
          {this.state.isDate === '' ? dateNow : displayDate}
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

  submitInputFood() {
    const { sarapan, makanSiang, makanMalam, snack } = this.state.selected;
    const { date, time } = this.state;
    // const inputDate = new Date(dateInput + ' ' + isTime + ':00');
    const inputDate = new Date(date.year, date.month, date.day, time.hour, time.minute, 0);
    inputDate.toUTCString();
    if (sarapan === null || makanSiang === null || makanMalam === null || snack === null) {
      alert('Silahkan lengkapi semua inputan');
    } else {
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
    }
  }

  renderFoodSuggetion(paramsState) {
    const { suggetion } = this.props.dataInputTracker;
    console.log('SUGGETION =', suggetion.food);
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
    console.log('STATE ', this.state);
    if (this.state.isProcess) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'trasparent', paddingVertical: 15 }}
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
          placeholder="Nasi Uduk"
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
            placeholder="Soto Ayam"
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
            placeholder="Salad"
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
            placeholder="Snack"
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
