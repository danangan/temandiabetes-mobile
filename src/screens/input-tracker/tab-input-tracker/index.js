import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  View,
  Platform,
  ActionSheetIOS,
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
import { Card, Spinner } from '../../../components';
import DatePickerDialog from '../../../components/DatePickerIOSModal';
import MenuButton from './MenuButton';
import Style from '../../../style/defaultStyle';
import { activityList } from './initialValue';
import ButtonSave from './ButtonSave';

const activityType = [
  {
    label: 'Ringan',
    value: 'ringan'
  },
  {
    label: 'Sedang',
    value: 'sedang'
  },
  {
    label: 'Berat',
    value: 'berat'
  },
]

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
    this.openIOSPicker = this.openIOSPicker.bind(this);
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

  componentWillReceiveProps(nextProps) {
    const { isModal } = this.state;
    const { inputTracker } = nextProps.dataInputTracker;
    if (isModal === 'IS_LOADING' && inputTracker.message === 'Success') {
      Alert.alert(
        'Alert',
        'Inputan Anda berhasil disimpan.',
        [
          { text: 'OK', onPress: () =>{
            this.props.updateTopTab(2);
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
          }},
        ],
        { cancelable: false }
      )
    }
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

  setModalVisible(isModal) {
    const directGlucose = Platform.OS === 'ios' ? true : false;
    const params = isModal === undefined ? '' : isModal;
    if (directGlucose) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        isModal: params,
        activitySelected: '',
        descActivity: '',
        isManually: true
      });
    } else {
      this.setState({
        modalVisible: !this.state.modalVisible,
        isModal: params,
        activitySelected: '',
        descActivity: '',
        isManually: false
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
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];
        const selectedDate = new moment()
          .year(year)
          .month(month)
          .date(day);
        this.setState(
          {
            date: {
              day,
              month,
              year
            },
            isDate: `${day} ${monthNames[month]} ${year}`,
            inputDate: selectedDate
          },
          () => {
            this.openTimePicker();
          }
        );
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
        is24Hour: true
      });

      const menit = minute === 0 ? '00' : minute.toString().length === 1 ? `0${minute}` : '00';
      if (action !== TimePickerAndroid.dismissedAction) {
        const { inputDate } = this.state;
        // selected Date
        const selectedDate = new moment(inputDate);
        selectedDate.hour(hour).minute(minute);
        const isBeforeNow = selectedDate.isBefore(dateNow);

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
            [{ text: 'Pilih ulang', onPress: () => this.openTimePicker() }],
            { cancelable: false }
          );
        }
      }
    } catch ({ code, message }) {
      console.log('Cannot open time picker', message);
    }
  }

  GetTime() {
    // Creating variables to hold time.
    let date = '';
    let hour = '';
    let minutes = '';

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
      hour -= 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour === 0) {
      hour = 12;
    }

    // Getting the current minutes from date object.
    minutes = date.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = `0${minutes.toString()}`;
    }
    if (!this.state.hasSetTime) {
      this.setState({
        time: {
          hour: hour.toString(),
          minute: minutes.toString()
        }
      });
    }
  }

  validationInput(params) {
    const checkDecimal = /^[0-9]+([,.][0-9]+)?$/g.test(params);
    if (checkDecimal) {
      return true;
    }
    return false;
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

    let value;
    switch (casing) {
      // INPUT GULA DARAH
      case 'GULA_DARAH':
        value = {
          // formatting the inputDate to normalize the utc
          waktuInput: inputDate.format('YYYY-MM-DDTHH:mm:ss'),
          gulaDarah
        };
        const isDecimal = String(gulaDarah).includes(',');

        if (gulaDarah === 0 || gulaDarah === '') {
          Alert.alert('Perhatian!', 'Silakan masukkan gula darah Anda.');
        } else if (isDecimal) {
          Alert.alert('Perhatian!', 'Angka yang Anda masukkan tidak boleh mengandung koma (,)');
        } else {
          const checking = this.validationInput(gulaDarah);
          if (!checking) {
            alert('Data yang Anda masukkan salah.');
          } else {
            this.setState(
              {
                isManually: false,
                modalVisible: true,
                isModal: 'IS_LOADING'
              },
              () => {
                setTimeout(() => {
                  this.props.inputTrackerBloodGlucose(value);
                }, 1500);
              }
            );
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
          alert('Silakan masukkan Sistolic Anda.');
        } else if (Number(distolic) === 0 || distolic === '') {
          alert('Silakan masukkan Diastolic Anda.');
        } else if (Number(distolic) > Number(sistolic)) {
          alert('Nilai sistolic harus lebih besar daripada diastolic');
        } else {
          const checkingSistolic = this.validationInput(sistolic);
          const checkingDistolic = this.validationInput(distolic);
          if (!checkingSistolic || !checkingDistolic) {
            alert('Data yang Anda input salah.');
          } else {
            this.setState(
              {
                modalVisible: true,
                isModal: 'IS_LOADING'
              },
              () => {
                setTimeout(() => {
                  this.props.inputTrackerBloodPressure(value);
                }, 1500);
              }
            );
          }
        }
        break;

      // INPUT HBA1C
      case 'HBA1C':
        if (hba1c === 0 || hba1c === '') {
          alert('Silakan masukkan HBA1C Anda.');
        } else {
          const checkinghba1c = this.validationInput(hba1c);
          if (!checkinghba1c) {
            alert('Data yang Anda masukkan salah.');
          } else {
            this.setModalVisible('IS_LOADING');
            this.setState(
              {
                modalVisible: true,
                isModal: 'IS_LOADING'
              },
              () => {
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
              }
            );
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
          alert('Silakan pilih jenis aktivitas Anda');
        } else {
          this.setState(
            {
              modalVisible: true,
              isModal: 'IS_LOADING'
            },
            () => {
              setTimeout(() => {
                this.props.inputTrackerActivity(value);
              }, 1500);
            }
          );
        }
        break;

      // INPUT WEIGHT
      case 'WEIGHT':
        value = {
          waktuInput: inputDate,
          beratBadan
        };
        if (beratBadan === 0 || beratBadan === '') {
          alert('Silakan masukkan berat badan Anda.');
        } else {
          const checkingWeight = this.validationInput(beratBadan);
          if (!checkingWeight) {
            alert('Data yang Anda masukkan salah.');
          } else {
            this.setState(
              {
                modalVisible: true,
                isModal: 'IS_LOADING'
              },
              () => {
                setTimeout(() => {
                  this.props.inputTrackerWeight(value);
                }, 1500);
              }
            );
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

  renderButtonOpenDate() {
    const { isTime, inputDate } = this.state;
    const displayDate = `${inputDate.format('ddd DD/MM/YYYY')} at ${isTime.format('HH:mm')}`;

    return (
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20
        }}
      >
        <Image
          resizeModa={'contain'}
          style={{ width: 20, height: 20 }}
          source={require('../../../assets/icons/calendar.png')}
        />
        <TouchableOpacity
          style={{
            paddingHorizontal: 10
          }}
          onPress={() => {
            if (Platform.OS === 'android') {
              this.openDatePicker()
            } else {
              this.refs.dateTimePickerIOS.open({
                date: new Date(),
                maxDate: new Date() //To restirct past date
              })
            }
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Light' }}>{displayDate}</Text>
        </TouchableOpacity>
        {
          Platform.OS === 'ios' &&
          <DatePickerDialog
            ref="dateTimePickerIOS"
            datePickerMode="datetime"
            okLabel="Pilih"
            cancelLabel="Batal"
            onDatePicked={(val) => {
              this.setState({
                inputDate: new moment(val),
                isTime: new moment(val)
              })
            }}
          />
        }
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
        {this.renderButtonOpenDate()}
        <View
          style={{
            flex: 1,
            width: '70%',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: '#878787',
              fontFamily: 'OpenSans-Light',
              marginBottom: -7
            }}
          >
            Gula darah
          </Text>
          <TextInput
            value={this.state.gulaDarah}
            keyboardType={'numeric'}
            placeholder="200 mg/dL"
            onChangeText={newValue => {
              this.setState({
                gulaDarah: newValue.replace('.', ',')
              });
            }}
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
          {
            Platform.OS === 'ios' &&
            <View style={styles.underLine}></View>
          }
        </View>
        <ButtonSave onSubmit={this.handleSave} type="GULA_DARAH" title="SIMPAN" />
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
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: '#878787',
              fontFamily: 'OpenSans-Light',
              marginBottom: -7
            }}
          >
            Hba1c
          </Text>
          <TextInput
            value={this.state.hba1c}
            keyboardType={'numeric'}
            onChangeText={hba1c => {
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
          {
            Platform.OS === 'ios' &&
            <View style={styles.underLine}></View>
          }
        </View>
        <ButtonSave onSubmit={this.handleSave} type="HBA1C" title="SIMPAN" />
      </View>
    );
  }

  ModalInputHBA1C() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible();
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalContent, { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            {this.contentInputhba1c()}
          </View>
        </View>
      </Modal>
    );
  }

  ModalGlucose() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible();
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalContent, { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            {this.contentGulaDarah()}
          </View>
        </View>
      </Modal>
    );
  }

  ModalTekananDarah() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible();
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            {this.contentTekananDarah()}
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
          <Text
            style={{
              fontSize: 13,
              color: '#878787',
              fontFamily: 'OpenSans-Light',
              marginBottom: -7
            }}
          >
            Sistolic
          </Text>
          <TextInput
            value={this.state.sistolic}
            keyboardType={'numeric'}
            onChangeText={sistolic => this.setState({ sistolic })}
            placeholder="120 mm/Hg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
          {
            Platform.OS === 'ios' &&
            <View style={styles.underLine}></View>
          }
        </View>
        <View
          style={{
            flex: 1,
            width: '70%'
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: '#878787',
              fontFamily: 'OpenSans-Light',
              marginBottom: -7
            }}
          >
            Diastolic
          </Text>
          <TextInput
            value={this.state.distolic}
            keyboardType={'numeric'}
            placeholder="80 mm/Hg"
            onChangeText={distolic => this.setState({ distolic })}
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
          {
            Platform.OS === 'ios' &&
            <View style={styles.underLine}></View>
          }
        </View>
        <ButtonSave onSubmit={this.handleSave} type="TEKANAN_DARAH" title="SIMPAN" />
      </View>
    );
  }

  ModalInputAktivitas() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible();
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            {this.contentAktivitas()}
          </View>
        </View>
      </Modal>
    );
  }

  getLabelByVal(options, val) {
    let result
    options.forEach((item) => {
      if (item.value === val) {
        result = item.label
      }
    })
    return result
  }

  // format options = array of { label: 'Some label', value: 'Some value' }
  openIOSPicker(options = [], title, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [ ...options.map(item => item.label), 'Batal'],
      title,
      destructiveButtonIndex: options.length
    },
    (buttonIndex) => {
      if (options[buttonIndex]) {
        onSelect(options[buttonIndex].value)
      }
    });
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
        {this.renderButtonOpenDate()}
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15, width: '100%'}}>
          <Text
            style={{
              fontSize: 13,
              color: '#878787',
              width: '100%',
              fontFamily: 'OpenSans-Light',
              marginBottom: -7
            }}
          >
            Jenis Aktivitas
          </Text>
          {
            Platform.OS === 'android' &&
            <Picker
              mode="dialog"
              selectedValue={this.state.activitySelected}
              style={{ padding: 0, margin: 0, height: 50, width: '100%', alignSelf: 'flex-start' }}
              onValueChange={itemValue =>
                this.setState(
                  {
                    activitySelected: itemValue
                  },
                  () => {
                    const desc = activityList.filter(
                      item => item.type === this.state.activitySelected
                    );
                    this.setState({
                      descActivity: this.state.activitySelected === '' ? '' : desc[0].description
                    });
                  }
                )
              }
            >
              <Picker.Item label="Pilih Aktivitas" value="" />
              <Picker.Item label="Ringan" value="ringan" />
              <Picker.Item label="Sedang" value="sedang" />
              <Picker.Item label="Berat" value="berat" />
            </Picker>
          }
          {
            Platform.OS === 'ios' &&
            <TouchableOpacity
            style={{ height: 35, width: 50, marginLeft: 0, width: '100%'}}
            onPress={() => {
              const option = activityType
              const title = 'Pilih Jenis Aktifitas'
              const onSelect = val => {
                this.setState({activitySelected: val}, () => {
                  const desc = activityList.filter(
                    item => item.type === this.state.activitySelected
                  );
                  this.setState({
                    descActivity: this.state.activitySelected === '' ? '' : desc[0].description
                  });
                })
              }
              this.openIOSPicker(option, title, onSelect)
            }}
          >
            <View style={{width: '100%'}}>
              <Text style={{ marginTop: 9 }}>{this.state.activitySelected!== '' ? this.getLabelByVal(activityType, this.state.activitySelected) : 'Pilih Aktifitas'}</Text>
            </View>
          </TouchableOpacity>
          }
          <View style={{ borderBottomColor: '#EF434F', borderBottomWidth: 1, marginBottom: 15 }} />
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {this.state.activitySelected !== '' ? this.renderDescAktivity() : null}
          </View>
        </View>
        <ButtonSave onSubmit={this.handleSave} type="ACTIVITY" title="SIMPAN" />
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
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible();
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalContent, { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            {this.contentWeight()}
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
            onChangeText={beratBadan => this.setState({ beratBadan })}
            placeholder="80 kg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#EF434F"
          />
          {
            Platform.OS === 'ios' &&
            <View style={styles.underLine}></View>
          }
        </View>
        <ButtonSave onSubmit={this.handleSave} type="WEIGHT" title="SIMPAN" />
      </View>
    );
  }

  ModalAlertInputGulaDarah() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible();
          }}
          style={styles.modalOverlay}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalWrapper}>
          <View
            style={[styles.modalContent, { height: this.state.keyboardActive ? '40%' : '40%' }]}
          >
            {this.contentAlertGulaDarah()}
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
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Montserrat-SemiBold',
              color: '#000'
            }}
          >
            APAKAH ANDA INGIN MEMASUKKAN DATA GULA DARAH SECARA MANUAL ATAU MENGGUNAKAN DNURSE?
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 1,
            paddingVertical: 2
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#ef434e',
              justifyContent: 'center'
            }}
            onPress={() => {
              this.setState({ isManually: false }, () => {
                this.setModalVisible();
                this.props.navigator.push({
                  screen: 'TemanDiabetes.DnurseResult',
                  navigatorStyle: { tabBarHidden: true, navBarHidden: true }
                });
              });
            }}
          >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>DNURSE</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ef434e',
              justifyContent: 'center'
            }}
            onPress={() => this.setState({ isManually: true })}
          >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#ef434e' }}>MANUAL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  ModalLoading() {
    return (
      <Modal animationType="none" transparent visible={this.state.modalVisible}>
        <TouchableHighlight style={styles.modalLoading}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: this.state.keyboardActive ? '70%' : '50%'
            }}
          >
            <Spinner size="large" color="#ff1200" />
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
      animationType: 'slide',
      passProps: {}
    });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ScrollView>
          {this.renderModalInput()}
          <Card containerStyle={styles.cardStyle}>
            <MenuButton toNavigate={this.toNavigate} onModalInput={this.setModalVisible} />
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
    height: Style.DEVICE_HEIGHT / 1.5, //default height => 463.51
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginLeft: 8.8,
    marginRight: 8.8,
    marginTop: 19.44,
    marginBottom: 19.44,
    paddingLeft: 29.2,
    paddingTop: 15,
    paddingBottom: 10,
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
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#4a4a4a',
    opacity: 0.9,
  },
  modalLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    opacity: 0.9
  },
  modalWrapper: {
    position: 'absolute',
    marginHorizontal: Dimensions.get('window').width*0.1,
    marginVertical: Dimensions.get('window').height*0.25,
    height: Dimensions.get('window').height*0.4,
    width: Dimensions.get('window').width*0.8,
  },
  modalContent: {
    backgroundColor: '#fff',
    opacity: 1,
    flex: 1,
  },
  underLine: {
    borderBottomColor: '#ef434e',
    borderBottomWidth: 1,
  },
};

const mapStateToProps = state => ({
  dataInputTracker: state.inputTrackerReducer,
  deepLink: state.appReducer.deepLink
});

const mapDispatchToProps = dispatch => ({
  inputTrackerBloodGlucose: params => dispatch(inputTrackerBloodGlucose(params)),
  inputTrackerHba1c: params => dispatch(inputTrackerHba1c(params)),
  inputTrackerFood: params => dispatch(inputTrackerFood(params)),
  inputTrackerBloodPressure: params => dispatch(inputTrackerBloodPressure(params)),
  inputTrackerActivity: params => dispatch(inputTrackerActivity(params)),
  inputTrackerWeight: params => dispatch(inputTrackerWeight(params)),
  inputTrackerManually: (method, params) => dispatch(inputTrackerManually(method, params)),
  getFoodSuggetion: keyword => dispatch(getFoodSuggetion(keyword)),
  updateTopTab: activeTab => dispatch({ type: 'UPDATE_ACTIVE_TOP_TAB', payload: activeTab })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputTracker);
