//
//  DNUReactNativeManager.h
//  DnurseRNDemo
//
//  Created by HertzWang on 2018/9/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>

@class BloodTester;

NS_ASSUME_NONNULL_BEGIN

@interface DNUReactNativeManager : RCTEventEmitter <RCTBridgeModule>

+ (instancetype)shared;

@property (nonatomic, weak) BloodTester *bloodTester;

@end

NS_ASSUME_NONNULL_END
