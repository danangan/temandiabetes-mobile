package com.temandiabetes.android;

import android.annotation.SuppressLint;
import android.content.Intent;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import cl.json.RNSharePackage;
import com.adjust.nativemodule.AdjustPackage;

import com.reactnativenavigation.controllers.ActivityCallbacks;
//start Dnurse package
import com.temandiabetes.generator.*;
//end Dnurse package
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    @SuppressLint("MissingPermission")
    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new ImagePickerPackage(),
            new ReactNativeConfigPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new FIRMessagingPackage(),
            new DnursePackage(),
            new RNSharePackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new AndroidStarterPackage(),
            new AdjustPackage()

        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public void onCreate() {
        super.onCreate();
        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                mCallbackManager.onActivityResult(requestCode, resultCode, data);
            }
        });
        AppEventsLogger.activateApp(this);
        SoLoader.init(this, /* native exopackage */ false);
    }
}
