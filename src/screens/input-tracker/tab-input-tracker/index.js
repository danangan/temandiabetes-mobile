import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  AsyncStorage,
  ActivityIndicator,
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
      isTime: '',
      isGulaDarah: '',
      keyboardActive: false,
      activitySelected: '',
      descActivity: '',
      gulaDarah: 0,
      tekananDarah: 0,
      hba1c: 0,
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
      date: '',
      time: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.toNavigate = this.toNavigate.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem(authToken);
    // console.log('TOKEN INI BRA ', token);
    this.props.getFoodSuggetion();
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
        date: new Date(),
        maxDate: new Date()
      });
      console.log('INI MONTH ', month);
      if (action !== DatePickerAndroid.dismissedAction) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.setState({
          // using key date 
          date: {
            day,
            month,
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
        minute: null,
        is24Hour: false,
      });
      // console.log('INI MENIT KAN... ', minute);
      const menit = minute === 0 ? '00' : 
                    minute.toString().length === 1 ? `0${minute}` : '00';
      // console.log(`INI DATE NYA BRE --> ${hour}:${menit}`);
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({
          time: {
            hour,
            minute
          },
          isTime: `${hour}:${menit}`,
          iniJam: `${hour}`,
          iniMenit: `${menit}`
        });
      }
    } catch ({ code, message }) {
      console.log('Cannot open time picker', message);
    }
  }

  setModalVisible(isModal) {
    console.log('PARAMS SET MODAL ', isModal);
    const params = isModal === undefined ? '' : isModal;
    this.setState({
      modalVisible: !this.state.modalVisible,
      isModal: params,
      activitySelected: '',
      descActivity: '',
      isManually: false
    });
  }

  handleSave(casing) {
    const {
      dateInput,
      gulaDarah,
      distolic,
      sistolic,
      hba1c,
      activitySelected,
      descActivity,
      beratBadan,
      sarapan,
      makanSiang,
      makanMalam,
      snack,
      isTime,
      iniJam,
      iniMenit,
      date,
      time
    } = this.state;
    // console.log('IS TIME -->', iniJam, ' ', iniMenit);
    const inputDate = new Date(date.year, date.month, date.day, time.hour, time.minute, 0);
    inputDate.toUTCString();
    // console.log('FINAL TIME', dateFinal);
    // const inputDate = new Date(dateInput + ' ' + isTime + ':00').toUTCString();
    // const inputDate = new Date(dateInput);
    // inputDate.setHours(iniJam, iniMenit, '00');
    // inputDate.toUTCString();
    if (casing === 'GULA_DARAH') {
      const value = {
        waktuInput: inputDate,
        gulaDarah
      };
      if (gulaDarah === 0 || gulaDarah === '') {
        alert('Silahkan input Gula darah Anda.');
      } else {
        // this.setModalVisible('IS_LOADING');
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
    } else if (casing === 'TEKANAN_DARAH') {
      const value = {
        waktuInput: inputDate,
        tekananDarah: {
          sistolic,
          distolic
        }
      };
      if (sistolic === 0 || sistolic === '') {
        alert('Silahkan input Sistolic Anda.');
      } else if (distolic === 0 || distolic === '') {
        alert('Silahkan input Diastolic Anda.');
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
    } else if (casing === 'HBA1C') {
      if (hba1c === 0 || hba1c === '') {
        alert('Silahkan input HBA1C Anda.');
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
    } else if (casing === 'ACTIVITY') {
      const value = {
        waktuInput: inputDate,
        jenisAktifitas: 'kurang',
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
    } else if (casing === 'WEIGHT') {
      const value = {
        waktuInput: inputDate,
        beratBadan
      };
      if (beratBadan === 0 || beratBadan === '') {
        alert('Silahkan input berat badan Anda.');
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
  }

  renderButtonOpenDate() {
    const { isDate, isTime } = this.state;
    const dt = new Date();
    // const dateMoment = moment(this.state.isDate);
    // `${now.year()}-${now.month()}-${now.date()}`;
    const displayDate = `${isDate} at ${isTime}`;
    const dateNow = dateFormateName(dt);
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => this.openDatePicker()}
      >
          <Text style={{ fontSize: 20, fontFamily: 'OpenSans-Light' }}>
          {this.state.isDate === '' ? dateNow : displayDate}
          </Text>
      </TouchableOpacity>
    );
  }

  contentGulaDarah() {
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
        {this.renderButtonOpenDate()}
       <View
       style={{
         flex: 1,
         width: '70%',
        }}
       >
          <TextInput
            value={this.state.gulaDarah}
            keyboardType={'numeric'}
            placeholder="75/80mm/hg"
            onChangeText={(gulaDarah) => this.setState({ gulaDarah })}
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
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
        flex: 2,
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
        }}
       >
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
            placeholder="70 mmol/mol"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
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
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '60%' : '40%' }]}
          >
            {
              this.contentInputhba1c()
            }
          </View>
        </TouchableHighlight>
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
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            { this.contentGulaDarah() }
          </View>
        </TouchableHighlight>
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
  //       <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
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
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            { this.contentTekananDarah() }
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  contentTekananDarah() {
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
        {this.renderButtonOpenDate()}
       <View
        style={{
          flex: 1,
          width: '70%',
        }}
       >
          <Text>Sistolic</Text>
          <TextInput
            value={this.state.sistolic}
            keyboardType={'numeric'}
            onChangeText={(sistolic) => this.setState({ sistolic })}
            placeholder="20 mm/hg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <View
        style={{
          flex: 1,
          width: '70%',
          }}
        >
          <Text>Diastolic</Text>
          <TextInput
            value={this.state.distolic}
            keyboardType={'numeric'}
            placeholder="100 mm/hg"
            onChangeText={(distolic) => this.setState({ distolic })}
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
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
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            { this.contentAktivitas() }
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  contentAktivitas() {
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
        {this.renderButtonOpenDate()}

        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',  borderBottomColor: '#ff1200', borderBottomWidth: 1 }}>
          <Text style={{ fontFamily: 'Montserrat-Light', color: '#4a4a4a' }}>Jenis Aktivitas</Text>
          <Picker
            mode="dialog"
            selectedValue={this.state.activitySelected}
            style={{ padding: 0, margin: 0, height: 50, width: 200, borderBottomColor: '#ff1200', borderBottomWidth: 1 }}
            onValueChange={(itemValue) => this.setState({
              activitySelected: itemValue
            }, () => {
              const desc = activityList.filter(item => item.type === this.state.activitySelected);
              this.setState({
                descActivity: this.state.activitySelected === '' ? '' : desc[0].description
              });
            })}
          >
              <Picker.Item label="Pilih Aktifitas" value="" />
              <Picker.Item label="Ringan" value="ringan" />
              <Picker.Item label="Sedang" value="sedang" />
              <Picker.Item label="Berat" value="berat" />
          </Picker>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            this.state.activitySelected !== '' ?
            this.renderDescAktivity()
            :
            null
          }
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
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '70%' : '50%' }]}
          >
            { this.contentWeight() }
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  contentWeight() {
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
        {this.renderButtonOpenDate()}
       <View
        style={{
          flex: 1,
          width: '70%',
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
          // alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '40%' : '40%' }]}
          >
            { this.contentAlertGulaDarah() }
          </View>
        </TouchableHighlight>
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
            APAKAH ANDA INGIN MEMASUKKAN GULA DARAH SECARA
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
                  screen: 'TemanDiabets.StepOne',
                  navigatorStyle: { tabBarHidden: true, navBarHidden: true }
                });
              });
            }}
          >
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
              DNURSE
              </Text>
          </TouchableOpacity>
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
      screen: 'TemanDiabets.PreviewSearchMakanan',
      navigatorStyle: {
        navBarHidden: true
      },
      animated: true,
      animationType: 'fade',
      passProps: {}
    });
  }

  render() {
    console.log('THIS STATE ', this.state);
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
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalContent: {
    flex: 0,
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
