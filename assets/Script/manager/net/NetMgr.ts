import { Common } from "../../common/Common";
import { EgrManager } from "../EgrManager";

const { ccclass, property } = cc._decorator;

var State = {
    Disconnected: 0, // 断开连接
    Connecting: 1, // 正在连接
    Connected: 2, // 已经连接;
};

@ccclass("NetMgr")
export class NetMgr extends cc.Component {

    public static Instance: NetMgr = null;

    private url:string = 'ws://192.168.1.45:18500';


    // /**
    //  * 测试服
    //  */
    // private url: string = "wss://testgameslo1.ydgame.cc";

    private state: number;

    private sock: WebSocket = null;

    private isWhether: boolean = true;

    onLoad() {
        if(NetMgr.Instance === null) {
            NetMgr.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        this.state = State.Disconnected;
    }

    sendPing() {
        if(this.sock) {
            this.sock.send('pong');
        }
    }

    _on_opened(event) {
        this.state = State.Connected;
        console.log('connect to server: ' + this.url + 'sucess!');
        if(this.isWhether) {
            // EgrManager.Instance.dispatch_event('reconnect_sucess', event.data);
        }
        // this.schedule(this.sendPing, 15);
    }

    _onLogin(event) {
        // EgrManager.Instance.dispatch_event('net_message', event.data);
    }

    /**
     * 手动断开
     */
    manualdisconnection() {
        this.isWhether = false;
        if(this.state === State.Connected) {
            if(this.sock !== null) {
                this.sock.close();
                // this.sock = null;
            }
        }
        this.unschedule(this.sendPing);
    }

    close_socket() {
        // EgrManager.Instance.dispatch_event('reconnection', 1);
        if(this.state == State.Connected) {
            if(this.sock !== null) {
                this.sock.close();
            }
        }
        this.state = State.Disconnected;
        // if(this.isWhether) {
        //     this.scheduleOnce(this.login, 0.1)
        // }
        this.unschedule(this.sendPing);
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

    _on_socket_close(event) {
        // if(this.isWhether) {
            this.close_socket();
        // }
    }

    _on_socket_err(event) {
        // if(this.isWhether) {
            this.close_socket();
        // }
    }

    login() {
        if(this.sock) {
            this.sock.close();
            this.sock = null;
        }
        this.state = State.Connecting;
        this.sock = new WebSocket(this.url + '/?game_id=' + Common.game_id + '&token=' + Common.token);
        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._onLogin.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
    }

    onBetting(money: number) {
        // let is_extra_bet = 0;
        // if(isDouble) {
        //     is_extra_bet = 1;
        // }
        let data = {
            bet_amount: money,
        }
        let gameData = {
            type: 'bet',
            data: data
        }
        this.sock.send(JSON.stringify(gameData));
    }

    onCancelbetting() {
        let data = {
            gametype:"cancelbetting",
        }
        this.sock.send(JSON.stringify(data));
    }

    onCancelbatchbetting(order: number) {
        let data = {
            gametype:"cancelbatchbetting",
            order: order

        }
        this.sock.send(JSON.stringify(data));
    }

    /**
     * 查询余额
     */
    onGetAvailableamount() {
        let data = {
            gametype: 'getye'
        }
        this.sock.send(JSON.stringify(data));
    }

    /**
     * 查询历史投注记录
     */
    onQuery_bettingrecord(startTime: number = 0, endTime: number = 0) {
        let data;
        if(startTime != 0) {
            data = {
                gametype: 'query_bettingrecordlist',
                startTime: startTime,
                endTime: endTime
            }
        }
        else {
            data = {
                gametype: 'query_bettingrecordlist',
            }
        }
        this.sock.send(JSON.stringify(data));
    }

    /**
     * 查询历史投注记录
     */
    onQuery_bettingrecordById(idnumber:string) {
        let data = {
            gametype: 'query_bettingrecordlist',
            idnumber: idnumber
        }
        this.sock.send(JSON.stringify(data));
    }

    onQuery_bettingrecordDesic(period:string){
        let data = {
            gametype: 'query_bettingrecord',
            period: period
        }
        this.sock.send(JSON.stringify(data));
    }

    onSetlang(lang:string) {
        let data = {
            gametype: 'setlang',
            lang: lang
        }
        this.sock.send(JSON.stringify(data));
    }

    /**
     * 查询游戏配置
     */
    onGameParameter() {
        let data = {
            gametype: 'query_game_parameter'
        }
        this.sock.send(JSON.stringify(data));
    }

    onBatchbetting(dragonmoney: number, tigermoney: number, andmoney:number) {
        let data = {
            gametype: 'batchbetting',
            dragonmoney: dragonmoney,
            tigermoney: tigermoney,
            andmoney: andmoney
        }
        this.sock.send(JSON.stringify(data));
    }
}