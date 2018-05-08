import React, { Component } from 'react';
import { 
  View, 
  Platform, 
  Modal, 
  Text, 
  TouchableOpacity, 
  TouchableHighlight,
  DatePickerAndroid,
  TextInput,
  Keyboard
} from 'react-native';
// import Moment from 'moment';
import color from '../../../style/color';
import { Card, Button, CardSection, TextField } from '../../../components';
import MenuButton from './MenuButton';
import Style from '../../../style/defaultStyle';
import { dateFormateName } from '../../../utils/helpers';

class InputTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isManually: false,
      modalVisible: false,
      isModal: '',
      isDate: '',
      isGulaDarah: '',
      keyboardActive: false,
      activitySelected: ''

    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentDidMount() {}

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

  async openDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      console.log('DATE SELECTED 1', year, month)
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        
        this.setState({
          isDate: `${day} ${month} ${year}`
        });
        console.log('DATE SELECTED 2', year, month)
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'notification') {
        alert('Development');
      }
      if (event.id === 'sideMenu') {
        this.props.navigator.showModal({
          screen: 'TemanDiabets.ProfileScreen',
          title: 'Modal',
          animationType: 'none'
        });
      }
    }
  }

  setModalVisible(isModal) {
    console.log('PARAMS SET MODAL ', isModal);
    this.setState({
      modalVisible: !this.state.modalVisible,
      isModal
    });
    // alert('MODAL SHOULD BE ACTIVE');
  }

  renderButtonOpenDate() {
    const dt = new Date();
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
          {this.state.isDate === '' ? dateNow : this.state.isDate}
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
            placeholder="75/80mm/hg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center',
          }}
          onPress={() => this.setModalVisible()}
        >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
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
            placeholder="70 mmol/mol"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center',
          }}
          onPress={() => this.setModalVisible()}
        >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
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
          alert('Modal has been closed.');
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
          alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View 
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '90%' : '40%' }]}
          >
            { this.contentGulaDarah() }
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  ModalMakanan() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <TouchableHighlight onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View 
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '100%' : '80%' }]}
          >
            { this.contentMakanan() }
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }

  contentMakanan() {
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
          <Text>Sarapan</Text>
          <TextInput
            placeholder="Nasi Uduk"
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
          <Text>Makan Siang</Text>
          <TextInput
            placeholder="Soto Ayam"
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
          <Text>Makan Malam</Text>
          <TextInput
            placeholder="Salad"
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
          <Text>Snack</Text>
          <TextInput
            placeholder="Gorengan"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center',
          }}
          onPress={() => this.setModalVisible()}
        >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  ModalTekananDarah() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
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
          <Text>Distolic</Text>
          <TextInput
            placeholder="100 mm/hg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center',
          }}
          onPress={() => this.setModalVisible()}
        >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
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
          alert('Modal has been closed.');
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
       
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: this.state.activitySelected === 'RINGAN' ? '#ef434e' : '#fff',
            borderColor: this.state.activitySelected === 'RINGAN' ? '#fff' : '#ef434e',
            borderWidth: 1,
            justifyContent: 'center',
            marginVertical: 5
          }}
          onPress={() => {
            this.setState({ activitySelected: 'RINGAN' });
          }}
        >
            <Text style={{ fontFamily: 'Montserrat-Regular', color: this.state.activitySelected === 'RINGAN' ? '#fff' : '#ef434e' }}>
            RINGAN
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: this.state.activitySelected === 'SEDANG' ? '#ef434e' : '#fff',
            borderColor: this.state.activitySelected === 'SEDANG' ? '#fff' : '#ef434e',
            borderWidth: 1,
            justifyContent: 'center',
            marginVertical: 5
          }}
          onPress={() => {
            this.setState({ activitySelected: 'SEDANG' });
          }}
        >
            <Text style={{ fontFamily: 'Montserrat-Regular', color: this.state.activitySelected === 'SEDANG' ? '#fff' : '#ef434e' }}>
            SEDANG
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: this.state.activitySelected === 'BERAT' ? '#ef434e' : '#fff',
            borderColor: this.state.activitySelected === 'BERAT' ? '#fff' : '#ef434e',
            borderWidth: 1,
            justifyContent: 'center',
            marginVertical: 5
          }}
          onPress={() => {
            this.setState({ activitySelected: 'BERAT' });
          }}
        >
            <Text style={{ fontFamily: 'Montserrat-Regular', color: this.state.activitySelected === 'BERAT' ? '#fff' : '#ef434e' }}>
            BERAT
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '60%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center', 
            marginTop: 5,
            marginBottom: 10
          }}
          onPress={() => this.setModalVisible()}
        >
            <Text style={{ fontFamily: 'Montserrat-Regular', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  ModalInputWeight() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
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
            placeholder="80 kg"
            style={{ textAlign: 'center', fontSize: 19, fontFamily: 'OpenSans-Italic' }}
            underlineColorAndroid="#000"
          />
        </View>
        <TouchableOpacity 
          style={{
            flex: 0.5,
            width: '50%',
            alignItems: 'center',
            backgroundColor: '#ef434e',
            justifyContent: 'center',
          }}
          onPress={() => this.setModalVisible()}
        >
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
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
          alert('Modal has been closed.');
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
              this.setState({ isManually: false });
              alert('DNURSE READY');
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
 
  renderModalInput() {
    if (this.state.isModal === 'BLOOD_GLUCOSE' && !this.state.isManually) {
      return this.ModalAlertInputGulaDarah();
    } else if (this.state.isModal === 'BLOOD_GLUCOSE' && this.state.isManually) {
      return this.ModalGlucose(); 
    } else if (this.state.isModal === 'INPUT_HBA1C') {
      return this.ModalInputHBA1C();
    } else if (this.state.isModal === 'INPUT_FOOD') {
      return this.ModalMakanan();
    } else if (this.state.isModal === 'INPUT_TEKANAN_DARAH') {
      return this.ModalTekananDarah();
    } else if (this.state.isModal === 'INPUT_ACTIVITY') {
      return this.ModalInputAktivitas();
    } else if (this.state.isModal === 'INPUT_WEIGHT') {
      return this.ModalInputWeight();
    }
  }

  render() {
    console.log('STATE ', this.state.isModal);
    return (
      <View style={styles.containerStyle}>
        {this.renderModalInput()}
        <Card containerStyle={styles.cardStyle}>
          <MenuButton onModalInput={this.setModalVisible} />
        </Card>
        <View style={styles.buttonContainerStyle}>
          <Button buttonStyle={styles.buttonStyle} textStyle={styles.textButtonStyle}>
            KIRIM
          </Button>
          <Button
            buttonStyle={[styles.buttonStyle, styles.buttonReset]}
            textStyle={[styles.textButtonStyle, styles.textReset]}
          >
            ATUR ULANG
          </Button>
        </View>
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
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 19.44,
    marginLeft: 8.8,
    marginRight: 8.8,
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
  modalContent: { 
    flex: 0, 
    backgroundColor: '#fff', 
    opacity: 1, 
    width: '70%', 
    // minHeight: '40%',
    // maxHeight: '60%'
  }
};

export default InputTracker;
