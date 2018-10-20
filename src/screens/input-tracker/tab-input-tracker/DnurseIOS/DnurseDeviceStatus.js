import { Platform, } from 'react-native';

const DnurseDeviceStatus = {};

DnurseDeviceStatus.transToJS = function (status) {
    let result = status;
    if (Platform.OS === 'ios') {
        result = iOSStatusCodes[status.toString()];
    } else if (Platform.OS === 'android') {
        result = androidStatusCodes[status.toString()];
    }

    return result;
}

DnurseDeviceStatus.transToNative = function (status) {
    // TODO: JS to Native
    const result = status;
    // if (Platform.OS === 'ios') {
    //     result = iOSStatusCodes[status.toString()];
    // } else if (Platform.OS === 'android') {
    //     result = androidStatusCodes[status.toString()];
    // }
    return result;
};

let iOSStatusCodes = {
  '0': '0',   // TEST_STATUS_WAITING_DEVICE_PLUGIN
  '1': '1',   // TEST_STATUS_WAKING_UP_DEVICE
  '2': '1',   // TEST_STATUS_RECOGNIZE_DEVICE
  '3': '1',   // TEST_STATUS_GET_DEVICE_INFO
  '4': '2',   // TEST_STATUS_DEVICE_CHECKE_FINISH
  '5': '3',   // TEST_STATUS_PAPER_USED
  '6': '4',   // TEST_STATUS_PAPER_INSERTED
  '7': '5',   // TEST_STATUS_PAPER_OUT
  '8': '6',   // TEST_STATUS_START_TEST
  '9': '7',   // TEST_STATUS_TEST_COMPLETE
  '10': '8',  // TEST_STATUS_NEED_CALIBRATION
  '11': '9',  // TEST_STATUS_LOW_POWER
  '12': '10', // TEST_STATUS_CHECK_ERROR
  '13': '11', // TEST_STATUS_VOLTAGE_INFO
  '14': '12', // TEST_STATUS_TEMPERATURE_INFO
  '15': '13', // TEST_STATUS_SN_INFO
  '16': '14', // TEST_STATUS_SWVER_INFO
  '17': '15', // TEST_STATUS_UNKNOW_CAUSE_ERROR
  '18': '16', // TEST_STATUS_TIME_OUT_DEVICE_SLEEP
  '19': '17', // TEST_STATUS_TEMPERATURE_LOW_ERROR
  '20': '18', // TEST_STATUS_TEMPERATURE_HIGH_ERROR
  '21': '19', // TEST_STATUS_TEST_TIMEOUT
  '22': '20', // TEST_STATUS_TIMEOUT_UPDATE
  '23': '21', // TEST_STATUS_REC_DENY only iOS
  '24': '22'  // TEST_STATUS_REC_PENDING only iOS
};

let androidStatusCodes = {
  '0': '0',   // NOT_INSERTED
  '1': '1',   // COMMUNICATING
  '2': '24',  // CREATE_PLAYER_FAIL only Android
  '3': '23',  // CREATE_RECORDER_FAIL only Android
  '4': '10',  // INSERT_CHECK_ERROR
  '5': '1',   // DNURSE_INSERTED
  '6': '2',   // DEVICE_CHECK_FINISH
  '7': '11',  // VOLTAGE_INFO
  '8': '12',  // TEMPERATURE_INFO
  '9': '13',  // SN_INFO
  '10': '14', // SWVER_INFO
  '11': '25', // TUNING_INFO only Android
  '12': '4',  // TEST_PAPER_INSERTED
  '13': '3',  // OLD_TEST_PAPER_INSERTED
  '14': '5',  // TEST_PAPER_REMOVED
  '15': '6',  // START_TEST
  '16': '19', // TEST_TIME_OUT
  '17': '7',  // TEST_FINISH
  '18': '15', // UNKNOW_CAUSE_ERROR
  '19': '16', // TIME_OUT_DEVICE_SLEEP
  '20': '17', // TEMPERATURE_LOW_ERROR
  '21': '18', // TEMPERATURE_HIGH_ERROR
  '22': '9',  // VOLTAGE_LOW
  '23': '8',  // NEED_CALIBRATE
  '24': '20'  // TIMEOUT_UPDATE
};

export default DnurseDeviceStatus;
