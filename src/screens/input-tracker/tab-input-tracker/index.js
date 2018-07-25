import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  View,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  TextInput,
  Keyboard,
  ScrollView,
  Picker,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions
} from 'react-native';

import {
  inputTrackerBloodGlucose,
  inputTrackerBloodPressure,
  inputTrackerManually,
  inputTrackerHba1c,
  inputTrackerFood,
  inputTrackerActivity,
  inputTrackerWeight,
  getFoodSuggetion
} from '../../../actions';

import color from '../../../style/color';
import { Card } from '../../../components';
import MenuButton from './MenuButton';
import Style from '../../../style/defaultStyle';
import { dateFormateName } from '../../../utils/helpers';
import { activityList } from './initialValue';
import { authToken } from '../../../utils/constants';
import ButtonSave from './ButtonSave';

class InputTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isManually: false,
      modalVisible: false,
      isModal: '',
      isProcessing: false,
      isDate: '',
      isTime: new moment(),
      isGulaDarah: '',
      keyboardActive: false,
      activitySelected: '',
      descActivity: '',
      gulaDarah: 0,
      tekananDarah: 0,
      hba1c: 0,
      inputDate: new moment(),
      beratBadan: 0,
      distolic: 0,
      sistolic: 0,
      preText: null,
      isSuggest: '',
      sarapan: null,
      makanSiang: null,
      makanMalam: null,
      snack: null,
      iniJam: '',
      iniMenit: '',
      date: null,
      time: {
        hour: '00',
        minute: '00'
      },
      hasSetTime: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.toNavigate = this.toNavigate.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  getDateDefault() {
    const dt = new Date();
    const defaultDate = {
      day: dt.getDate(),
      month: dt.getMonth(),
      year: dt.getFullYear()
    };
    return defaultDate;
  }

  componentDidMount() {
    this.setState({
      date: this.getDateDefault()
    });
    this.props.getFoodSuggetion();
    this.Clock = setInterval(() => this.GetTime(), 3000);
  }

  componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			this.setState({ keyboardActive: true });
		});
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			this.setState({ keyboardActive: false });
		});
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    clearInterval(this.Clock);
  }

  componentDidUpdate() {
    const { isModal } = this.state;
    const { inputTracker } = this.props.dataInputTracker;
    if (isModal === 'IS_LOADING' && inputTracker.message === 'Success') {
      alert('Inputan Anda berhasil disimpan.');
      this.setState({
        modalVisible: false,
        isModal: '',
        gulaDarah: 0,
        hba1c: 0,
        sarapan: null,
        makanSiang: null,
        makanMalam: null,
        snack: null
      });
      // setTimeout(() => {
      //   this.setModalVisible();
      // }, 1500);
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
    const dateNow = moment();

    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: dateNow.hour(),
        minute: dateNow.minute(),
        is24Hour: true,
      });

      const menit = minute === 0 ? '00' :
                    minute.toString().length === 1 ? `0${minute}` : '00';
      if (action !== TimePickerAndroid.dismissedAction) {
        const { inputDate } = this.state;
        // selected Date
        const selectedDate = new moment(inputDate)
        selectedDate.hour(hour).minute(minute)
        const isBeforeNow = selectedDate.isBefore(dateNow)

        if (isBeforeNow) {
          this.setState({
            time: {
              hour,
              minute: menit
            },
            inputDate: selectedDate,
            isTime: new moment().hour(hour).minute(minute),
            iniJam: `${hour}`,
            iniMenit: `${menit}`,
            hasSetTime: true
          });
        } else {
          Alert.alert(
            'Perhatian!',
            'Waktu tidak boleh lebih dari jam saat ini',
            [
              {text: 'Pilih ulang', onPress: () => this.openTimePicker()},
            ],
            { cancelable: false }
          )
        }
      }
    } catch ({ code, message }) {
      console.log('Cannot open time picker', message);
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
      // console.log('Hour ... ', hour.toString());
      this.setState({
        time: {
          hour: hour.toString(),
          minute: minutes.toString()
        }
      });
    }
  }

  setModalVisible(isModal) {
    const params = isModal === undefined ? '' : isModal;
    this.setState({
      modalVisible: !this.state.modalVisible,
      isModal: params,
      activitySelected: '',
      descActivity: '',
      isManually: false
    });
  }

  validationInput(params) {
    const checkDecimal = /^[0-9]+([,.][0-9]+)?$/g.test(params);
    if (checkDecimal) {
      return true;
    } else {
      return false;
    }
  }

  handleSave(casing) {
    const {
      gulaDarah,
      distolic,
      sistolic,
      hba1c,
      activitySelected,
      descActivity,
      beratBadan,
      inputDate
    } = this.state;

    // const inputDate = new Date(date.year, date.month, date.day, time.hour, time.minute, 0);
    // inputDate.toUTCString();

    let value
    switch (casing) {
      // INPUT GULA DARAH
      case 'GULA_DARAH':
        value = {
          waktuInput: inputDate,
          gulaDarah
        };

        if (gulaDarah === 0 || gulaDarah === '') {
          alert('Silahkan input Gula darah Anda.');
        } else {
          const checking = this.validationInput(gulaDarah);
          if (!checking) {
            alert('Data yang Anda input salah.');
          } else {
            this.setState({
              isManually: false,
              modalVisible: true,
              isModal: 'IS_LOADING',
            }, () => {
              setTimeout(() => {
                this.props.inputTrackerBloodGlucose(value);
              }, 1500);
            });
          }
        }
        break;

      // INPUT TEKANAN DARAH
      case 'TEKANAN_DARAH':
        value = {
          waktuInput: inputDate,
          tekananDarah: {
            sistolic,
            distolic
          }
        };

        if (Number(sistolic) === 0 || sistolic === '') {
          alert('Silahkan input Sistolic Anda.');
        } else if (Number(distolic) === 0 || distolic === '') {
          alert('Silahkan input Diastolic Anda.');
        } else if (Number(distolic) > Number(sistolic)) {
          alert('Nilai sistolic harus lebih besar daripada diastolic')
        } else {
          const checkingSistolic = this.validationInput(sistolic);
          const checkingDistolic = this.validationInput(distolic);
          if (!checkingSistolic || !checkingDistolic) {
            alert('Data yang Anda input salah.');
          } else {
            this.setState({
              modalVisible: true,
              isModal: 'IS_LOADING',
            }, () => {
              setTimeout(() => {
                this.props.inputTrackerBloodPressure(value);
              }, 1500);
            });
          }
        }
        break;

      // INPUT HBA1C
      case 'HBA1C':
        if (hba1c === 0 || hba1c === '') {
          alert('Silahkan input HBA1C Anda.');
        } else {
          const checkinghba1c = this.validationInput(hba1c);
          if (!checkinghba1c) {
            alert('Data yang Anda input salah.');
          } else {
            this.setModalVisible('IS_LOADING');
            this.setState({
              modalVisible: true,
              isModal: 'IS_LOADING',
            }, () => {
              if (hba1c.indexOf(',') !== -1) {
                const manipulateDot = hba1c.replace(',', '.');
                const value = {
                  waktuInput: inputDate,
                  hba1c: manipulateDot
                };
                setTimeout(() => {
                  this.props.inputTrackerHba1c(value);
                }, 1500);
              } else {
                const value = {
                  waktuInput: inputDate,
                  hba1c
                };
                setTimeout(() => {
                  this.props.inputTrackerHba1c(value);
                }, 1500);
              }
            });
          }
        }
        break;
      // INPUT ACTIVITY
      case 'ACTIVITY':
        value = {
          waktuInput: inputDate,
          jenisAktivitas: 'kurang',
          kategori: activitySelected,
          deskripsi: descActivity
        };
        if (activitySelected === '') {
          alert('Silahkan pilih jenis aktivitas Anda');
        } else {
          this.setState({
            modalVisible: true,
            isModal: 'IS_LOADING',
          }, () => {
            setTimeout(() => {
              this.props.inputTrackerActivity(value);
            }, 1500);
          });
        }
        break;

      // INPUT WEIGHT
      case 'WEIGHT':
        value = {
          waktuInput: inputDate,
          beratBadan
        };
        if (beratBadan === 0 || beratBadan === '') {
          alert('Silahkan input berat badan Anda.');
        } else {
          const checkingWeight = this.validationInput(beratBadan);
          if (!checkingWeight) {
            alert('Data yang Anda input salah.');
          } else {
            this.setState({
              modalVisible: true,
              isModal: 'IS_LOADING',
            }, () => {
              setTimeout(() => {
                this.props.inputTrackerWeight(value);
              }, 1500);
            });
          }
        }
        break;
      default:
        break;
    }

    if (casing === 'GULA_DARAH') {

    } else if (casing === 'TEKANAN_DARAH') {

    } else if (casing === 'HBA1C') {

    } else if (casing === 'ACTIVITY') {

    } else if (casing === 'WEIGHT') {

    }
  }

  // renderButtonOpenDate() {
  //   const { isTime, inputDate } = this.state;
  //   // const displayDate = `${dateNow} at ${displayTime === '' ? '00:00' : displayTime}`;
  //   const displayDate = `${inputDate.format('ddd DD/MM/YYYY')} at ${isTime.format('HH:mm')}`;
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         flex: 1,
  //         flexDirection: 'row',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         marginVertical: 10
  //       }}
  //       onPress={() => this.openDatePicker()}
  //     >
  //         <Image
  //           resizeModa={'contain'}
  //           style={{ width: 20, height: 20 }}
  //           source={require('../../../../assets/icons/calendar.png')}
  //         />
  //         <Text style={{ fontSize: 20, fontFamily: 'OpenSans-Light', paddingLeft: 15, }}>
  //         {/* {this.state.isDate === '' || this.state.isTime === '' ? dateNow : displayDate} */}
  //         { displayDate }
  //         </Text>
  //     </TouchableOpacity>
  //   );
  // }

  renderButtonOpenDate() {
    const { isDate, isTime, time, hasSetTime, inputDate } = this.state;
    // const dt = isDate === '' ? new Date() : isDate;
    // const dateNow = dateFormateName(dt);
    // const displayTime = `${time.hour}:${time.minute}`;
    const displayDate = `${inputDate.format('ddd DD/MM/YYYY')} at ${isTime.format('HH:mm')}`;

    return (
      <View
        style={{
          // flex: 1,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
        <Image
          resizeModa={'contain'}
          style={{ width: 20, height: 20 }}
          source={require('../../../assets/icons/calendar.png')}
        />
        <TouchableOpacity
          style={{
            // flex: 1,
            paddingHorizontal: 10,
            // justifyContent: 'center',
            // alignItems: 'flex-start',
          }}
          onPress={() => this.openDatePicker()}
        >
            <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Light' }}>
            {/* {this.state.isDate === '' || this.state.isTime === '' ? dateNow : displayDate} */}
            { displayDate }
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderButtonClose() {
    return (
      <TouchableOpacity
        style={{ flex: 0, alignSelf: 'flex-end', justifyContent: 'flex-end', alignItems: 'center' }}
        onPress={() => this.setModalVisible()}
      >
        <Image
          resizeModa={'contain'}
          style={{ width: 20, height: 20 }}
          source={require('../../../assets/icons/close.png')}
        />
      </TouchableOpacity>
    );
  }

  contentGulaDarah() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff'
      }}
      >
        { this.renderButtonOpenDate() }
       <View
        style={{
          flex: 1,
          width: '70%',
          justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 13, color: '#878787', fontFamily: 'OpenSans-Light', marginBottom: -7 }}>Gula darah</Text>
          <TextInput
            value={this.state.gulaDarah}
            keyboardType={'numeric'}
            placeholder="200 mg/dL"
            onChangeText={(newValue) => {
              this.setState({
                gulaDarah: newValue.replace('.', ',')
              })
            }}
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
        </View>
        <ButtonSave
          onSubmit={this.handleSave}
          type="GULA_DARAH"
          title="SIMPAN"
        />
        {/* <TouchableOpacity
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center',
          }}
          onPress={() => this.handleSave('GULA_DARAH')}
        >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  contentInputhba1c() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
        backgroundColor: '#fff'
      }}
      >
        {this.renderButtonOpenDate()}
       <View
        style={{
          flex: 1,
          width: '70%',
          justifyContent: 'center',
        }}
       >
        <Text style={{ fontSize: 13, color: '#878787', fontFamily: 'OpenSans-Light', marginBottom: -7 }}>Hba1c</Text>
          <TextInput
            value={this.state.hba1c}
            keyboardType={'numeric'}
            onChangeText={(hba1c) => {
              if (hba1c.indexOf('.') !== -1) {
                const manipulateDot = hba1c.replace('.', ',');
                this.setState({
                  hba1c: manipulateDot
                });
              } else {
                this.setState({ hba1c }, () => {
                  const valHba1c = this.state.hba1c;
                  const manipulasiDot = valHba1c.replace('.', ',');
                  this.setState({
                    hba1c: manipulasiDot
                  });
                });
              }
            }}
            placeholder="6.0 %"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
        </View>
        <ButtonSave
          onSubmit={this.handleSave}
          type="HBA1C"
          title="SIMPAN"
        />
      </View>
    );
  }

  ModalInputHBA1C() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible()
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible()
          }}
          style={styles.modalOverlay}>
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            {
              this.contentInputhba1c()
            }
          </View>
        </View>
      </Modal>
    );
  }

  ModalGlucose() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible()
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible()
          }}
          style={styles.modalOverlay}>
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent,  { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            { this.contentGulaDarah() }
          </View>
        </View>
      </Modal>
    );
  }

  // ModalMakanan() {
  //   return (
  //     <Modal
  //       animationType="none"
  //       transparent={true}
  //       visible={this.state.modalVisible}
  //     >
  //       <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalOverlay}>
  //         <View
  //           style={
  //             [styles.modalContent, { height: '60%' }]}
  //         >
  //           { this.contentMakanan() }
  //         </View>
  //       </TouchableHighlight>
  //     </Modal>
  //   );
  // }

  // contentMakanan() {
  //   return (

  //   );
  // }

  ModalTekananDarah() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible()
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible()
          }}
          style={styles.modalOverlay}>
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            { this.contentTekananDarah() }
          </View>
        </View>
      </Modal>
    );
  }

  contentTekananDarah() {
    return (
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
        {this.renderButtonOpenDate()}
       <View
        style={{
          flex: 1,
          width: '70%',
          paddingTop: 10
        }}
       >
          <Text style={{ fontSize: 13, color: '#878787', fontFamily: 'OpenSans-Light', marginBottom: -7 }}>Sistolic</Text>
          <TextInput
            value={this.state.sistolic}
            keyboardType={'numeric'}
            onChangeText={(sistolic) => this.setState({ sistolic })}
            placeholder="120 mm/Hg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
        </View>
        <View
        style={{
          flex: 1,
          width: '70%',
          }}
        >
          <Text style={{ fontSize: 13, color: '#878787', fontFamily: 'OpenSans-Light', marginBottom: -7 }}>Diastolic</Text>
          <TextInput
            value={this.state.distolic}
            keyboardType={'numeric'}
            placeholder="80 mm/Hg"
            onChangeText={(distolic) => this.setState({ distolic })}
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
        </View>
        <ButtonSave
          onSubmit={this.handleSave}
          type="TEKANAN_DARAH"
          title="SIMPAN"
        />
      </View>
    );
  }

  ModalInputAktivitas() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible()
        }}
      >
        {/* this.setModalVisible() */}
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible()
          }}
          style={styles.modalOverlay}>
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            { this.contentAktivitas() }
          </View>
        </View>
      </Modal>
    );
  }

  contentAktivitas() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff'
      }}
      >
        { this.renderButtonOpenDate() }
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 13, color: '#878787', fontFamily: 'OpenSans-Light', marginBottom: -7 }}>Jenis Aktivitas</Text>
          <Picker
            mode="dialog"
            selectedValue={this.state.activitySelected}
            style={{ padding: 0, margin: 0, height: 50, width: 200, alignSelf: 'flex-start' }}
            onValueChange={(itemValue) => this.setState({
              activitySelected: itemValue
            }, () => {
              const desc = activityList.filter(item => item.type === this.state.activitySelected);
              this.setState({
                descActivity: this.state.activitySelected === '' ? '' : desc[0].description
              });
            })}
          >
              <Picker.Item label="Pilih Aktivitas" value="" />
              <Picker.Item label="Ringan" value="ringan" />
              <Picker.Item label="Sedang" value="sedang" />
              <Picker.Item label="Berat" value="berat" />
          </Picker>
          <View style={ {borderBottomColor: '#EF434F', borderBottomWidth: 1, marginBottom: 15 }}/>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {
              this.state.activitySelected !== '' ?
              this.renderDescAktivity()
              :
              null
            }
          </View>
        </View>
        <ButtonSave
          onSubmit={this.handleSave}
          type="ACTIVITY"
          title="SIMPAN"
        />
      </View>
    );
  }

  renderDescAktivity() {
    const desc = activityList.filter(item => item.type === this.state.activitySelected);
    return (
      <Text style={{ fontFamily: 'Montserrat-Light', color: '#4a4a4a', textAlign: 'center' }}>
        {desc[0].description}
      </Text>
    );
  }

  ModalInputWeight() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible()
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible()
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            { this.contentWeight() }
          </View>
        </View>
      </Modal>
    );
  }

  contentWeight() {
    return (
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
        {this.renderButtonOpenDate()}
       <View
        style={{
          flex: 1,
          width: '70%',
          justifyContent: 'center'
        }}
       >
          <TextInput
            value={this.state.beratBadan}
            keyboardType={'numeric'}
            onChangeText={(beratBadan) => this.setState({ beratBadan })}
            placeholder="80 kg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <ButtonSave
          onSubmit={this.handleSave}
          type="WEIGHT"
          title="SIMPAN"
        />
      </View>
    );
  }

  ModalAlertInputGulaDarah() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible()
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible()
          }}
          style={styles.modalOverlay}>
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '40%' : '40%' }]}
          >
            { this.contentAlertGulaDarah() }
          </View>
        </View>
      </Modal>
    );
  }

  contentAlertGulaDarah() {
    return (
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
        <View
        style={{
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center'
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#000' }}>
            APAKAH ANDA INGIN MEMASUKKAN DATA GULA DARAH SECARA
            MANUAL ATAU MENGGUNAKAN DNURSE?
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 1, paddingVertical: 2 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#ef434e',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({ isManually: false }, () => {
                this.setModalVisible();
                this.props.navigator.push({
                  screen: 'TemanDiabetes.StepOne',
                  navigatorStyle: { tabBarHidden: true, navBarHidden: true }
                });
              });
            }}
          >
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
              DNURSE
              </Text>
          </TouchableOpacity>
          <View style={{ width: 10 }}></View>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ef434e',
              justifyContent: 'center',
            }}
            onPress={() => this.setState({ isManually: true })}
          >
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#ef434e' }}>
                MANUAL
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  ModalLoading() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight style={styles.modalLoading}>
          <View
            style={{ justifyContent: 'center', alignItems: 'center', height: this.state.keyboardActive ? '70%' : '50%' }}
          >
            <ActivityIndicator size="large" color="#ff1200" />
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  renderModalInput() {
    if (this.state.isModal === 'BLOOD_GLUCOSE' && !this.state.isManually) {
      return this.ModalAlertInputGulaDarah();
    } else if (this.state.isModal === 'BLOOD_GLUCOSE' && this.state.isManually) {
      return this.ModalGlucose();
      // return this.ModalLoading();
    } else if (this.state.isModal === 'IS_LOADING') {
      return this.ModalLoading();
    } else if (this.state.isModal === 'INPUT_HBA1C') {
      return this.ModalInputHBA1C();
    } else if (this.state.isModal === 'INPUT_TEKANAN_DARAH') {
      return this.ModalTekananDarah();
    } else if (this.state.isModal === 'INPUT_ACTIVITY') {
      return this.ModalInputAktivitas();
    } else if (this.state.isModal === 'INPUT_WEIGHT') {
      return this.ModalInputWeight();
    }
  }

  toNavigate() {
    this.props.navigator.push({
      screen: 'TemanDiabetes.PreviewSearchMakanan',
      navigatorStyle: {
        navBarHidden: true
      },
      animated: true,
      animationType: 'fade',
      passProps: {}
    });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ScrollView>
          {this.renderModalInput()}
          <Card containerStyle={styles.cardStyle}>
            <MenuButton
              toNavigate={this.toNavigate}
              onModalInput={this.setModalVisible}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude
  },
  cardStyle: {
    height: Style.DEVICE_HEIGHT / 1.5,  //default height => 463.51
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginLeft: 8.8,
    marginRight: 8.8,
    marginTop: 19.44,
    marginBottom: 22.59,
    paddingLeft: 29.2,
    paddingTop: 25.6,
    paddingBottom: 24.85,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 0.05
      }
    })
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    width: 125.41,
    height: 46.95,
    borderRadius: 0,
    borderWidth: 2,
    paddingVertical: 5,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  textButtonStyle: {
    fontSize: Style.FONT_SIZE_SMALLER,
    fontFamily: 'Montserrat-Regular',
    color: color.white,
    fontWeight: '900'
  },
  buttonReset: {
    backgroundColor: color.white,
    borderColor: color.red,
    borderWidth: 1
  },
  textReset: {
    color: color.red
  },
  modalOverlay: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#4a4a4a',
    opacity: 0.9
  },
  modalLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    opacity: 0.9
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    opacity: 1,
    width: '70%',
  }
};

const mapStateToProps = state => ({
  dataInputTracker: state.inputTrackerReducer,
  deepLink: state.appReducer.deepLink
});

const mapDispatchToProps = dispatch => ({
  inputTrackerBloodGlucose: (params) => dispatch(inputTrackerBloodGlucose(params)),
  inputTrackerHba1c: (params) => dispatch(inputTrackerHba1c(params)),
  inputTrackerFood: (params) => dispatch(inputTrackerFood(params)),
  inputTrackerBloodPressure: (params) => dispatch(inputTrackerBloodPressure(params)),
  inputTrackerActivity: (params) => dispatch(inputTrackerActivity(params)),
  inputTrackerWeight: (params) => dispatch(inputTrackerWeight(params)),
  inputTrackerManually: (method, params) => dispatch(inputTrackerManually(method, params)),
  getFoodSuggetion: (keyword) => dispatch(getFoodSuggetion(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputTracker);
