'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    async index() {
        this.ctx.body = 'hi, big screen';
    }

    async getStatus() {
        this.ctx.body = await this.ctx.service.store.get();
    }

    async notify() {
        const { type } = this.ctx.query;

        let code = 501,
            body = '缺少参数type，或参数无效！';

        switch (type) {

            case '0':
                code = 200;
                body = await this.ctx.service.store.set('water', false);
                break;

            case '2':
                code = 200;
                body = await this.ctx.service.store.set('water', true);
                break;

        }

        this.ctx.body = {
            header: {
                code
            },
            body
        };
    }

    async update() {
        const { name, value } = this.ctx.request.body;

        this.ctx.body = await this.ctx.service.store.set(name, value);
    }

    async setAnimation() {
        let { type } = this.ctx.request.body;

        type = parseInt(type, 10);

        if (!(type > 0 && type < 68)) {
            type = 32;
        }

        this.ctx.body = await this.ctx.service.store.set('animation', type);
    }

    async proxyPage() {
        await this.ctx.render('proxy.ejs', {api: this.config.URI.xiaoanSocketAPI});
    }

    async updatePage() {
        await this.ctx.render('update.ejs');
    }

    async screenPage() {
        await this.ctx.render('screen.ejs');
    }

    async subScreenPage() {
        await this.ctx.render('subScreen.ejs');
    }

}


module.exports = HomeController;
