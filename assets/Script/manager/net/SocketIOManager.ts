const {ccclass, property} = cc._decorator;
import * as io from 'socket.io-client/dist/socket.io.js';

import { Common } from '../../common/Common';
import { EgrManager } from '../EgrManager';

@ccclass
export default class SocketIOManager extends cc.Component{

    public static Instance: SocketIOManager = null;


    /**
     * 陈伟膳服务器
     */
    // private url:string = 'ws://192.168.1.2:9502';

    /**
     * 刘总服务器
     */
    // private url:string = 'ws://192.168.1.97:9502'

    /**
     * 测试服
     */
    private url:string = 'ws://13.232.153.67:9502'; 


    private socket: any

    onLoad() {
        if(SocketIOManager.Instance === null) {
            SocketIOManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        // this.state = State.Disconnected;
    }

    // private socket: any;

    start(): void {
        
    }

    connectToServer() {
        // socket = io('ws://localhost:9502/game?token=' + token, {transports: ["websocket"]});
        this.socket = io(this.url + '/game?token=' + Common.token, {transports: ["websocket"]})
        this.socket.on('connect', this._on_opened.bind(this));
        this.socket.on('bet', this._on_Message.bind(this, 'bet'));
        this.socket.on('userinfo', this._on_Message.bind(this, 'userinfo'));
        this.socket.on('bet-history', this._on_Message.bind(this, 'bet-history')) //监听历史投注记录
        this.socket.on('disconnect', this._on_Disconnect.bind(this));
    }

    _on_opened(event) {
        this.unschedule(this.showTip);
        console.log('connect to server: ' + this.url + 'sucess!');
        // if(this.isWhether) {
        //     EgrManager.Instance.dispatch_event('reconnect_sucess', event.data);
        // }
        // this.schedule(this.sendPing, 15);
    }

    _on_Message(uname, data) {
        // console.log('Received message from server:', uname);
        EgrManager.Instance.dispatch_event('net_message', uname, data);
    }

    _on_Disconnect(event) {
        this.schedule(this.showTip, 5);
        // Common.showTipView('Unable to connect to the network\nTry continuing to connect?', this.backhome.bind(this));
    }

    private showTip() {
        this.unschedule(this.showTip);
        Common.showTipView('Unable to connect to the network\nTry continuing to connect?', this.backhome.bind(this));
    }

    backhome() {
        if(Common.homeUrl != '') {
            window.location.href = Common.homeUrl;
        }
        else {
            location.reload();
        }
    }

    /**
     * 投注
     * @param money 
     */
    onBetting(money: number) {
        let data = {
            amount: money,
        }
        this.socket.emit('bet', data, ((result)=>{
            if(result.code == 0) {
                EgrManager.Instance.dispatch_event('bet', '', result.data);
            }
            
        }))
        //this.sock.send(JSON.stringify(gameData));
    }

    /**
     * 查询历史投注记录
     */
    onQuery_bettingrecord(startTime: number = 0, endTime: number = 0, order_no: string = null, page: number = 1) {
        if(startTime == 0) {
            endTime = Math.floor(new Date().getTime() / 1000);
            startTime = endTime - 900;
        }
        let data:any;
        if(order_no) {
            data = {
                page: page,
                timestamp: [startTime, endTime],
                order_no: order_no
            }
        }
        else {
            data = {
                page: page,
                timestamp: [startTime, endTime],
            }
        }
        this.socket.emit('bet-history', data, ((result)=>{
            if(result.code == 0) {
                EgrManager.Instance.dispatch_event('bet-history', '', result.data);
            }
        }))
    }


}