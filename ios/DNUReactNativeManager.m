//
//  DNUReactNativeManager.m
//  DnurseRNDemo
//
//  Created by HertzWang on 2018/9/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DNUReactNativeManager.h"

#import "BloodTester.h"
#import "AppDelegate.h"

NSString *kBloodTesterModule = @"BloodTester";

@implementation DNUReactNativeManager
{
  bool hasListeners;
}

// componentDidMount
RCT_EXPORT_METHOD(initManager)
{
  // init
  dispatch_async(dispatch_get_main_queue(), ^{

    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    
    self.bloodTester = [delegate bloodTester];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:NSSelectorFromString(@"bloodTesterStatusChanged:")
                                                 name:BLOOD_TESTER_STATUS_CHANGED
                                               object:nil];
  });
}

// change test type
RCT_EXPORT_METHOD(setTestType:(NSInteger)type)
{
  self.bloodTester.testType = type;
}

// componentWillUnmount
RCT_EXPORT_METHOD(removeNotification)
{
  // remove Notification
  self.bloodTester = nil;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[kBloodTesterModule];
}

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
}

#pragma mark -

+ (instancetype)shared
{
  static DNUReactNativeManager *instance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    instance = [[DNUReactNativeManager alloc] init];
  });
  
  return instance;
}

- (void)bloodTesterStatusChanged:(NSNotification *)note
{
  if (!hasListeners) {
    return;
  }
  
  NotifyStatus *notifyStatus = [note object];
  NSDictionary *param = notifyStatus.params;
  
  NSString *hintText = @"";
  DNUTestStatus status = notifyStatus.status;
  
  switch (status) {
    case TEST_STATUS_WAITING_DEVICE_PLUGIN:
    hintText = @"Select testing time period";
    
    break;

    case TEST_STATUS_WAKING_UP_DEVICE:
    case TEST_STATUS_RECOGNIZE_DEVICE:
    case TEST_STATUS_GET_DEVICE_INFO:
    hintText = @"Conmunicating";
    
    break;
    
    case TEST_STATUS_DEVICE_CHECKE_FINISH:
    hintText = @"Insert Test Paper";
    
    break;

    case TEST_STATUS_PAPER_USED:
    hintText = @"Insert a new Test Paper";
    
    break;

    case TEST_STATUS_PAPER_INSERTED:
    hintText = @"Drop blood";
    
    break;

    case TEST_STATUS_PAPER_OUT:
    hintText = @"Insert Test Paper";
    
    break;

    case TEST_STATUS_START_TEST:
    {
      NSNumber *progress = [param objectForKey:PARAM_TEST_PROGRESS];
      hintText = [NSString stringWithFormat:@"Testing:%@", progress];
      
    }
    break;

    case TEST_STATUS_TEST_COMPLETE:
    {

      NSNumber *reslut = [param objectForKey:PARAM_TEST_RESULT_VALUE];
      NSString *title = [BloodTester formatValue:[reslut floatValue]];
      hintText = [NSString stringWithFormat:@"Result:%@", title];
    }
    break;

    case TEST_STATUS_NEED_CALIBRATION:
    hintText = @"The glucose meter need to be calibrated";
    
    break;

    case TEST_STATUS_LOW_POWER:
    hintText = @"The power of battery is low";
    
    break;

    case TEST_STATUS_CHECK_ERROR:
    hintText = @"Conmunicating failed";
    
    break;

    case TEST_STATUS_VOLTAGE_INFO:
    {
    }
    break;

    case TEST_STATUS_TEMPERATURE_INFO:
    {
    }
    break;

    case TEST_STATUS_UNKNOW_CAUSE_ERROR:
    hintText = @"Unkown error";
    
    break;

    case TEST_STATUS_TIME_OUT_DEVICE_SLEEP:
    {
      hintText = @"The glucose meter is sleeping";
    }
    break;

    case TEST_STATUS_TEMPERATURE_LOW_ERROR:
    hintText = @"The temperature of glucose meter is too low.";
    
    break;

    case TEST_STATUS_TEMPERATURE_HIGH_ERROR:
    hintText = @"The temperature of glucose meter is too high.";
    
    break;

    case TEST_STATUS_TEST_TIMEOUT:
    {
      hintText = @"Testing timeout";
    }
    break;

    case TEST_STATUS_TIMEOUT_UPDATE:
    {
      NSNumber *timeout = [param objectForKey:@"timeout"];

      hintText = [NSString stringWithFormat:@"The device will into sleep after：%@", timeout];
    }
    break;
    
    default:
    break;
  }
  
  [self sendEventWithName:kBloodTesterModule body:@{
                                                    @"status": @(status),
                                                    @"hintText": hintText
                                                    }];
  
}

@end
