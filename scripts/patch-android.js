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
const bgColorPath = path.join(
  root,
  "android",
  "app",
  "src",
  "main",
  "res",
  "values",
  "ic_launcher_background.xml"
);
const iconsDir = path.join(root, "assets", "android-icons");
const resDir = path.join(root, "android", "app", "src", "main", "res");

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
  if (styles.includes('android:background">@drawable/splash')) {
    styles = styles.replace(
      'android:background">@drawable/splash',
      'android:background">@android:color/black'
    );
  }
  fs.writeFileSync(stylesPath, styles);
  console.log("Patched styles.xml for fullscreen splash theme.");
}

if (fs.existsSync(bgColorPath)) {
  let bg = fs.readFileSync(bgColorPath, "utf8");
  if (!bg.includes("#000000")) {
    bg = bg.replace("#FFFFFF", "#000000");
    fs.writeFileSync(bgColorPath, bg);
    console.log("Patched launcher background color to black.");
  }
}

const densities = ["mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"];
if (fs.existsSync(iconsDir)) {
  densities.forEach((d) => {
    ["ic_launcher", "ic_launcher_round", "ic_launcher_foreground"].forEach((name) => {
      const srcIcon = path.join(iconsDir, `${name}-${d}.png`);
      const destIcon = path.join(resDir, `mipmap-${d}`, `${name}.png`);
      if (fs.existsSync(srcIcon)) {
        fs.copyFileSync(srcIcon, destIcon);
      }
    });
  });
  console.log("Patched launcher icons from favicon.");
}
