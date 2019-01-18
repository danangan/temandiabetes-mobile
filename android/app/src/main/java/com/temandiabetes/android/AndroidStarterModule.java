package com.temandiabetes.android;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;

public class AndroidStarterModule extends ReactContextBaseJavaModule {
    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    AndroidStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    void getBundleIntent(@Nonnull Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            SharedPreferences prefs = activity.getSharedPreferences(MainActivity.BUNDLE_INTENT, activity.MODE_PRIVATE);

            try {
                WritableMap map = Arguments.createMap();

                map.putString("Nama", prefs.getString("Nama", null));
                map.putString("MemberType", prefs.getString("MemberType", null));
                map.putString("ClientID", prefs.getString("ClientID", null));
                
                promise.resolve(map);

                prefs.edit().clear().apply();

            } catch (Error e) {
                promise.reject(e);
            }

        }
    }

}