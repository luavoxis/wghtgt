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

const desired = `package com.wghtgt.app;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private void hideSystemBars() {
        View decorView = getWindow().getDecorView();
        int flags = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN;
        decorView.setSystemUiVisibility(flags);
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
