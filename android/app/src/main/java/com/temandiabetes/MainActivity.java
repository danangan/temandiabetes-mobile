package com.temandiabetes.android;

import android.net.Uri;
import android.content.Intent;

//crashlytics
import com.crashlytics.android.Crashlytics;
// facebook sdk
import android.os.Bundle;
import io.fabric.sdk.android.Fabric;
// slashscreen
import android.view.View;
import com.reactnativenavigation.controllers.SplashActivity;


public class MainActivity extends SplashActivity {
    @Override
    public View createSplashLayout() {
        return new View(this);   // <====== TO AVOID WHITE BACKGROUND
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
        // ATTENTION: This was auto-generated to handle app links.
        Intent appLinkIntent = getIntent();
        String appLinkAction = appLinkIntent.getAction();
        Uri appLinkData = appLinkIntent.getData();
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}

