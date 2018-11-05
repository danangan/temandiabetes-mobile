//
//  BloodTester.h
//  Dnurse
//
//  Created by ygc on 13-5-3.
//  Copyright (c) 2014 Beijing Dnurse Technology Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>

extern NSString * const kDNUTesterStatusChanged ;

extern NSString * const kDNUTesterParamTimeout;
extern NSString * const kDNUTesterParamTestProgress;

extern NSString * const kDNUTesterParamResultValue;
extern NSString * const kDNUTesterParamResultDate;
extern NSString * const kDNUTesterParamResultFlag;
extern NSString * const kDNUTesterParamResultType;
extern NSString * const kDNUTesterParamResultDevice;
extern NSString * const kDNUTesterParamResultDeviceSN;
extern NSString * const kDNUTesterParamResultDeviceSwver;
extern NSString * const kDNUTesterParamResultDeviceTemperature;
extern NSString * const kDNUTesterParamResultDeviceVoltage;
extern NSString * const kDNUTesterParamResultDeviceGlucoCurrent;


#define BLOOD_TESTER_STATUS_CHANGED             (kDNUTesterStatusChanged)

#define PARAM_TIMEOUT                           (kDNUTesterParamTimeout)
#define PARAM_TEST_PROGRESS                     (kDNUTesterParamTestProgress)

#define PARAM_TEST_RESULT_VALUE                 (kDNUTesterParamResultValue)
#define PARAM_TEST_RESULT_DATE                  (kDNUTesterParamResultDate)
#define PARAM_TEST_RESULT_FLAG                  (kDNUTesterParamResultFlag)
#define PARAM_TEST_RESULT_TYPE                  (kDNUTesterParamResultType)
#define PARAM_TEST_RESULT_DEVICE                (kDNUTesterParamResultDevice)
#define PARAM_TEST_RESULT_DEVICE_SN             (kDNUTesterParamResultDeviceSN)
#define PARAM_TEST_RESULT_DEVICE_SWVER          (kDNUTesterParamResultDeviceSwver)
#define PARAM_TEST_RESULT_DEVICE_TEMPERATURE    (kDNUTesterParamResultDeviceTemperature)
#define PARAM_TEST_RESULT_DEVICE_VOLTAGE        (kDNUTesterParamResultDeviceVoltage)
#define PARAM_TEST_RESULT_DEVICE_GLUCO_CURRENT  (kDNUTesterParamResultDeviceGlucoCurrent)


typedef  NS_ENUM(NSInteger, DNUTestStatus) {
    TEST_STATUS_WAITING_DEVICE_PLUGIN,
    TEST_STATUS_WAKING_UP_DEVICE,
    TEST_STATUS_RECOGNIZE_DEVICE,
    TEST_STATUS_GET_DEVICE_INFO,
    TEST_STATUS_DEVICE_CHECKE_FINISH,
    TEST_STATUS_PAPER_USED,
    TEST_STATUS_PAPER_INSERTED,
    TEST_STATUS_PAPER_OUT,
    TEST_STATUS_START_TEST,
    TEST_STATUS_TEST_COMPLETE,
    TEST_STATUS_NEED_CALIBRATION,
    TEST_STATUS_LOW_POWER,
    TEST_STATUS_CHECK_ERROR,
    TEST_STATUS_VOLTAGE_INFO,
    TEST_STATUS_TEMPERATURE_INFO,
    TEST_STATUS_SN_INFO,
    TEST_STATUS_SWVER_INFO,
    TEST_STATUS_UNKNOW_CAUSE_ERROR,
    TEST_STATUS_TIME_OUT_DEVICE_SLEEP,
    TEST_STATUS_TEMPERATURE_LOW_ERROR,
    TEST_STATUS_TEMPERATURE_HIGH_ERROR,
    TEST_STATUS_TEST_TIMEOUT,
    TEST_STATUS_TIMEOUT_UPDATE,
    TEST_STATUS_REC_DENY,
    TEST_STATUS_REC_PENDING,
};

@interface NotifyStatus : NSObject {

}
@property (nonatomic, readonly)	DNUTestStatus   status;
@property (nonatomic, readonly)	NSDictionary   *params;
@end

@interface BloodTester : NSObject
{
 
}

@property (nonatomic, readonly)         DNUTestStatus                  status;
@property (nonatomic, readonly)         float                       testResult;
@property (nonatomic, readonly)         int                         glucoCurrent;
@property (nonatomic)                   SignedByte                  testType;

@property (nonatomic, readonly)         int                         failedCnt;
@property (nonatomic, readonly)         int                         successCnt;
@property (nonatomic, readonly)         int                         bloodTestCnt;
@property (nonatomic, readonly)         int                         elecTestCnt;
@property (nonatomic, readonly)         BOOL                        micPlugin;
@property (nonatomic, readonly)         NSString*                   temperature;
@property (nonatomic, readonly)         float                       voltage;
@property (nonatomic, readonly)         int                         timeOut;
@property (nonatomic, readonly)         NSString*                   deviceSN;
@property (nonatomic, readonly)         int                         deviceSWVer;
@property (nonatomic, readonly)         Byte                         hwVer;
@property (nonatomic)                   BOOL                         debugMode;
@property (nonatomic)                   BOOL                         saveLog;
@property (nonatomic, readonly)         Byte                        protocolVer;

@property (nonatomic)                   BOOL                         ignoreTypeCheck;

- (void) setupAudio;
- (void) stop;
- (void) wakeupDevice;
+ (BOOL) isLowValue:(float) value;
+ (BOOL) isHighValue:(float) value;
+ (NSString *) formatValue:(float) value;

- (BOOL) playTestTone:(BOOL) left;
- (BOOL) startRecord;
- (NSString *) stopRecord;

- (void) playFile:(NSString *) file;
- (NSString *) zipLogFiles;
@end
