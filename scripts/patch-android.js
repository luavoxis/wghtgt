const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const mainPath = path.join(
  root,
  "android",
  "app",
  "src",
  "main",
  "java",
  "com",
  "wghtgt",
  "app",
  "MainActivity.java"
);
const stylesPath = path.join(
  root,
  "android",
  "app",
  "src",
  "main",
  "res",
  "values",
  "styles.xml"
);

const desired = `package com.wghtgt.app;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private void hideSystemBars() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(
                getWindow(), getWindow().getDecorView());
        if (controller != null) {
            controller.setSystemBarsBehavior(
                    WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            controller.hide(WindowInsetsCompat.Type.systemBars());
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hideSystemBars();
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemBars();
        }
    }
}
`;

if (!fs.existsSync(mainPath)) {
  console.error("MainActivity not found:", mainPath);
  process.exit(1);
}

const current = fs.readFileSync(mainPath, "utf8");
if (current.trim() !== desired.trim()) {
  fs.writeFileSync(mainPath, desired);
  console.log("Patched MainActivity for fullscreen + autoplay.");
} else {
  console.log("MainActivity already patched.");
}

if (fs.existsSync(stylesPath)) {
  let styles = fs.readFileSync(stylesPath, "utf8");
  const noActionBarTheme = `<item name="android:windowFullscreen">true</item>`;
  const launchTheme = `<item name="android:windowFullscreen">true</item>
        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>`;
  if (!styles.includes("android:windowFullscreen")) {
    styles = styles.replace(
      `<style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">`,
      `<style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">\n        ${noActionBarTheme}`
    );
  }
  if (!styles.includes("windowLayoutInDisplayCutoutMode")) {
    styles = styles.replace(
      `<style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">`,
      `<style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">\n        ${launchTheme}`
    );
  }
  fs.writeFileSync(stylesPath, styles);
  console.log("Patched styles.xml for fullscreen splash theme.");
}
