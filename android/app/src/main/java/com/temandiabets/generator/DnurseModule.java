package com.temandiabets.generator;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.dnurse.DnurseDevTestDef.DnurseConstant;
import com.dnurse.DnurseDevTestDef.IMeasureDataResultCallback;
import com.dnurse.exttestlib.DnurseDeviceTest;
import com.facebook.react.bridge.ReactMethod;

import android.os.Handler;
import android.os.Looper;
import android.util.SparseArray;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

/**
 * Created by arfanizar on 14/01/18.
 */

public class DnurseModule extends ReactContextBaseJavaModule {
    private Promise mPickerPromise;
    static private DnurseDeviceTest m_deviceTest;
    private Handler handler = new Handler(Looper.getMainLooper());
    private int m_arg0;
    private int m_arg1;
    private int mDnurseState = DnurseConstant.NOT_INSERTED;
    private float mTestResult;
    private String mDeviceSN;
    private Calendar mTime;
    private byte mAccuracy;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener();

    public DnurseModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "DnurseModule";
    }

    IMeasureDataResultCallback iMeasureDataResultCallback = new IMeasureDataResultCallback() {

        @Override
        public void onSuccess(SparseArray arg0) {
            // TODO Auto-generated method stub
            mTestResult = (Float) arg0.get(DnurseConstant.DATA_VALUE);
            mTime = Calendar.getInstance();
            mTime.setTimeInMillis((Long) arg0.get(DnurseConstant.DATA_DATETIME));
            mDeviceSN = (String) arg0.get(DnurseConstant.DEVICE_SN);
            mAccuracy = (Byte)arg0.get(DnurseConstant.DATA_ACCURACY, (byte)0);
            handler.post(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(getReactApplicationContext(), "success", Toast.LENGTH_SHORT).show();
                }
            });
        }

        @Override
        public void onMeasuring(int arg0, int arg1) {
            // TODO Auto-generated method stub
            m_arg0 = arg0;
            m_arg1 = arg1;
            handler.post(usRunnable);
            //Toast.makeText(getReactApplicationContext(), "measuring", Toast.LENGTH_SHORT).show();
        }
    };

    Runnable usRunnable = new Runnable() {

        @Override
        public void run() {
            // TODO Auto-generated method stub
            mDnurseState = m_arg0;
            // Change wakeup button state
            if(mDnurseState != DnurseConstant.NOT_INSERTED
                    && mDnurseState != DnurseConstant.COMMUNICATING
                    && mDnurseState != DnurseConstant.DEVICE_RECOGNIZING
                    && mDnurseState != DnurseConstant.DEVICE_RECOGNIZED
                    && mDnurseState != DnurseConstant.TEST_PAPER_INSERTED
                    && mDnurseState != DnurseConstant.OLD_TEST_PAPER_INSERTED
                    && mDnurseState != DnurseConstant.TEST_PAPER_REMOVED
                    && mDnurseState != DnurseConstant.START_TEST
                    && mDnurseState != DnurseConstant.TEST_FINISH) {
                //Toast.makeText(getReactApplicationContext(), "active", Toast.LENGTH_SHORT).show();
            } else {
                //Toast.makeText(getReactApplicationContext(), "not active", Toast.LENGTH_SHORT).show();
            }

            switch(m_arg0) {
                case DnurseConstant.NOT_INSERTED:
                    Toast.makeText(getReactApplicationContext(), "not insterted", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.COMMUNICATING:
                    Toast.makeText(getReactApplicationContext(), "communicating", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.DEVICE_RECOGNIZING:
                    Toast.makeText(getReactApplicationContext(), "recognizing", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.DEVICE_RECOGNIZED:
                    Toast.makeText(getReactApplicationContext(), "recognized", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.TEST_PAPER_INSERTED:
                    Toast.makeText(getReactApplicationContext(), "test paper inserted", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.OLD_TEST_PAPER_INSERTED:
                    Toast.makeText(getReactApplicationContext(), "test paper has been used", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.TEST_PAPER_REMOVED:
                    Toast.makeText(getReactApplicationContext(), "test paper used", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.START_TEST:
                    Toast.makeText(getReactApplicationContext(), "Test Start", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.TEST_FINISH:
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
                    String t = format.format(mTime.getTime());
                    if(DnurseConstant.isLowValue(mTestResult)) {
			  mPickerPromise.resolve(String.format("%.2f", mTestResult));
//                        mInfo.setText(String.format(getString(R.string.test_finished), t, "LOW", mDeviceSN));
                    } else if(DnurseConstant.isHighValue(mTestResult)) {
			  mPickerPromise.resolve(String.format("%.2f", mTestResult));
//                        mInfo.setText(String.format(getString(R.string.test_finished), t, "HIGH", mDeviceSN));
                    } else {
                        if(mAccuracy == 2) {
			      mPickerPromise.resolve(String.format("%.2f", mTestResult));
//                            mInfo.setText(t + "\n血糖" + String.format("%.2f", mTestResult) + "mmol/L\nSN: " + mDeviceSN);
                        } else {
			      mPickerPromise.resolve(String.format("%.2f", mTestResult));
//                            mInfo.setText(t + "\n血糖" + String.format("%.1f", mTestResult) + "mmol/L\nSN: " + mDeviceSN);
                        }
                    }
                    Toast.makeText(getReactApplicationContext(), "finished", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.DEVICE_SLEEP:
                    Toast.makeText(getReactApplicationContext(), "device sleep", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_VOLTAGE_LOW:
                    Toast.makeText(getReactApplicationContext(), "voltage low", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_NON_CALIBRATE:
                    Toast.makeText(getReactApplicationContext(), "not calibrate", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_TEMPERATURE_LOW:
                    Toast.makeText(getReactApplicationContext(), "low temperature", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_TEMPERATURE_HIGH:
                    Toast.makeText(getReactApplicationContext(), "high temperature", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_PLAY_AUDIO:
                    Toast.makeText(getReactApplicationContext(), "play audio failed", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_RECORD_AUDIO:
                    Toast.makeText(getReactApplicationContext(), "record audio failed", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_RECOGNIZE:
                    Toast.makeText(getReactApplicationContext(), "cannot recognize", Toast.LENGTH_SHORT).show();
                    break;
                case DnurseConstant.ERR_TIME_OUT:
                    Toast.makeText(getReactApplicationContext(), "timed out", Toast.LENGTH_SHORT).show();
                    break;
            }
        }
    };

    @ReactMethod
    public void openRequest(String request, final Promise promise) {
        mPickerPromise = promise;
        switch (request) {
            case "null":
                if(m_deviceTest == null) {
                    m_deviceTest = new DnurseDeviceTest(getReactApplicationContext());
                } else {
                    Toast.makeText(getReactApplicationContext(), "null device", Toast.LENGTH_SHORT).show();
                }
	        /* Start test */
                m_deviceTest.startTest(iMeasureDataResultCallback);

                break;
            case "wakeup":
                if(m_deviceTest != null) {
				/* Stop test */
                    m_deviceTest.stopTest();
                    m_deviceTest = null;
		        /* Start test */
                    m_deviceTest = new DnurseDeviceTest(getReactApplicationContext());
                    m_deviceTest.startTest(iMeasureDataResultCallback);
                } else {
                    Toast.makeText(getReactApplicationContext(), "no device", Toast.LENGTH_SHORT).show();
                }
                break;
            case "stop":
	        /* Stop test */
                if(m_deviceTest != null) {
                    m_deviceTest.stopTest();
                    Toast.makeText(getReactApplicationContext(), "lib not start", Toast.LENGTH_SHORT).show();
                }
                Toast.makeText(getReactApplicationContext(), "stop", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
