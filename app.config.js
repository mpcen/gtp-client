import 'dotenv/config';

export default {
    name: 'GARBAGETIME.APP',
    slug: 'garbagetime-app',
    icon: './assets/icon.png',
    version: '0.0.3',
    orientation: 'portrait',
    extra: {
        API_URI: process.env.API_URI,
    },
    android: {
        package: 'com.garbagetime_app',
        versionCode: 3,
        permissions: [],
    },
    ios: {
        bundleIdentifier: 'com.garbagetime-app',
        buildNumber: '0.0.3',
        supportsTablet: true,
    },
};
