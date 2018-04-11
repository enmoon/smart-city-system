const Service = require('egg').Service;
const Http = require('urllib').request;
const State = require('../lib/state');
const Fire = require('../lib/fire');
const Config = require('../../config/config.default');

const state = new State();
const fire = new Fire();
const URI = Config().URI;

/**
 * 
 * （图软公交系统）消息通知
 * 
 */
const Bus = (status) => {
    const url = URI.turuanBusMsgAPI,
        params = {
            method: 'GET',
            timeout: 30000,
            data: {
                status,
                addr: '浙江省下城区浙江杭州延安路530号',
                company: '浙江银泰百货有限公司'
            }
        }

    Http(url, params)
        .then(res => {
            const data = res.data.toString();

            if (data) {
                console.log('（图软公交系统）通知成功！');
            }
        })
        .catch(err => {
            console.error('（图软公交系统）通知失败！', err);
        });
}

/**
 * 
 * （放大路灯系统）消息通知
 * 
 */
const Light = (scene, content) => {
    const url = URI.fangdaLightAPI,
        params = {
            method: 'POST',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                scene,
                content
            }
        };

    Http(url, params)
        .then(res => {
            const data = JSON.parse(res.data.toString().replace(/.*\|/g, ''));

            if (data.status == 1) {
                console.log('（方大路灯系统）通知成功！');
            } else {
                console.error('（方大路灯系统）通知失败！', data.message);
            }
        })
        .catch(err => {
            console.error('（方大路灯系统）通知失败！', err);
        });
}

state
    .on('fire|true', () => {
        Bus(4);
        Light(4, '路更上和强加里路口的XXX商城发生火灾，前面路段实施交通管制，请过往车辆和行人绕行，注意安全。');
    })
    .on('fire|false', () => {
        Bus(5);
        Light(5, '路更上和强加里路口的XXX商城火情处置完毕，交通管制解除，谢谢！');
    })
    .on('water|true', () => {
        Bus(1);
        Light(1, '董家弄村路口发生爆管事件，目前正在抢修，公交68路绕道欣鸿路，请过往车辆和行人绕行，注意安全。');
    })
    .on('water|false', () => {
        Bus(2);
        Light(2, '董家弄村路口爆管事件处置完毕，公交68路恢复正常路线行驶，谢谢！');
    });

fire.init({
    url: URI.xiaoanSocketProxyPage,
    handler: () =>{
        console.log('消防安全报警9999999999999999999999999999999999999999999999999999999999');
        state.set('fire', true);
    } 
});


class StoreService extends Service {
    async get() {
        return state.get();
    }

    async set(name, value) {
        const { fire, water } = state.get(),
            val = value.toString() === 'true';

        switch (name) {

            case 'fire':
                val && water && state.set('water', false);
                break;

            case 'water':
                val && fire && state.set('fire', false);
                break;

            case 'rest':
                fire && state.set('fire', false);
                water && state.set('water', false);
                break;

            default:
                return state.set(name, value);
        }

        return state.setStatus(name, val);
    }
}

module.exports = StoreService;