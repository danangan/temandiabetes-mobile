package com.temandiabetes.android;

import android.content.SharedPreferences;
import android.net.Uri;
import android.content.Intent;

//crashlytics
import com.crashlytics.android.Crashlytics;
// facebook sdk
import android.os.Bundle;
import io.fabric.sdk.android.Fabric;
// slashscreen
import android.view.View;
import android.widget.Toast;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    public static String BUNDLE_INTENT = "BUNDLE_INTENT";

    protected String getMainComponentName() {
        return "Teman Diabetes";
    }

    @Override
    public View createSplashLayout() {
        return new View(this);   // <====== TO AVOID WHITE BACKGROUND
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Fabric.with(this, new Crashlytics());
        // ATTENTION: This was auto-generated to handle app links.
        Intent appLinkIntent = getIntent();
        String appLinkAction = appLinkIntent.getAction();
        Uri appLinkData = appLinkIntent.getData();

        SharedPreferences.Editor editor = getSharedPreferences(BUNDLE_INTENT, MODE_PRIVATE).edit();
        editor.putString("NoPolis", appLinkIntent.getStringExtra("NoPolis"));
        editor.putString("Nama", appLinkIntent.getStringExtra("Nama"));
        editor.putString("MemberCode", appLinkIntent.getStringExtra("MemberCode"));
        editor.putString("MemberType", appLinkIntent.getStringExtra("MemberType"));
        editor.apply();

        System.out.println(appLinkIntent.getExtras());
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}

