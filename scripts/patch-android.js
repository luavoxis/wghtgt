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
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        }
    }
}
`;

if (!fs.existsSync(mainPath)) {
  console.error("MainActivity not found:", mainPath);
  process.exit(1);
}

const current = fs.readFileSync(mainPath, "utf8");
if (!current.includes("setMediaPlaybackRequiresUserGesture")) {
  fs.writeFileSync(mainPath, desired);
  console.log("Patched MainActivity for autoplay.");
} else {
  console.log("MainActivity already patched.");
}
