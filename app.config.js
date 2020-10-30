import 'dotenv/config';

export default {
    name: 'GARBAGETIME.APP',
    description: 'GARBAGETIME.APP',
    slug: 'garbagetime-app',
    icon: './assets/icon.png',
    version: '0.0.5',
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    orientation: 'portrait',
    extra: {
        API_URI: process.env.API_URI,
    },
    android: {
        package: 'com.garbagetime_app',
        versionCode: 5,
        permissions: [],
        splash: {
            backgroundColor: '#000000',
        },
    },
    ios: {
        bundleIdentifier: 'com.garbagetime-app',
        buildNumber: '0.0.5',
        supportsTablet: true,
        splash: {
            backgroundColor: '#000000',
        },
    },
};
