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
  updateDrugReminder,
  getDetailsReminder
} from '../../../actions';

import { NavigationBar } from '../../../components';
import ReminderCard from './ReminderCard';
import ModalCreateReminder from './ModalCreateReminder';

class DrugReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      modalActive: false,
      indexChange: null,
      item: [],
      isProcess: false,
      getDetails: false
    };
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onSubmitReminder = this.onSubmitReminder.bind(this);
    this.toUpdateStatusReminder = this.toUpdateStatusReminder.bind(this);
    this.getReminderDetails = this.getReminderDetails.bind(this);
    this.updateReminder = this.updateReminder.bind(this);
  }

  componentDidMount() {
    this.props.getListReminder();
  }

  componentWillReceiveProps(nexProps) {
    console.log('WILL RECEIPE ', nexProps);
    const { updateReminder } = this.props.dataReminder;
    if (this.props.dataReminder.listReminder.data.length !== nexProps.dataReminder.listReminder.data.length) {
      this.setState({
        item: nexProps.dataReminder.listReminder.data
      });
    } else if (nexProps.dataReminder.createReminder.status_code === 200 && this.state.isProcess) {
      this.setState({
        isProcess: false
      }, () => {
        this.props.getListReminder();
      });
    } else if (this.props.dataReminder.detailsReminder !== nexProps.dataReminder.detailsReminder && this.state.getDetails) {
      this.setState({
        getDetails: false
      }, () => {
        this.setModalVisible();
      });
    } else if (updateReminder.status_code === 200 && this.state.isProcess) {
      this.setState({
        isProcess: false
      }, () => {
        this.props.getListReminder();
      });
    }
  }
  /**
   * SOON -->
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { indexChange } = this.state;
    // console.log('nextState ', nextState);
    // console.log('nextProps ', nextProps);
    const { index } = nextProps.dataReminder.updateReminder;
    if (nextState.item.length && this.state.item.length && index !== null) {
      if (this.state.item[index].is_active !== nextState.item[index].is_active) {
        return false;
      } 
    } else if (this.state.item.length === 0) {
      return true;
    } else if (this.state.modalActive !== nextState.modalActive) {
      return true;
    }
    return true;
    
    // if (this.state.item[indexChange] !== nextState.item[indexChange]) {
    //   return true;
    // }
    // return true;
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

  toUpdateStatusReminder({ index, _id, is_active }) {
    console.log('INDEX', index);
    const listReminder = this.state.item;
    const updateReminder = {
      drugReminderId: _id,
      is_active: !is_active
    };
    listReminder[index].is_active = !listReminder[index].is_active;
    this.setState({
      isProcess: true,
      indexChange: index,
      item: listReminder
    }, () => {
      this.props.updateDrugReminder(updateReminder, index);
    });
  }

  updateReminder(reminder) {
    this.setState({
      isProcess: true
    }, () => {
      this.props.updateDrugReminder(reminder);
    });
  }

  renderModalCreate() {
    const { detailsReminder: { data } } = this.props.dataReminder;
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
          preData={data}
          toUpdateReminder={this.updateReminder}
        />
      </ScrollView>
    );
  }

  getReminderDetails(id) {
    this.setState({
      getDetails: true
    }, () => {
      this.props.getDetailsReminder(id);
    });
  }

  isLoadingData() {
    const { listReminder } = this.props.dataReminder;
    if (listReminder.meessage === 'Empty List') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Light' }}>Anda belum memiliki list reminder saat ini.</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
      </View>
    );
  }

  render() {
    console.log('STATE ', this.state);
    const { listReminder } = this.props.dataReminder;
    return (
      <View style={styles.container}>
        { this.state.modalActive ? this.renderModalCreate() : null }
        <NavigationBar
          onPress={() => this.props.navigator.pop()} title="PENGINGAT OBAT"
        />
        <View style={styles.centerWrapper}>
          { 
            this.state.item.length === 0 ?
            this.isLoadingData()
            :
            <ScrollView>
            { 
              this.state.item.map((item, index) => (
                <ReminderCard 
                  key={index} 
                  item={item}
                  index={index}
                  statusReminder={item.is_active}
                  onChangeSwitch={this.onChangeSwitch}
                  toUpdateStatusReminder={this.toUpdateStatusReminder}
                  getReminderDetails={this.getReminderDetails}
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
  updateDrugReminder: (reminder, index) => dispatch(updateDrugReminder(reminder, index)),
  getDetailsReminder: (idReminder) => dispatch(getDetailsReminder(idReminder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrugReminder);
