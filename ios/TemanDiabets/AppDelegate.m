/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCCManager.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import "RNGoogleSignin.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import "RNFIRMessaging.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <React/RCTLinkingManager.h>
#import "BloodTester.h"

@interface AppDelegate ()
@property (nonatomic, strong) BloodTester *bloodTester;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  NSURL *jsCodeLocation;

//FACEBOOK CONFIG
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  #ifdef DEBUG
    //  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios&dev=true"];
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  
  //  Config firebase
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  
//==============BEGIN CRASHLYTICS==========
  [Fabric with:@[[Crashlytics class]]];
//==============END CRASHLYTICS==========
  
  return YES;
}

//===================================BEGIN AUTH CONFIGURATION===============================================
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//  handle facebook method
  BOOL handledFacebook = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                    ];
// Setup Google method
  BOOL handleGoogle = [RNGoogleSignin application:application
                                          openURL:url
                                sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                       annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                       ];
  
//  deep link
  BOOL handleDeepLink = [RCTLinkingManager application:application
                                               openURL:url
                                     sourceApplication:options[UIApplicationOpenURLOptionsAnnotationKey]
                                            annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                         ];
  // Add any custom logic here.
  return handleDeepLink || handledFacebook || handleGoogle;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}
//====================================END AUTH CONFIGURATION=================================================

//===================================BEGIN NOTIFICATION CONFIGURATION========================================
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
  [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}

//You can skip this method if you don't want to use local notification
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [RNFIRMessaging didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
//====================================BEGIN NOTIFICATION CONFIGURATION==========================================

#pragma mark - setup blood tester
- (BloodTester *)bloodTester {
  if (_bloodTester) {
    return _bloodTester;
  }
  _bloodTester = [[BloodTester alloc] init];
  [_bloodTester setupAudio];
  _bloodTester.ignoreTypeCheck = YES; // default is NO, need to set testType.
  return _bloodTester;
}
@end
