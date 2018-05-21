import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import { 
  getListReminder,
  createDrugReminder,
  updateDrugReminder
} from '../../../actions';

import { NavigationBar } from '../../../components';
import ReminderCard from './ReminderCard';
import Dot from './Dot';
import ModalCreateReminder from './ModalCreateReminder';

class DrugReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      modalActive: false,
      item: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      isProcess: false
    };
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onSubmitReminder = this.onSubmitReminder.bind(this);
    this.toUpdateStatusReminder = this.toUpdateStatusReminder.bind(this);
  }

  componentDidMount() {
    this.props.getListReminder();
  }

  componentWillReceiveProps(nexProps) {
    console.log('WILL RECEIPE ', nexProps);
    if (nexProps.dataReminder.createReminder.status_code === 200 && this.state.isProcess) {
      this.setState({
        isProcess: false
      }, () => {
        this.props.getListReminder();
      });
    }
  }

  onChangeSwitch() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  onSubmitReminder(reminder) {
    this.setState({
      isProcess: true
    }, () => {
      this.props.createDrugReminder(reminder);
    });
  }

  setModalVisible() {
    this.setState({
      modalActive: !this.state.modalActive
    });
  }

  toUpdateStatusReminder({ _id, is_active }) {
    const updateReminder = {
      drugReminderId: _id,
      is_active: !is_active
    };
    this.setState({
      isProcess: true
    }, () => {
      this.props.updateDrugReminder(updateReminder);
      this.props.getListReminder();
    });
  }

  renderModalCreate() {
    if (this.state.isProcess) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } 
    return (
      <ScrollView>
        <ModalCreateReminder
          modalVisible={this.state.modalActive}
          setModalVisible={this.setModalVisible}
          onSubmit={this.onSubmitReminder}
        />
      </ScrollView>
    );
  }

  render() {
    const { listReminder } = this.props.dataReminder;
    return (
      <View style={styles.container}>
        { this.state.modalActive ? this.renderModalCreate() : null }
        <NavigationBar
          onPress={() => this.props.navigator.pop()} title="PENGINGAT OBAT"
        />
        <View style={styles.centerWrapper}>
          {
            listReminder.data.length === 0 ?
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
            </View>
            :
            <ScrollView>
            { 
              listReminder.data.map((item, index) => (
                <ReminderCard 
                  key={index} 
                  item={item}
                  index={index}
                  statusReminder={item.is_active}
                  onChangeSwitch={this.onChangeSwitch}
                  toUpdateStatusReminder={this.toUpdateStatusReminder}
                />
              ))
            }
            </ScrollView>
          }
        </View>
        <View style={styles.leftWrapper}>
          <TouchableHighlight 
            onPress={this.setModalVisible}
            style={{ flex: 0.5, backgroundColor: '#ef434f', justifyContent: 'center', alignItems: 'center', elevation: 3, borderRadius: 3 }}>
            <Text style={{ color: '#fff', paddingHorizontal: 30, fontFamily: 'Montserrat-Light', fontSize: 12 }}>TAMBAH</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = {
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    paddingHorizontal: 2, 
    paddingVertical: 15 
  },
  centerWrapper: { 
    flex: 5 
  },
  leftWrapper: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center' 
  }
};

const mapStateToProps = state => ({
  dataReminder: state.reminderReducer
});

const mapDispatchToProps = dispatch => ({
  getListReminder: () => dispatch(getListReminder()),
  createDrugReminder: (reminder) => dispatch(createDrugReminder(reminder)),
  updateDrugReminder: (reminder) => dispatch(updateDrugReminder(reminder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrugReminder);
