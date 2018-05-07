import React, { Component } from 'react';
import { 
  View, 
  Platform, 
  Modal, 
  Text, 
  TouchableOpacity, 
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
      modalVisible: false,
      isModal: '',
      isDate: '',
      isGulaDarah: '',
      keyboardActive: false

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
          {dateNow}
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
        paddingVertical: 20
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
          onPress={() => {}}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
      </View>
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
        paddingVertical: 20
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
          onPress={() => {}}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
            SIMPAN
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  ModalBloodPressure() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <TouchableOpacity onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View 
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '60%' : '50%' }]}
          >
            {
              this.contentTekananDarah()
            }
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View 
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '60%' : null }]}
          >
            { this.contentGulaDarah() }
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => this.setModalVisible()} style={styles.modalWrapper}>
          <View 
            style={
              [styles.modalContent, { height: this.state.keyboardActive ? '60%' : null }]}
          >
            { this.contentGulaDarah() }
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  renderModalInput() {
    if (this.state.isModal === 'BLOOD_GLUCOSE') {
      return this.ModalGlucose();
    } else if (this.state.isModal === 'BLOOD_PRESSURE') {
      return this.ModalBloodPressure();
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
    minHeight: '40%',
    maxHeight: '60%'
  }
};

export default InputTracker;
