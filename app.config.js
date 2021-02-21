import 'dotenv/config';

export default {
  "name": "react-native-ex",
  "slug": "react-native-ex",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  extra: {
    env: {
      APOLLO_URI: process.env.APOLLO_URI
    }
  }
};