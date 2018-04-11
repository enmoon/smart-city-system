'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    //config.keys = appInfo.name + '_BigScreen';

    // add your config here
    config.middleware = [];

    config.view = {
        mapping: {
            '.ejs': 'ejs'
        }
    };

    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
    }


    config.URI = {
        xiaoanSocketAPI: 'http://122.229.31.129:8088',
        xiaoanSocketProxyPage: 'http://127.0.0.1:3389/proxy',
        turuanBusMsgAPI: 'http://192.168.7.251:8009/waterHandler.ashx',
        fangdaLightAPI: 'http://192.168.7.41:8866/api/json?cmd=screen&ctrl=play-scene&version=1&lang=zh_CN'
    }
    

    return config;
};
