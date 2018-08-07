import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  FlatList
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
      getDetails: false,
      refreshing: false,
      reminderDetail: null
    };
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onSubmitReminder = this.onSubmitReminder.bind(this);
    this.toUpdateStatusReminder = this.toUpdateStatusReminder.bind(this);
    this.getReminderDetails = this.getReminderDetails.bind(this);
    this.updateReminder = this.updateReminder.bind(this);
    this.resultValue = this.resultValue.bind(this);
  }

  componentDidMount() {
    this.props.getListReminder();
  }

  componentWillReceiveProps(nexProps) {
    const { updateReminder } = this.props.dataReminder;
    if (this.props.dataReminder.listReminder.data.length !== nexProps.dataReminder.listReminder.data.length) {
      this.setState({
        item: nexProps.dataReminder.listReminder.data,
        refreshing: false
      }, () => {
        if (this.state.item.length === 0) {
          this.props.getListReminder();
        }
      });
    } 

    if (nexProps.dataReminder.createReminder.status_code === 200 && this.state.isProcess) {
      this.setState({
        isProcess: false,
        refreshing: false
      }, () => {
        this.props.getListReminder();
      });
    } 
    
    if (this.props.dataReminder.detailsReminder !== nexProps.dataReminder.detailsReminder && this.state.getDetails) {
      this.setState({
        getDetails: false
      }, () => {
        this.setModalVisible();
      });
    } 

    if (updateReminder.status_code === 200 && this.state.isProcess) {
      this.setState({
        isProcess: false,
        refreshing: false
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
      isProcess: true,
      item: []
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
    const updateReminder = {
      drugReminderId: _id,
      is_active: !is_active
    };
    const currentItem = this.state.item;
    currentItem[index].is_active = !is_active;
    // listReminder[index].is_active = !listReminder[index].is_active;
    this.setState({
      isProcess: true,
      refreshing: true,
      indexChange: index,
      item: currentItem
    }, () => {
      this.props.updateDrugReminder(updateReminder, index);
    });
    // this.setState({
    //   isProcess: true,
    //   indexChange: index,
    //   item: [
    //     ...this.state.item.slice(0, index),
    //     mutatedItem,
    //     ...this.state.item.slice(index+1),
    //   ]
    // }, () => {
    //   this.props.updateDrugReminder(updateReminder, index);
    // });
  }

  updateReminder(reminder) {
    console.log('toUpdateReminder ', reminder);
    this.setState({
      isProcess: true
    }, () => {
      this.props.updateDrugReminder(reminder);
    });
  }

  renderModalCreate() {
    const { detailsReminder: { data } } = this.props.dataReminder;
    console.log('DATAAA ', data);
    if (this.state.isProcess) {
      return (
        <View>
          <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
        </View>
      );
    }
    return (
      <ModalCreateReminder
        modalVisible={this.state.modalActive}
        setModalVisible={this.setModalVisible}
        onSubmit={this.onSubmitReminder}
        preData={this.state.reminderDetail}
        toUpdateReminder={this.updateReminder}
      />
    );
  }

  getReminderDetails(item) {
    this.setState({
      // getDetails: true,
      reminderDetail: item
    }, () => {
      this.setModalVisible();
      // this.props.getDetailsReminder(item.id);
    });
  }

  isLoadingData() {
    const { listReminder } = this.props.dataReminder;
    if (listReminder.message === 'EmptyList') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Light', textAlign: 'center', paddingHorizontal: 10 }}>
            Anda belum memiliki daftar pengingat obat saat ini.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
        </View>
      );
    }
  }

  resultValue(statusValue) {
    return statusValue;
  }

  renderItem(reminder) {
    return (
      <ReminderCard
        key={reminder.index}
        item={reminder.item}
        index={reminder.index}
        statusReminder={this.resultValue(reminder.item.is_active)}
        onChangeSwitch={this.onChangeSwitch}
        toUpdateStatusReminder={this.toUpdateStatusReminder}
        getReminderDetails={this.getReminderDetails}
      />
    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.props.getListReminder();
    });
  }

  render() {
    // const { listReminder } = this.props.dataReminder;
    // console.log('this state --> ', this.state);
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
            <FlatList
              keyExtractor={item => item.id}
              data={this.state.item}
              renderItem={item => this.renderItem(item)}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
            />
          }
        </View>
        <View style={styles.leftWrapper}>
          <TouchableHighlight
            onPress={this.setModalVisible}
            style={{ flex: 0.5, backgroundColor: '#ef434f', justifyContent: 'center', alignItems: 'center', elevation: 3, borderRadius: 3 }}>
            <Text style={{ color: '#fff', paddingHorizontal: 30, fontFamily: 'Montserrat-Light', fontSize: 12 }}>TAMBAHKAN</Text>
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
