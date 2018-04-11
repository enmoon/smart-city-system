'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.screenPage);
    router.get('/getStatus', controller.home.getStatus);
    router.get('/notify', controller.home.notify);

    router.post('/setAnimation', controller.home.setAnimation);
    router.post('/update', controller.home.update);

    router.get('/set', controller.home.updatePage);
    router.get('/screen', controller.home.screenPage);
    router.get('/subScreen', controller.home.subScreenPage);
    router.get('/proxy', controller.home.proxyPage);
};
