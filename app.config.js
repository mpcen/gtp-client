import 'dotenv/config';

export default {
    extra: {
        API_URI: process.env.API_URI,
    },
    android: {
        package: 'com.garbagetimeapp.client',
    },
    name: 'GARBAGETIME.APP',
    slug: 'garbagetime-app',
    icon: './assets/icon.png',
    version: '0.0.1',
    orientation: 'portrait',
};
