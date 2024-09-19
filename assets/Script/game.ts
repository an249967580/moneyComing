import { BettingData, Common } from "./common/Common";
import { EgrManager } from "./manager/EgrManager";
import { SoundManager } from "./manager/SoundManager";
import { NetMgr } from "./manager/net/NetMgr";
import SocketIOManager from "./manager/net/SocketIOManager";
import multipleItem from "./ui/multipleItem";
import slotItem from "./ui/slotItem";
import PromiseUtil from "./utils/PromiseUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    playGame: cc.Node = null;

    @property(cc.Node)
    gameNode: cc.Node = null;

    @property(cc.Node)
    bottomNode: cc.Node = null;

    @property(sp.Skeleton)
    startGameAni: sp.Skeleton = null;

    @property(cc.Node)
    zhuangpanNode: cc.Node = null;

    @property(cc.Label)
    bettingLabel: cc.Label = null;

    @property(cc.Label)
    balanceLabel: cc.Label = null;

    @property(cc.Label)
    winNumLabel: cc.Label = null;

    @property(cc.Node)
    lockNode: cc.Node = null;

    @property(sp.Skeleton)
    lockAni: sp.Skeleton = null;

    @property(cc.Node)
    lockSolt: cc.Node = null;

    @property(sp.Skeleton)
    chainAni: sp.Skeleton = null;

    // @property(cc.Node)
    // chain_item: cc.Node = null;

    // @property(cc.Node)
    // chain_item1: cc.Node = null;

    @property(cc.Node)
    betSetView: cc.Node = null;

    @property(cc.Node)
    betImage: cc.Node = null;

    @property(cc.Node)
    titleNode: cc.Node = null;

    @property(cc.Node)
    select_10: cc.Node = null;

    @property(cc.Node)
    select_50: cc.Node = null;

    @property(cc.Button)
    menuBtn: cc.Button = null;

    @property(cc.Node)
    menuView: cc.Node = null;

    @property(cc.Label)
    tipLabel: cc.Label = null;

    @property(cc.Label)
    tipLabel_1: cc.Label = null;

    @property(cc.Node)
    settingView: cc.Node = null;

    @property(cc.Button)
    autoBtn: cc.Button = null;

    @property(cc.Node)
    showViewNode: cc.Node = null;

    @property(cc.Node)
    showTipNode: cc.Node = null;

    @property(cc.Node)
    roulettebg_green: cc.Node = null;

    @property(cc.Node)
    roulettebg_red: cc.Node = null;

    @property(cc.Node)
    iconBg_green: cc.Node = null;

    @property(cc.Node)
    iconBg_red: cc.Node = null;

    @property(cc.Node)
    slotItem: cc.Node = null;

    @property(cc.Node)
    slotItemNode_1: cc.Node = null;

    @property(cc.Node)
    slotItemNode_2: cc.Node = null;

    @property(cc.Node)
    slotItemNode_3: cc.Node = null;

    @property(cc.Node)
    multipleItem: cc.Node = null;

    @property(cc.Node)
    multipleItemNode: cc.Node = null;
   
    @property(cc.Toggle)
    turboSpin: cc.Toggle = null;

    @property(cc.Node)
    winBg: cc.Node = null;

    @property(sp.Skeleton)
    winAni: sp.Skeleton;

    @property(cc.Label)
    bigWinLabel: cc.Label = null;

    @property(cc.Node)
    bigAwardNode: cc.Node = null;

    @property(cc.Label)
    symbols_profitLabel: cc.Label = null;

    @property(cc.Label)
    special_profitLabel: cc.Label = null;

    @property(sp.Skeleton)
    all_respinEffect: sp.Skeleton = null;

    @property(sp.Skeleton)
    turnStartAni: sp.Skeleton = null;

    @property(sp.Skeleton)
    turnEndAni: sp.Skeleton = null;

    @property(sp.Skeleton)
    turnPlay: sp.Skeleton = null;

    @property(sp.Skeleton)
    turnPlayEnd: sp.Skeleton = null;

    @property(sp.Skeleton)
    moneySelectAni: sp.Skeleton = null;

    @property(cc.Label)
    autoCountLabel: cc.Label = null;

    @property(cc.AudioSource)
    musicNode: cc.AudioSource = null;

    @property(cc.AudioSource)
    soundNode: cc.AudioSource = null;

    @property(cc.AudioSource)
    soundNode1: cc.AudioSource = null;

    @property(cc.AudioSource)
    soundNode2: cc.AudioSource = null;

    @property(cc.Node)
    music: cc.Node = null;

    @property(sp.Skeleton)
    btnEffect: sp.Skeleton = null;

    @property(cc.Node)
    connectionNode: cc.Node = null;

    @property(cc.Label)
    orderidLabel: cc.Label = null;
    
    @property(cc.Node)
    light_effect: cc.Node = null;

    @property(cc.Node)
    light_effect1: cc.Node = null;

    @property(cc.ParticleSystem)
    money_1: cc.ParticleSystem = null;

    @property(cc.ParticleSystem)
    money_2: cc.ParticleSystem = null;

    @property(cc.ParticleSystem)
    money_3: cc.ParticleSystem = null;

    @property(cc.ParticleSystem)
    money_4: cc.ParticleSystem = null;

    @property(cc.ParticleSystem)
    turnStartParticle: cc.ParticleSystem = null;

    @property(cc.Node)
    starsNode: cc.Node = null;

    @property(cc.Node)
    starsAni: cc.Node = null;

    @property(cc.Node)
    starsDianAni: cc.Node = null;

    private soltItemReturn1: boolean = false;

    private soltItemReturn2: boolean = false;

    private soltItemReturn3: boolean = false;

    private multipleReturn: boolean = false;

    private turnStartAnimation: cc.Animation = null;

    private turnStartParticleAnimation: cc.Animation = null;

    private isPlay: boolean = true;

    private isRedPlay: boolean = false;

    private isShowSettingView: boolean = false;

    private isShowBetSetView: boolean = false;

    private betImageAtlas: any;

    private speed: number = 5;

    private betmoney: number = 10;

    private tipIndex = 1;

    private tipRollSpeed = 2;

    private isAutoBetting:boolean = false;

    private isPressing: boolean = false; // 是否正在长按
    private pressTime: number = 0; // 长按持续时间

    private slotItem_1 = [];

    private slotItem_2 = [];

    private slotItem_3 = [];

    private multipleItems = [];

    private isRolling: boolean = false;

    private isPlayAni: boolean = false;

    private isTurnPlay: boolean = false;

    private symbols = [];

    private special_symbols:string = ''

    private profit: number;

    private symbols_profit: number;

    private special_profit: number;

    private lucky = {multiplier: 0, amount: 0};

    private order_id:string = '';

    private isStartPlay: boolean = true;

    protected onLoad(): void {
        let a = this;
        cc.debug.setDisplayStats(false);
        Common.showViewNode = this.showViewNode;
        Common.showTipNode = this.showTipNode;
        SoundManager.musicSoure = this.musicNode.getComponent(cc.AudioSource);
        SoundManager.audioSoure = this.soundNode.getComponent(cc.AudioSource);
        SoundManager.girlSoure = this.soundNode1.getComponent(cc.AudioSource);
        SoundManager.clickSoure = this.soundNode2.getComponent(cc.AudioSource);
        SoundManager.play('back');
        this.node.addComponent(EgrManager);
        this.node.addComponent(SocketIOManager)
        this.node.addComponent(NetMgr);
        this.adjustLayout();
        let params = this.getQueryParam(window.location.href, 'token');
        let homeUrlParams = this.getHomeUrlParam(window.location.href, 'url');
        let gameIdParams = this.getGameIdParam(window.location.href, 'game_id');
        
        if(gameIdParams != '' || gameIdParams != null) {
            Common.game_id = gameIdParams;
        }
        if (params != '' || params != null) {
            Common.token = params;
            // NetMgr.Instance.login();
            SocketIOManager.Instance.connectToServer();
        }
        if (homeUrlParams != '' || homeUrlParams != null) {
            Common.homeUrl = homeUrlParams;
        }
        cc.loader.loadRes('atlas/bet', cc.SpriteAtlas, (err, atlas)=>{
            a.betImageAtlas = atlas;
            a.updateView();
        });

        this.money_1.stopSystem();
        this.money_2.stopSystem();
        this.money_3.stopSystem();
        this.money_4.stopSystem();
        this.winNumLabel.string = '₹ 0.00 ';
        // this.lockZhuangpan(true);
        this.rollTips();
        this.bottomNode.opacity = 0;
        let betmoney = cc.sys.localStorage.getItem('betmoney_3');
        if(betmoney != null) {
            this.betmoney = Number(betmoney)
        }
        else {
            this.betmoney = 10;
            cc.sys.localStorage.setItem('betmoney_3', 10)
        }
        this.bettingLabel.string = 'Bet' + Common.moneyStr + ' ' + this.betmoney.toLocaleString();
        if(this.betmoney == 50 || this.betmoney == 100) {
            Common.itemType = ['00', '0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'x10', 'all_respin', 'scatter_100'];
            Common.multipleArrServer = ['2', '5', '10', 'all_respin', 'scatter_red'];
        }
        else if(this.betmoney == 10) {
            Common.itemType = ['0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'x10', 'all_respin', 'scatter'];
            Common.multipleArrServer = ['2', '5', '10', 'all_respin', 'scatter_green'];
        }
        else if(this.betmoney == 5) {
            Common.itemType = ['0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'all_respin', 'scatter'];
            Common.multipleArrServer = ['2', '5', 'all_respin', 'scatter_green'];
        }
        else{
            Common.itemType = ['0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'all_respin'];
            Common.multipleArrServer = ['2', '5', 'all_respin'];
        }
        // cc.loader.loadRes('atlas/item', cc.SpriteAtlas, (err, atlas)=>{
        //     Common.item_icons.push(atlas);
            
        // });
        a.initSlotItem();
        EgrManager.Instance.add_event_listenner('net_message', this, this.onRecvData);
        EgrManager.Instance.add_event_listenner('bet', this, this.onRecvBetData);
        EgrManager.Instance.add_event_listenner('bet-history', this, this.onRecvBetHistoryData);
        EgrManager.Instance.add_event_listenner('AutoStart', this, this.onAutoStart);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this)
        this.menuBtn.node.on(cc.Node.EventType.TOUCH_MOVE, this.menuBtnMoveHandler, this);
        this.menuBtn.node.on(cc.Node.EventType.TOUCH_END, this.showMenuView, this);

        this.autoBtn.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.autoBtn.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.autoBtn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.winNumLabel.node.on('size-changed', this.onLabelSizeChange, this);
        this.playGame.active = true;

        this.btnEffect.setAnimation(0, 'animation', false);
        this.btnEffect.setCompleteListener(this.btnEffectComplete.bind(this));

        if ('onLine' in navigator) {
            if (navigator.onLine) {
                // 在线，尝试获取更具体的信号强度信息
                // @ts-ignore
                if (navigator.connection) {
                    // @ts-ignore
                    let networkInfo = navigator.connection;
                    if (networkInfo) {
                        let signalStrength = networkInfo.downlink; 
                        // console.log('下行速率', signalStrength);
                        if(0 <= signalStrength && signalStrength < 2) {
                            this.connectionNode.getChildByName('info_1').active = true;
                            this.connectionNode.getChildByName('info_0').active = false;
                            this.connectionNode.getChildByName('info_2').active = false;
                            this.connectionNode.getChildByName('info_3').active = false;
                            this.connectionNode.getChildByName('info_4').active = false;
                        }
                        else if(2 <= signalStrength && signalStrength < 4) {
                            this.connectionNode.getChildByName('info_1').active = false;
                            this.connectionNode.getChildByName('info_0').active = false;
                            this.connectionNode.getChildByName('info_2').active = true;
                            this.connectionNode.getChildByName('info_3').active = false;
                            this.connectionNode.getChildByName('info_4').active = false;
                        }
                        else if(4 <= signalStrength && signalStrength < 6) {
                            this.connectionNode.getChildByName('info_1').active = false;
                            this.connectionNode.getChildByName('info_0').active = false;
                            this.connectionNode.getChildByName('info_2').active = false;
                            this.connectionNode.getChildByName('info_3').active = true;
                            this.connectionNode.getChildByName('info_4').active = false;
                        }
                        else if(signalStrength >= 6) {
                            this.connectionNode.getChildByName('info_1').active = false;
                            this.connectionNode.getChildByName('info_0').active = false;
                            this.connectionNode.getChildByName('info_2').active = false;
                            this.connectionNode.getChildByName('info_3').active = false;
                            this.connectionNode.getChildByName('info_4').active = true;
                        }
                        this.schedule(this.updateDownLink, 0.8);
                    }
                }
                
            }
        }
    }

    adjustLayout() {
        if(cc.sys.os != 'Windows') {
            if(cc.sys.isBrowser) {
                // let winSize = director.getWinSize();
                let winSize = cc.view.getVisibleSize();
                console.log(winSize.width);
                if(winSize.width > 390) {
                    this.gameNode.scale = winSize.width / 390;
                    let gameWidget = this.gameNode.getComponent(cc.Widget)
                    gameWidget.bottom = 184 + 184 * (winSize.width / 390) / 10;
                }
            }
        }
    }

    onLabelSizeChange() {
        console.log('Label text changed:', this.winNumLabel.string);
        if(this.winNumLabel.string != '₹ 0.00 ') {
            cc.tween(this.winNumLabel.node)
            .to(0.4, {scale: 1.5})
            .to(0.4, {scale: 1})
            .union()
            .call(()=>{
                    let formattedNumber = Common.settle_availableamount;
                    let roundedNumber = Number(formattedNumber)
                    let rounded = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(roundedNumber)
                    this.balanceLabel.string = '₹' + rounded.toLocaleString() + ' '
                })
            .start();
        }
        
    }

    async btnEffectComplete() {
        await PromiseUtil.sleep(4);
        this.btnEffect.setAnimation(0, 'animation', false);
    }

    updateDownLink() {
        this.connectionNode.getChildByName('err').active = false
        // if ('onLine' in navigator) {
        if (navigator.onLine) {
            // 在线，尝试获取更具体的信号强度信息
            // @ts-ignore
            if (navigator.connection) {
                // @ts-ignore
                let networkInfo = navigator.connection;
                if (networkInfo) {
                    let signalStrength = networkInfo.downlink; 
                    // console.log('下行速率', signalStrength);
                    if(0 <= signalStrength && signalStrength < 2) {
                        this.connectionNode.getChildByName('info_1').active = true;
                        this.connectionNode.getChildByName('info_0').active = false;
                        this.connectionNode.getChildByName('info_2').active = false;
                        this.connectionNode.getChildByName('info_3').active = false;
                        this.connectionNode.getChildByName('info_4').active = false;
                    }
                    else if(2 <= signalStrength && signalStrength < 4) {
                        this.connectionNode.getChildByName('info_1').active = false;
                        this.connectionNode.getChildByName('info_0').active = false;
                        this.connectionNode.getChildByName('info_2').active = true;
                        this.connectionNode.getChildByName('info_3').active = false;
                        this.connectionNode.getChildByName('info_4').active = false;
                    }
                    else if(4 <= signalStrength && signalStrength < 6) {
                        this.connectionNode.getChildByName('info_1').active = false;
                        this.connectionNode.getChildByName('info_0').active = false;
                        this.connectionNode.getChildByName('info_2').active = false;
                        this.connectionNode.getChildByName('info_3').active = true;
                        this.connectionNode.getChildByName('info_4').active = false;
                    }
                    else if(signalStrength >= 6) {
                        this.connectionNode.getChildByName('info_1').active = false;
                        this.connectionNode.getChildByName('info_0').active = false;
                        this.connectionNode.getChildByName('info_2').active = false;
                        this.connectionNode.getChildByName('info_3').active = false;
                        this.connectionNode.getChildByName('info_4').active = true;
                    }
                }
            }
        }
        else {
            this.connectionNode.getChildByName('info_1').active = false;
            this.connectionNode.getChildByName('info_0').active = true;
            this.connectionNode.getChildByName('info_2').active = false;
            this.connectionNode.getChildByName('info_3').active = false;
            this.connectionNode.getChildByName('info_4').active = false;
            this.connectionNode.getChildByName('err').active = true;
        }
        // }
    }

    onAutoStart() {
        // if(this.isAutoBetting || this.isRolling) {
        //     Common.showTipView('Game playing');
        //     return;
        // }
        if(!this.isAutoBetting) {
            this.isAutoBetting = true;
            this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = false;
            this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = true;
            if(!this.isRolling && !this.isPlayAni && !this.isTurnPlay) {
                let tip = 'Auto Spin Enabled'
                Common.showPrompt(tip);
                this.autoStartSpin();
            }
        }
        
        // this.autoStartSpin();
    }

    onMusicSwitch() {
        if (Common.music_switch == 0) {
            this.music.getChildByName('on').active = false;
            this.music.getChildByName('off').active = true;
            SoundManager.pause();
            Common.music_switch = 1;
            // UserInfo.openMusicTag = 1
            cc.sys.localStorage.setItem('music_switch', 1);
        }
        else {
            this.music.getChildByName('on').active = true;
            this.music.getChildByName('off').active = false;
            SoundManager.resume();
            Common.music_switch = 0;
            cc.sys.localStorage.setItem('music_switch', 0);
        }
    }

    onClick(event) {
        this.hideBetSetView();
        this.hideMenuView();
        this.hideSettingView();
    }

    updateView() {
        if(this.betmoney == 1) {
            this.lockZhuangpan(true);
            // this.replaceSpriteFrame('bet1');
            this.updeteTitleTip('bet1', 'bet5');
            this.titleNode.getChildByName('mask').y = -10;
            this.select_10.active = true;
            this.select_50.active = false;
            this.roulettebg_green.active = true;
            this.roulettebg_red.active = false;
            this.iconBg_green.active = true;
            this.iconBg_red.active = false;
            // this.lockSolt.active = true;
            this.lockSlot(true);
            Common.turntableItemmMoney = [1000, 100, 25, 500, 75, 150, 50, 250];
        }
        else if(this.betmoney == 5) {
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet5');
            this.updeteTitleTip('bet5', 'bet10');
            this.titleNode.getChildByName('mask').y = -10;
            this.select_10.active = true;
            this.select_50.active = false;
            this.roulettebg_green.active = true;
            this.roulettebg_red.active = false;
            this.iconBg_green.active = true;
            this.iconBg_red.active = false;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [1000, 100, 25, 500, 75, 150, 50, 250];
        }
        else if(this.betmoney == 10) {
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet10');
            this.updeteTitleTip('bet10', 'bet50');
            this.titleNode.getChildByName('mask').y = -10;
            this.select_10.active = true;
            this.select_50.active = false;
            this.roulettebg_green.active = true;
            this.roulettebg_red.active = false;
            this.iconBg_green.active = true;
            this.iconBg_red.active = false;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [2000, 200, 50, 1000, 150, 300, 100, 500];
        }
        else if(this.betmoney == 50) {
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet50');
            this.updeteTitleTip('bet10', 'bet50');
            this.titleNode.getChildByName('mask').y = -41;
            this.select_10.active = false;
            this.select_50.active = true;
            this.roulettebg_green.active = false;
            this.roulettebg_red.active = true;
            this.iconBg_green.active = false;
            this.iconBg_red.active = true;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [50000, 2000, 500, 25000, 1500, 5000, 1000, 10000];
        }
        else if(this.betmoney == 100) {
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet100');
            this.updeteTitleTip('bet10', 'bet50');
            this.titleNode.getChildByName('mask').y = -41;
            this.select_10.active = false;
            this.select_50.active = true;
            this.roulettebg_green.active = false;
            this.roulettebg_red.active = true;
            this.iconBg_green.active = false;
            this.iconBg_red.active = true;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [100000, 5000, 1000, 50000, 3000, 10000, 2000, 20000];
        }
    }

    onTurboSpin(event) {
        let tip:string = this.turboSpin.isChecked ? 'Turbo Spin Enabled' : 'Turbo Spin Disabled';
        Common.showPrompt(tip);
    }

    async onRecvBetHistoryData(event_name, uname, uData: any) {
        Common.recordArr = [];
            for(let i = 0; i < uData.data.length; i++) {
                let recordData = uData.data[i].content;
                let bettingdata: BettingData = {
                    id: 0,
                    money: recordData.amount,
                    mprofit: recordData.net_profit,
                    profit: recordData.profit,
                    result: recordData.symbols,
                    time:  uData.data[i].updated_at,
                    special: recordData.is_extra_bet,
                    pumping: recordData.pumping,
                    orderid: uData.data[i].order_no,
                    special_symbols: recordData.special_symbols,
                    winningResults: recordData.winning_lines,
                    special_profit: recordData.special_profit,
                }
                Common.recordArr.push(bettingdata);
            }
            await PromiseUtil.sleep(1);
            // if(Common.recordArr.length != 0) {
            EgrManager.Instance.dispatch_event('showRecordView', '', 1);
    }

    async onRecvBetData(event_name, uname, uData: any) {
        this.symbols = uData.symbols;
                    // this.symbols[0].lines[0] = null;
        if(uData.special_symbols) {
            this.special_symbols = uData.special_symbols;
        }
        else {
            this.special_symbols = null;
        }
        // this.special_symbols = 'scatter_green'
        this.profit = uData.profit;
        this.symbols_profit = uData.symbols_profit;
        this.special_profit = uData.special_profit;
        this.lucky.amount = uData.lucky.amount;

        if(uData.order_on) {
            this.order_id = uData.order_on.toString();
        }
        else {
            // this.orderidLabel.string = '';
            this.order_id = ''
        }
    } 

    async onRecvData(event_name, uname, uData: any) {
        if(uname == 'bet') {
            if(uData.code && uData.code == 503) {
                Common.showTipView(uData.message);
                this.isRolling = false;
                this.isGamePlay = false;
                this.isBoxPlay = false;
                this.isBoxPlay_1 = false;
                this.isBoxPlay_2 = false;
                this.isBoxPlay_3 = false;
                return;
            }
            else if(uData.code && uData.code == 2500) {
                Common.showTipView(uData.message);
                this.isRolling = false;
                this.isGamePlay = false;
                this.isBoxPlay = false;
                this.isBoxPlay_1 = false;
                this.isBoxPlay_2 = false;
                this.isBoxPlay_3 = false;
                return;
            }
            
            this.symbols = uData.symbols;
                    // this.symbols[0].lines[0] = null;
            if(uData.special_symbols) {
                this.special_symbols = uData.special_symbols;
            }
            else {
                this.special_symbols = null;
            }
            // this.special_symbols = 'scatter_green'
            this.profit = uData.profit;
            this.symbols_profit = uData.symbols_profit;
            this.special_profit = uData.special_profit;
            this.lucky.amount = uData.lucky.amount;

            if(uData.order_on) {
                this.order_id = uData.order_on.toString();
            }
            else {
                // this.orderidLabel.string = '';
                this.order_id = ''
            }
        }
        else if(uname == 'userinfo') {
            if(uData.event == 'first' || uData.event == 'bet') {
                if(uData.balance) {
                    Common.availableamount = uData.balance;
                    let formattedNumber = Common.availableamount;
                    let roundedNumber = Number(formattedNumber)
                    let rounded = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(roundedNumber)
                    this.balanceLabel.string = '₹' + rounded.toLocaleString() + ' '
                    
                }
                else {
                    Common.availableamount = 0;
                    this.balanceLabel.string = '₹0.00 '
                }
            }
            else if(uData.event == 'settle') {
                if(uData.balance) {
                    Common.settle_availableamount = uData.balance;
                }
            }
            
            if(uData.identity) {
                Common.userid = uData.identity;
            }
            else{
                Common.userid = '';
            }
            
        }
        else if(uname == 'bet-history') {
            console.log(uData);
            Common.recordArr = [];
            for(let i = 0; i < uData.data.length; i++) {
                let recordData = uData.data[i].content;
                let bettingdata: BettingData = {
                    id: 0,
                    money: recordData.amount,
                    mprofit: recordData.net_profit,
                    profit: recordData.profit,
                    result: recordData.symbols,
                    time:  uData.data[i].updated_at,
                    special: recordData.is_extra_bet,
                    pumping: recordData.pumping,
                    orderid: uData.data[i].order_no,
                    special_symbols: recordData.special_symbols,
                    winningResults: recordData.winning_lines,
                    special_profit: recordData.special_profit,
                }
                Common.recordArr.push(bettingdata);
            }
            await PromiseUtil.sleep(1);
            // if(Common.recordArr.length != 0) {
            EgrManager.Instance.dispatch_event('showRecordView', '', 1);
            // }
        }
    }

    getQueryParam(url, paramName) {
        url = url || window.location.href;
        paramName = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + paramName + "=([^&#]*)"),
            results = regex.exec(url.split("#")[0]);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    getHomeUrlParam(url, paramName) {
        url = url || window.location.href;
        paramName = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\&&]" + paramName + "=([^&#]*)"),
            results = regex.exec(url.split("#")[0]);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    getGameIdParam(url, paramName) {
        url = url || window.location.href;
        paramName = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\&&]" + paramName + "=([^&#]*)"),
            results = regex.exec(url.split("#")[0]);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    onPlay() {
        cc.tween(this.bottomNode)
        .to(0.5, {opacity: 255}, {easing: 'sineIn'})
        .start()
        this.playGame.active = false;
        SoundManager.playwildSoundById('start_1');
        SoundManager.playSoundById('into');
        this.startGameAni.node.active = true;
        this.startGameAni.setAnimation(0, 'open1', false);
        this.startGameAni.setCompleteListener(this.startGameAniComplete.bind(this));
        this.schedule(this.playStartGameAni, 5);
    }

    playStartGameAni() {
        if(this.isRolling){
            return;
        }
        if(this.isPlayAni) {
            return;
        }
        if(this.isTurnPlay) {
            return;
        }
        if(!this.startGameAni.node.active) {
            this.startGameAni.node.active = true;
            this.startGameAni.setAnimation(0, 'open3', false);
        }
    }

    async startGameAniComplete() {
        if(this.startGameAni.animation == 'open1') {
            this.startGameAni.setAnimation(0, 'open3', false);
            this.isStartPlay = false;
            let isDemoMode = cc.sys.localStorage.getItem('demoMode_step')
            if(isDemoMode != null) {
                if(isDemoMode) {
                    this.showWinMoreView();
                }
            }
            else {
                this.showWinMoreView();
            }
            this.addStars();
            this.addDian();
        }
        else if(this.startGameAni.animation == 'open3') {
            await PromiseUtil.sleep(2);
            this.startGameAni.setAnimation(0, 'open3', false);
            // this.startGameAni.setCompleteListener(this.startGameAniComplete.bind(this));
        }
    }

    async addDian() {
        let dianAni = cc.instantiate(this.starsDianAni);
        dianAni.active = true;
        const dian_x = Math.random() * 395 - 395 / 2;
        const dian_y = Math.random() * 395 - 395 / 2;
        dianAni.setPosition(dian_x, dian_y);
        this.starsNode.addChild(dianAni);
        let starsSp: sp.Skeleton = dianAni.getComponent(sp.Skeleton);
        starsSp.setAnimation(0, 'animation', false);
        starsSp.setCompleteListener(async ()=>{
            this.starsNode.removeChild(dianAni);
            let time = Math.random() * 1;
            // this.scheduleOnce(this.addDian, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addDian, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addDian, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addDian, time);
            // time = Math.random() * 2;
            // this.scheduleOnce(this.addDian, time);
            // time = Math.random() * 2;
            // this.scheduleOnce(this.addDian, time);
            await PromiseUtil.sleep(time);
            this.addDian();
        })
    }

    async addStars() {

        let starsAni = cc.instantiate(this.starsAni);
        starsAni.active = true;
        const x = Math.random() * 395 - 395 / 2;
        const y = Math.random() * 395 - 395 / 2;

        starsAni.setPosition(x, y);
        this.starsNode.addChild(starsAni);
        let starsSp: sp.Skeleton = starsAni.getComponent(sp.Skeleton);
        starsSp.setAnimation(0, 'animation', false);
        starsSp.setCompleteListener(async ()=>{
            this.starsNode.removeChild(starsAni);
            let time = Math.random() * 1;
            await PromiseUtil.sleep(time);
            this.addStars();
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 2;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 2;
            // this.scheduleOnce(this.addStars, time);
        })

        let sleepTime = Math.random() * 1;
        await PromiseUtil.sleep(sleepTime)
        let starsAni1 = cc.instantiate(this.starsAni);
        starsAni1.active = true;
        const x_1 = Math.random() * 395 - 395 / 2;
        const y_1 = Math.random() * 395 - 395 / 2;

        starsAni1.setPosition(x_1, y_1);
        this.starsNode.addChild(starsAni1);
        let starsSp1: sp.Skeleton = starsAni1.getComponent(sp.Skeleton);
        starsSp1.setAnimation(0, 'animation', false);
        starsSp1.setCompleteListener(async ()=>{
            this.starsNode.removeChild(starsAni1);
            // let time = Math.random() * 1;
            // await PromiseUtil.sleep(time);
            // this.addStars();
            // let time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 1;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 2;
            // this.scheduleOnce(this.addStars, time);
            // time = Math.random() * 2;
            // this.scheduleOnce(this.addStars, time);
        })

    }

    initSlotItem() {
        for(let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * Common.itemType.length);
            let node = cc.instantiate(this.slotItem)
            let item = node.getComponent(slotItem);
            item.initView(Common.itemType[index]);
            node.setPosition(0, 0);
            this.slotItemNode_1.addChild(node);
            this.slotItemNode_1.setPosition(-136, this.itemnoBingPosY);
            this.slotItem_1.push(item);
            // this.slotItems.push(node);
        }

        for(let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * Common.itemType.length);
            let node = cc.instantiate(this.slotItem)
            let item = node.getComponent(slotItem);
            item.initView(Common.itemType[index]);
            node.setPosition(0, 0);
            this.slotItemNode_2.addChild(node);
            this.slotItemNode_2.setPosition(-48, this.itemnoBingPosY);
            this.slotItem_2.push(item);
            // this.slotItems.push(node);
        }

        for(let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * Common.itemType.length);
            let node = cc.instantiate(this.slotItem)
            let item = node.getComponent(slotItem);
            item.initView(Common.itemType[index]);
            node.setPosition(0, 0);
            this.slotItemNode_3.addChild(node);
            this.slotItemNode_3.setPosition(38, this.itemnoBingPosY);
            this.slotItem_3.push(item);
            // this.slotItems.push(node);
        }

        for(let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * Common.multipleArr.length);
            let node = cc.instantiate(this.multipleItem)
            let item = node.getComponent(multipleItem);
            item.initView(Common.multipleArr[index]);
            node.setPosition(0, 0);
            this.multipleItemNode.addChild(node);
            this.multipleItemNode.setPosition(136, this.itemnoBingPosY);
            // this.multipleItems.push(item);
            // this.multipleNodes.push(node);
        }
        // this.slotItemNode_1.y = -188;
    }

    onTouchStart(event) {
        this.isPressing = true;
        this.schedule(this.checkLongPress, 1); // 每隔1秒检查一次长按
    }

    onTouchCancel(event) {
        this.isPressing = false;
        this.unschedule(this.checkLongPress);
        this.pressTime = 0;
    }

    onTouchEnd(event) {
        this.isPressing = false;
        this.unschedule(this.checkLongPress); // 取消定时器
        // if(this.isStartPlay) {
        //     return;
        // }
        // if(this.isDemoMode) {
        //     return;
        // }
        if(this.isPlayAni) {
            return;
        }
        let tip:string = ''
        if (this.pressTime < 1) {
            // 短按处理逻辑
            if(this.isAutoBetting) {
                this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                this.isAutoBetting = false;
                Common.totalSpinNumber = -1;
                this.autoCountLabel.string = '';
                tip = 'Auto Spin Disabled';
                Common.showPrompt(tip);
            }
            else {
                if(this.isRolling){
                    return;
                }
                if(this.isPlayAni) {
                    return;
                }
                if(this.isTurnPlay) {
                    return;
                }
                if(this.isStartPlay) {
                    return;
                }
                this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = false;
                this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = true;
                this.isAutoBetting = true;
                Common.totalSpinNumber = -1;
                tip = 'Auto Spin Enabled'
                Common.showPrompt(tip);
                // this.autoCountLabel.string = '';
            }
            // this.isAutoBetting = !this.autoBtn.get;
            if(this.isAutoBetting) {
                this.autoStartSpin();
            }
        }
        this.pressTime = 0;
    }

    // 检查长按时间
    checkLongPress() {
        if (this.isPressing) {
            this.pressTime += 1; // 每秒增加长按时间
            if (this.pressTime >= 1) {
                this.unschedule(this.checkLongPress)
                this.isPressing = false;
                if(!this.isAutoBetting && !this.isPlayAni && !this.isTurnPlay) {
                    this.showAutoSpinView();
                }   
            }
        }
    }

    rollTips() {
        let a = this;
        if(this.tipIndex == 1) {
            this.tipLabel.string = 'Tap to autoPlay';
        }
        else if(this.tipIndex == 2) {
            this.tipLabel.string = 'Hold for setting'
        }
        if(this.tipIndex == 1 || this.tipIndex == 2) {
            cc.tween(this.tipLabel.node)
            .to(this.tipRollSpeed, {opacity: 210})
            .to(this.tipRollSpeed, {opacity: 0})
            .call(async ()=>{
                a.tipIndex += 1;
                await PromiseUtil.sleep(1);
                this.rollTips();
            })
            .start()
        }
        else {
            cc.tween(this.tipLabel_1.node)
            .to(this.tipRollSpeed, {opacity: 210})
            .to(this.tipRollSpeed, {opacity: 0})
            .call(async ()=>{
                a.tipIndex += 1;
                if(a.tipIndex == 4) {
                    a.tipIndex = 1;
                }
                await PromiseUtil.sleep(1);
                this.rollTips();
            })
            .start()
        }
    }

    menuBtnMoveHandler(event) {
        let toPos = this.menuBtn.node.parent.convertToNodeSpaceAR(event.currentTouch._point)
        this.menuBtn.node.y = toPos.y;
        if(this.menuBtn.node.y > 389) {
            this.menuBtn.node.y = 389;
        }
        if(this.menuBtn.node.y < -389) {
            this.menuBtn.node.y = -389
        }
        // console.log(this.menuBtn.node.parent.convertToNodeSpaceAR(event.currentTouch._point));
        // this.menuBtn.node.y = event.currentTouch._point.y
    }

    showMenuView() {
        let menuViewWg = this.menuView.getComponent(cc.Widget);
        cc.tween(this.menuBtn.node)
        .to(0.2, {scaleX: 0})
        .call(()=>{
            cc.tween(menuViewWg)
            .to(0.2, {left: 0}, {
                onUpdate: ()=>{
                    menuViewWg.updateAlignment();
                }
            })
            .start()
        })
        .start()
    }

    hideMenuView() {
        let menuViewWg = this.menuView.getComponent(cc.Widget);
        cc.tween(menuViewWg)
        .to(0.2, {left: -101}, {
            onUpdate: ()=>{
                menuViewWg.updateAlignment();
            }
        })
        .call(()=>{
            // menuViewWg.updateAlignment();
            cc.tween(this.menuBtn.node)
            .to(0.2, {scaleX: 0.7})
            .start()
        })
        .start()
    }

    private isClickBoard: boolean = false;
    async boardStartSpin() {
        this.onClick(null);
        if(this.betmoney > Common.availableamount) {
            Common.showTipView('Not enough balance')
            return;
        }
        if(this.isStartPlay) {
            return;
        }
        if(this.isPlayAni) {
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        if(this.isRolling) {
            return;
        }
        if(this.isTurnPlay) {
            let a = this;
            this.isTurnPlay = false;
            this.isPlayAni = true;
            if(this.turnTween) {
                this.turnTween.stop();
            }
            SoundManager.playSoundById('endTurn');
            let endAngle;
            endAngle = this.maxSpeed * 4 + Common.turntableItemRotation[Common.turntableItemmMoney.indexOf(this.lucky.amount)];
            console.log(Common.turntableItemmMoney.indexOf(this.lucky.amount), endAngle);
            this.zhuangpanNode.angle = endAngle;
            this.turnPlayEnd.node.active = true;
            this.turnPlayEnd.node.angle = -endAngle;
            this.turnPlayEnd.setAnimation(0, 'greenredwin2', true);
            //     // 停止旋转后的处理
            if(a.special_symbols == 'scatter_green') {
                a.turnPlay.setAnimation(0, 'greenredwin1', true);
            }
            else if(a.special_symbols == 'scatter_red') {
                a.turnPlay.setAnimation(0, 'dajiangwin1', true);
            }
            a.special_profitLabel.string = a.special_profit.toFixed(2);
            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
            await PromiseUtil.sleep(0.5);
            if(a.profit / a.betmoney > 9) {
                this.showWinAni(a.profit / a.betmoney);
            }
            else {
                a.isPlayAni = false;
                SoundManager.play('back');
                a.isTurnPlay = false;
                await PromiseUtil.sleep(0.5);
                if(this.isAutoBetting && !this.isPlayAni) {
                    this.autoStartSpin();
                }
                else {
                    if(!this.isAutoBetting) {
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                        this.autoCountLabel.string = '';
                    }    
                }
            }
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        if(!this.isClickBoard) {
            this.isClickBoard = true;
            Common.showTipView('Click the board for SPIN/STOP.\n Press "Confirm" to spin.', this.startSpin.bind(this, false));
        }
        else {
            this.startSpin(false);
        }

    }

    autoStartSpin() {
        this.onClick(null);
        if(this.betmoney > Common.availableamount) {
            Common.showTipView('Not enough balance')
            if(this.isAutoBetting) {
                this.isAutoBetting = false;
                this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                this.autoCountLabel.string = '';
            }
            return;
        }
        if(this.isRolling) {
            return;
        }
        if(this.isStartPlay) {
            return;
        }

        if(Common.totalSpinNumber > 0) {
            Common.totalSpinNumber -= 1;
            if(Common.totalSpinNumber <= 0) {
                // this.isAutoBetting = false;
                this.autoCountLabel.string = ''
;            }
            else {
                this.autoCountLabel.string = Common.totalSpinNumber + '';
            }
        }
        else {
            this.autoCountLabel.string = ''
        }
        this.isSpeed = false;
        this.startGameAni.node.active = false;
        this.turnPlay.node.active = false;
        this.turnPlayEnd.node.active = false;
        this.titleNode.active = true;
        this.bigAwardNode.active = false;
        this.bigAwardNode.scaleY = 0;
        this.special_profitLabel.string = '0.00';
        this.winNumLabel.string = '₹ 0.00 '
        this.isPlay = true;
        this.symbols = [];
        this.slotItem_1 = [];
        this.slotItem_2 = [];
        this.slotItem_3 = [];
        this.multipleItems = [];
        this.isRolling = true;
        this.isGamePlay = true;
        this.isBoxPlay = true;
        this.isBoxPlay_1 = true;
        this.isBoxPlay_2 = true;
        this.isBoxPlay_3 = true;
        this.soltItemReturn1 = this.soltItemReturn2 = this.soltItemReturn3 = this.multipleReturn = false;

        SocketIOManager.Instance.onBetting(this.betmoney);
    }
    private isSpeed:boolean = false;
    async startSpin(isBtn: boolean = true) {

        let a = this;
        this.onClick(null);
        
        if(cc.director.getScheduler().isScheduled(this.updateBigCount, this) && this.isPlayAni && this.winAni.node.active && !this.isFirstClick) {
            SoundManager.stopSound();
            SoundManager.playSoundById('win_end');
            this.money_1.stopSystem();
            this.money_2.stopSystem();
            this.money_3.stopSystem();
            this.money_4.stopSystem();
            this.isFirstClick = true;
            this.unschedule(this.updateBigCount);
            if(this.winAni.animation == 'bigwin1') {
                this.winAni.setAnimation(0, 'bigwin2', true);
            }
            else if(this.winAni.animation == 'megawin1') {
                this.winAni.setAnimation(0, 'megawin2', true);
                
            }
            else if(this.winAni.animation == 'supperwin1') {
                this.winAni.setAnimation(0, 'supperwin2', true);
            }
            this.currentNumber = this.targetNumber;
            this.updateBigNumber();
            SoundManager.resume();
            SoundManager.play('black');
            await PromiseUtil.sleep(1)
            cc.tween(this.winAni.node)
            .to(0.3, {scale: 0})
            .call(async ()=>{
                
                this.bigWinLabel.string = '0';
                this.winBg.active = false;
                this.winAni.node.active = false;
                this.isPlayAni = false;
                this.isFirstClick = false;
                await PromiseUtil.sleep(0.5);
                if(this.isAutoBetting && !this.isPlayAni) {
                    this.autoStartSpin();
                }
                else {
                    if(!this.isAutoBetting) {
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                        this.autoCountLabel.string = '';
                    }    
                }
            })
            .start();
            return;
        }
        SoundManager.playClickSound('startspin');
        if(this.betmoney > Common.availableamount) {
            Common.showTipView('Not enough balance')
            return;
        }
        // if(this.isRolling) {
        //     return;
        // }
        if(this.isPlayAni) {
            return;
        }
        if(this.isStartPlay) {
            return;
        }
        if(this.isTurnPlay) {
            this.isTurnPlay = false;
            this.isPlayAni = true;
            if(this.turnTween) {
                this.turnTween.stop();
                this.turnTween = null;
            }
            SoundManager.playSoundById('endTurn');
            let endAngle;
            endAngle = this.maxSpeed * 4 + Common.turntableItemRotation[Common.turntableItemmMoney.indexOf(this.lucky.amount)];
            console.log(Common.turntableItemmMoney.indexOf(this.lucky.amount), endAngle);
            this.zhuangpanNode.angle = endAngle;
            this.turnPlayEnd.node.active = true;
            this.turnPlayEnd.node.angle = -endAngle;
            this.turnPlayEnd.setAnimation(0, 'greenredwin2', true);
            //     // 停止旋转后的处理
            if(a.special_symbols == 'scatter_green') {
                a.turnPlay.setAnimation(0, 'greenredwin1', true);
            }
            else if(a.special_symbols == 'scatter_red') {
                a.turnPlay.setAnimation(0, 'dajiangwin1', true);
            }
            a.special_profitLabel.string = a.special_profit.toFixed(2);
            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
            await PromiseUtil.sleep(0.5);
            if(a.profit / a.betmoney > 9) {
                this.showWinAni(a.profit / a.betmoney);
            }
            else {
                SoundManager.play('back');
                a.isPlayAni = false;
                a.isTurnPlay = false;
                await PromiseUtil.sleep(0.5);
                if(this.isAutoBetting && !this.isPlayAni) {
                    this.autoStartSpin();
                }
                else {
                    if(!this.isAutoBetting) {
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                        this.autoCountLabel.string = '';
                    }    
                }
            }
            return;
        }
        if(this.isRolling && isBtn) {
            if(!this.isSpeed) {
                this.isSpeed = true;
            }
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        this.isSpeed = false;
        this.startGameAni.node.active = false;
        this.turnPlay.node.active = false;
        this.turnPlayEnd.node.active = false;
        this.titleNode.active = true;
        this.bigAwardNode.active = false;
        this.bigAwardNode.scaleY = 0;
        this.special_profitLabel.string = '0.00';
        this.winNumLabel.string = '₹ 0.00 '
        this.isPlay = true;
        this.symbols = [];
        this.slotItem_1 = [];
        this.slotItem_2 = [];
        this.slotItem_3 = [];
        this.multipleItems = [];
        this.isRolling = true;
        this.isGamePlay = true;
        this.isBoxPlay = true;
        this.isBoxPlay_1 = true;
        this.isBoxPlay_2 = true;
        this.isBoxPlay_3 = true;
        this.soltItemReturn1 = this.soltItemReturn2 = this.soltItemReturn3 = this.multipleReturn = false;

        SocketIOManager.Instance.onBetting(this.betmoney);
    }

    private isGamePlay:boolean = false;
    private isBoxPlay: boolean = true;
    private isBoxPlay_1: boolean = true;
    private isBoxPlay_2: boolean = true;
    private isBoxPlay_3: boolean = true;
    private itemBingPosY:number = -125;
    private itemnoBingPosY:number = -174;
    private multiplenoBingoPoxY: number = -170;
    update(deltaTime: number) {
        if(this.isPlay == true) {
            var rotation = this.zhuangpanNode.angle
            let to = rotation - this.speed * deltaTime;
            this.zhuangpanNode.angle = to;
        }

        if(this.isGamePlay) {
            let curentPos = this.slotItemNode_1.position;
            let curentPos1 = this.slotItemNode_2.position;
            let curentPos2 = this.slotItemNode_3.position;
            let curentPos3 = this.multipleItemNode.position;
            let targetPoint = 1250 * deltaTime;
            let endPosY = this.lockSolt.active ? -2000 : -2250;
            let endPosY1 = this.lockSolt.active ? -1750 : -2000;
            let endPosY2 = -1750;
            let endPosY3 = -1500;
            // if(this.isSpeed) {
            //     endPosY = -1000; //506
            //     endPosY1 = -1000; //773
            //     endPosY2 = -1000; //1040
            //     endPosY3 = -1000;
            // }
            let a = this;
            if(this.isBoxPlay) {
                let a = this;
                if(this.symbols.length != 0) {
                    if(this.turboSpin.isChecked || this.isSpeed) {
                        this.isBoxPlay = false;
                            this.isGamePlay = false;
                            this.slotItemNode_1.removeAllChildren();
                            for(let i = 0; i < 5; i++) {
                                let index;
                                if(i == 2) {
                                    if(this.symbols[0].lines[0] != null) {
                                        index = Common.itemType.indexOf(this.symbols[0].lines[0]);
                                    }
                                    else {
                                        index = Math.floor(Math.random() * Common.itemType.length);
                                    }

                                }
                                else {
                                    index = Math.floor(Math.random() * Common.itemType.length);
                                }
                                // let isReward = false;
                                // console.log('index1>>', index);
                                let node = cc.instantiate(this.slotItem)
                                let item = node.getComponent(slotItem);
                                item.initView(Common.itemType[index]);
                                if(i == 2 && this.symbols[0].lines[0] != null) {
                                    this.slotItem_1.push(item);
                                }
                                // if(i == 2) {
                                //     this.slotItem_1.push(item);
                                // }
                                node.setPosition(0, 0);
                                this.slotItemNode_1.addChild(node);
                            }
                            if(this.symbols[0].lines[0] != null) {
                                this.slotItemNode_1.setPosition(-136, -115);
                                cc.tween(this.slotItemNode_1)
                                .to(0.2, {position: new cc.Vec3(-136, this.itemBingPosY)}, {easing: 'backOut'})
                                .call(async ()=>{
                                    this.orderidLabel.string = 'Transaction ' + this.order_id;
                                    SoundManager.playwildSoundById('roll_end');
                                    if(Common.totalSpinNumber == 0) { //自动轮数剩余0的时候就停止
                                        this.isAutoBetting = false;
                                    }
                                    if(this.profit != 0) {
                                        // console.log('指定赢的金额>>', Common.stopwinBalanceNumber)
                                        if(Common.stopwinBalanceNumber != 0 && Common.stopwinBalanceNumber <= Common.availableamount) { //赢到指定金额就停止
                                            this.isAutoBetting = false;
                                        }
                                    }
                                    if(this.betmoney != 0 && this.profit == 0) {
                                        // console.log('指定输的金额>>', Common.stopLoseBalanceNumber)
                                        if(Common.stopLoseBalanceNumber != 0 && Common.stopLoseBalanceNumber >= Common.availableamount) { //输到指定金额就停止
                                            this.isAutoBetting = false;
                                            // this.autoCountLabel.string = '';
                                        }
                                    }
                                    a.isRolling = false;
                                    a.isPlayAni = true;
                                    if(this.multipleReturn || this.soltItemReturn2 || this.soltItemReturn3) {
                                        await PromiseUtil.sleep(0.5);
                                    }
                                    if(this.multipleReturn) {
                                        this.multipleItemNode.setPosition(136, -115);
                                        cc.tween(this.multipleItemNode)
                                        .to(0.2, {position: new cc.Vec3(136, this.itemBingPosY)}, {easing: 'sineIn'})
                                        .call(()=>{
                                            if(a.special_symbols == '2' || a.special_symbols == '5' || a.special_symbols == '10') {
                                                SoundManager.playSoundById('beishu_' + a.special_symbols);
                                            }
                                        })
                                        .start();
                                    }
                                    if(this.soltItemReturn2) {
                                        this.slotItemNode_2.setPosition(-48, -115);
                                        cc.tween(this.slotItemNode_2)
                                        .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn3) {
                                        this.slotItemNode_3.setPosition(38, -115);
                                        cc.tween(this.slotItemNode_3)
                                        .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn2 || this.soltItemReturn3) {
                                        SoundManager.playSoundById('huizhuan');
                                    }
                                    await PromiseUtil.sleep(0.1);
                                    if(a.symbols[0].lines[0] != '0' && a.symbols[0].lines[0] != '00') {
                                        SoundManager.playwildSoundById('bingo')
                                        a.slotItem_1[0].setRunAction();
                                        if(a.slotItem_2.length != 0) {
                                            a.slotItem_2[0].setRunAction();
                                        }
                                        if(a.slotItem_3.length != 0) {
                                            a.slotItem_3[0].setRunAction();
                                        }
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                    }
                                    else {
                                        if(a.slotItem_2[0] && a.symbols[0].lines[1] != '0' && a.symbols[0].lines[1] != '00') {
                                            SoundManager.playwildSoundById('bingo')
                                            a.slotItem_2[0].setRunAction();
                                            if(a.slotItem_3.length != 0) {
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        else {
                                            if(a.slotItem_3[0] && a.symbols[0].lines[2] != '0' && a.symbols[0].lines[2] != '00') {
                                                SoundManager.playwildSoundById('bingo')
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        if(a.multipleItems[0] && a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                    }
                                    // await PromiseUtil.sleep(0.1);
                                    if(a.profit > 0) {
                                        if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                            a.updateSpecialsymbols(a.special_symbols);
                                        }
                                        else {
                                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                            if(a.profit / a.betmoney > 9) {
                                                await PromiseUtil.sleep(0.5);
                                                a.showWinAni(a.profit / a.betmoney);
                                            }
                                            else {
                                                await PromiseUtil.sleep(1.5);
                                                this.isPlayAni = false;
                                                if(this.isAutoBetting) {
                                                    // await PromiseUtil.sleep(1.5);
                                                    this.autoStartSpin();
                                                }
                                                else {
                                                    if(!this.isAutoBetting) {
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                        this.autoCountLabel.string = '';
                                                    }    
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                        if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                            a.updateSpecialsymbols(a.special_symbols)
                                        }
                                        else {
                                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                            if(a.profit / a.betmoney > 9) {
                                                await PromiseUtil.sleep(0.5);
                                                this.showWinAni(a.profit / a.betmoney);
                                            }
                                            else {
                                                a.isPlayAni = false
                                                if(this.isAutoBetting) {
                                                    await PromiseUtil.sleep(0.3);
                                                    this.autoStartSpin();
                                                }
                                                else {
                                                    if(!this.isAutoBetting) {
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                        this.autoCountLabel.string = '';
                                                    }    
                                                }
                                            }
                                        }
                                    }
                                    
                                })
                                .start();
                            }
                            else{
                                this.slotItemNode_1.setPosition(-136, -164);
                                cc.tween(this.slotItemNode_1)
                                .to(0.2, {position: new cc.Vec3(-136, this.itemnoBingPosY)}, {easing: 'backOut'})
                                .call(async ()=>{
                                    this.orderidLabel.string = 'Transaction ' + this.order_id;
                                    SoundManager.playwildSoundById('roll_null');
                                    if(Common.totalSpinNumber == 0) { //自动轮数剩余0的时候就停止
                                        this.isAutoBetting = false;
                                    }
                                    if(this.profit != 0) {
                                        // console.log('指定赢的金额>>', Common.stopwinBalanceNumber)
                                        if(Common.stopwinBalanceNumber != 0 && Common.stopwinBalanceNumber <= Common.availableamount) { //赢到指定金额就停止
                                            this.isAutoBetting = false;
                                        }
                                    }
                                    if(this.betmoney != 0 && this.profit == 0) {
                                        // console.log('指定输的金额>>', Common.stopLoseBalanceNumber)
                                        if(Common.stopLoseBalanceNumber != 0 && Common.stopLoseBalanceNumber >= Common.availableamount) { //输到指定金额就停止
                                            this.isAutoBetting = false;
                                            // this.autoCountLabel.string = '';
                                        }
                                    }
                                    a.isRolling = false;
                                    a.isPlayAni = true;
                                    if(this.multipleReturn || this.soltItemReturn2 || this.soltItemReturn3) {
                                        await PromiseUtil.sleep(0.5);
                                    }
                                    if(this.multipleReturn) {
                                        this.multipleItemNode.setPosition(136, -115);
                                        cc.tween(this.multipleItemNode)
                                        .to(0.2, {position: new cc.Vec3(136, this.itemBingPosY)}, {easing: 'sineIn'})
                                        .call(()=>{
                                            if(a.special_symbols == '2' || a.special_symbols == '5' || a.special_symbols == '10') {
                                                SoundManager.playSoundById('beishu_' + a.special_symbols);
                                            }
                                        })
                                        .start();
                                    }
                                    if(this.soltItemReturn2) {
                                        this.slotItemNode_2.setPosition(-48, -115);
                                        cc.tween(this.slotItemNode_2)
                                        .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn3) {
                                        this.slotItemNode_3.setPosition(38, -115);
                                        cc.tween(this.slotItemNode_3)
                                        .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn2 || this.soltItemReturn3) {
                                        SoundManager.playSoundById('huizhuan');
                                    }
                                    // await PromiseUtil.sleep(0.1);
                                    if(a.profit > 0) {
                                        if(a.slotItem_2[0] && a.symbols[0].lines[1] != '0' && a.symbols[0].lines[1] != '00') {
                                            SoundManager.playwildSoundById('bingo')
                                            a.slotItem_2[0].setRunAction();
                                            if(a.slotItem_3.length != 0) {
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        else {
                                            if(a.slotItem_3[0] && a.symbols[0].lines[2] != '0' && a.symbols[0].lines[2] != '00') {
                                                SoundManager.playwildSoundById('bingo')
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                        if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                            a.updateSpecialsymbols(a.special_symbols)
                                        }
                                        else {
                                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                            if(a.profit / a.betmoney > 9) {
                                                await PromiseUtil.sleep(0.5);
                                                this.showWinAni(a.profit / a.betmoney);
                                            }
                                            else {
                                                await PromiseUtil.sleep(1.5);
                                                a.isPlayAni = false
                                                if(this.isAutoBetting) {
                                                    // await PromiseUtil.sleep(1.5);
                                                    this.autoStartSpin();
                                                }
                                                else {
                                                    if(!this.isAutoBetting) {
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                        this.autoCountLabel.string = '';
                                                    }    
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                        if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                            a.updateSpecialsymbols(a.special_symbols)
                                        }
                                        else {
                                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                            if(a.profit / a.betmoney > 9) {
                                                await PromiseUtil.sleep(0.5);
                                                this.showWinAni(a.profit / a.betmoney);
                                            }
                                            else {
                                                a.isPlayAni = false
                                                if(this.isAutoBetting) {
                                                    await PromiseUtil.sleep(0.3);
                                                    this.autoStartSpin();
                                                }
                                                else {
                                                    if(!this.isAutoBetting) {
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                        this.autoCountLabel.string = '';
                                                    }    
                                                }
                                            }
                                        }
                                    }
                                    // this.slotItem_2[0].setRunAction();
                                })
                                .start();
                            }

                    }
                    else {
                        if(curentPos.y - targetPoint < endPosY) {
                            this.isBoxPlay = false;
                            this.isGamePlay = false;
                            this.slotItemNode_1.removeAllChildren();
                            for(let i = 0; i < 5; i++) {
                                let index;
                                if(i == 2) {
                                    if(this.symbols[0].lines[0] != null) {
                                        index = Common.itemType.indexOf(this.symbols[0].lines[0]);
                                    }
                                    else {
                                        index = Math.floor(Math.random() * Common.itemType.length);
                                    }

                                }
                                else {
                                    index = Math.floor(Math.random() * Common.itemType.length);
                                }
                                // let isReward = false;
                                // console.log('index1>>', index);
                                let node = cc.instantiate(this.slotItem)
                                let item = node.getComponent(slotItem);
                                item.initView(Common.itemType[index]);
                                if(i == 2 && this.symbols[0].lines[0] != null) {
                                    this.slotItem_1.push(item);
                                }
                                // if(i == 2) {
                                //     this.slotItem_1.push(item);
                                // }
                                node.setPosition(0, 0);
                                this.slotItemNode_1.addChild(node);
                            }
                            if(this.symbols[0].lines[0] != null) {
                                SoundManager.playwildSoundById('roll_end');
                                this.slotItemNode_1.setPosition(-136, -115);
                                cc.tween(this.slotItemNode_1)
                                .to(0.2, {position: new cc.Vec3(-136, this.itemBingPosY)}, {easing: 'backOut'})
                                .call(async ()=>{
                                    this.orderidLabel.string = 'Transaction ' + this.order_id;
                                    if(Common.totalSpinNumber == 0) { //自动轮数剩余0的时候就停止
                                        this.isAutoBetting = false;
                                    }
                                    if(this.profit != 0) {
                                        // console.log('指定赢的金额>>', Common.stopwinBalanceNumber)
                                        if(Common.stopwinBalanceNumber != 0 && Common.stopwinBalanceNumber <= Common.availableamount) { //赢到指定金额就停止
                                            this.isAutoBetting = false;
                                        }
                                    }
                                    if(this.betmoney != 0 && this.profit == 0) {
                                        // console.log('指定输的金额>>', Common.stopLoseBalanceNumber)
                                        if(Common.stopLoseBalanceNumber != 0 && Common.stopLoseBalanceNumber >= Common.availableamount) { //输到指定金额就停止
                                            this.isAutoBetting = false;
                                            // this.autoCountLabel.string = '';
                                        }
                                    }
                                    a.isRolling = false;
                                    a.isPlayAni = true;
                                    if(this.multipleReturn || this.soltItemReturn2 || this.soltItemReturn3) {
                                        await PromiseUtil.sleep(0.5);
                                    }
                                    if(this.multipleReturn) {
                                        this.multipleItemNode.setPosition(136, -115);
                                        cc.tween(this.multipleItemNode)
                                        .to(0.2, {position: new cc.Vec3(136, this.itemBingPosY)}, {easing: 'sineIn'})
                                        .call(()=>{
                                            if(a.special_symbols == '2' || a.special_symbols == '5' || a.special_symbols == '10') {
                                                SoundManager.playSoundById('beishu_' + a.special_symbols);
                                            }
                                        })
                                        .start();
                                    }
                                    if(this.soltItemReturn2) {
                                        this.slotItemNode_2.setPosition(-48, -115);
                                        cc.tween(this.slotItemNode_2)
                                        .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn3) {
                                        this.slotItemNode_3.setPosition(38, -115);
                                        cc.tween(this.slotItemNode_3)
                                        .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn2 || this.soltItemReturn3) {
                                        SoundManager.playSoundById('huizhuan');
                                    }
                                    // await PromiseUtil.sleep(0.1);
                                    if(a.symbols[0].lines[0] != '0' && a.symbols[0].lines[0] != '00') {
                                        SoundManager.playwildSoundById('bingo')
                                        a.slotItem_1[0].setRunAction();
                                        if(a.slotItem_2.length != 0) {
                                            a.slotItem_2[0].setRunAction();
                                        }
                                        if(a.slotItem_3.length != 0) {
                                            a.slotItem_3[0].setRunAction();
                                        }
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                    }
                                    else {
                                        if(a.slotItem_2[0] && a.symbols[0].lines[1] != '0' && a.symbols[0].lines[1] != '00') {
                                            SoundManager.playwildSoundById('bingo')
                                            a.slotItem_2[0].setRunAction();
                                            if(a.slotItem_3.length != 0) {
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        else {
                                            if(a.slotItem_3[0] && a.symbols[0].lines[2] != '0' && a.symbols[0].lines[2] != '00') {
                                                SoundManager.playwildSoundById('bingo')
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        if(a.multipleItems[0] && a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                    }
                                    if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                        a.updateSpecialsymbols(a.special_symbols);
                                    }
                                    else {
                                        this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                        if(a.profit / a.betmoney > 9) {
                                            await PromiseUtil.sleep(0.5);
                                            a.showWinAni(a.profit / a.betmoney);
                                        }
                                        else {
                                            if(a.profit > 0) {
                                                await PromiseUtil.sleep(1.5);
                                            }
                                            this.isPlayAni = false;
                                            if(this.isAutoBetting) {
                                                this.autoStartSpin();
                                            }
                                            else {
                                                if(!this.isAutoBetting) {
                                                    this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                    this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                    this.autoCountLabel.string = '';
                                                }    
                                            }
                                        }
                                    }
                                    
                                    
                                })
                                .start();
                            }
                            else{
                                SoundManager.playwildSoundById('roll_null');
                                this.slotItemNode_1.setPosition(-136, -164);
                                cc.tween(this.slotItemNode_1)
                                .to(0.2, {position: new cc.Vec3(-136, this.itemnoBingPosY)}, {easing: 'backOut'})
                                .call(async ()=>{
                                    this.orderidLabel.string = 'Transaction ' + this.order_id;
                                    
                                    if(Common.totalSpinNumber == 0) { //自动轮数剩余0的时候就停止
                                        this.isAutoBetting = false;
                                    }
                                    if(this.profit != 0) {
                                        // console.log('指定赢的金额>>', Common.stopwinBalanceNumber)
                                        if(Common.stopwinBalanceNumber != 0 && Common.stopwinBalanceNumber <= Common.availableamount) { //赢到指定金额就停止
                                            this.isAutoBetting = false;
                                        }
                                    }
                                    if(this.betmoney != 0 && this.profit == 0) {
                                        // console.log('指定输的金额>>', Common.stopLoseBalanceNumber)
                                        if(Common.stopLoseBalanceNumber != 0 && Common.stopLoseBalanceNumber >= Common.availableamount) { //输到指定金额就停止
                                            this.isAutoBetting = false;
                                            // this.autoCountLabel.string = '';
                                        }
                                    }
                                    a.isRolling = false;
                                    a.isPlayAni = true;
                                    if(this.multipleReturn || this.soltItemReturn2 || this.soltItemReturn3) {
                                        await PromiseUtil.sleep(0.5);
                                    }
                                    if(this.multipleReturn) {
                                        this.multipleItemNode.setPosition(136, -115);
                                        cc.tween(this.multipleItemNode)
                                        .to(0.2, {position: new cc.Vec3(136, this.itemBingPosY)}, {easing: 'sineIn'})
                                        .call(()=>{
                                            if(a.special_symbols == '2' || a.special_symbols == '5' || a.special_symbols == '10') {
                                                SoundManager.playSoundById('beishu_' + a.special_symbols);
                                            }
                                        })
                                        .start();
                                    }
                                    if(this.soltItemReturn2) {
                                        this.slotItemNode_2.setPosition(-48, -115);
                                        cc.tween(this.slotItemNode_2)
                                        .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn3) {
                                        this.slotItemNode_3.setPosition(38, -115);
                                        cc.tween(this.slotItemNode_3)
                                        .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                                        .start();
                                    }
                                    if(this.soltItemReturn2 || this.soltItemReturn3) {
                                        SoundManager.playSoundById('huizhuan');
                                    }
                                    // await PromiseUtil.sleep(0.1);
                                    if(a.profit > 0) {
                                        if(a.slotItem_2[0] && a.symbols[0].lines[1] != '0' && a.symbols[0].lines[1] != '00') {
                                            SoundManager.playwildSoundById('bingo')
                                            a.slotItem_2[0].setRunAction();
                                            if(a.slotItem_3.length != 0) {
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        else {
                                            if(a.slotItem_3[0] && a.symbols[0].lines[2] != '0' && a.symbols[0].lines[2] != '00') {
                                                SoundManager.playwildSoundById('bingo')
                                                a.slotItem_3[0].setRunAction();
                                            }
                                        }
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                        if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                            a.updateSpecialsymbols(a.special_symbols)
                                        }
                                        else {
                                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                            if(a.profit / a.betmoney > 9) {
                                                await PromiseUtil.sleep(0.5);
                                                this.showWinAni(a.profit / a.betmoney);
                                            }
                                            else {
                                                await PromiseUtil.sleep(1.5);
                                                this.isPlayAni = false;
                                                if(this.isAutoBetting) {
                                                    this.autoStartSpin();
                                                }
                                                else {
                                                    if(!this.isAutoBetting) {
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                        this.autoCountLabel.string = '';
                                                    }    
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if(a.multipleItems.length != 0) {
                                            a.multipleItems[0].setRunAction();
                                        }
                                        if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                                            a.updateSpecialsymbols(a.special_symbols)
                                        }
                                        else {
                                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                                            if(a.profit / a.betmoney > 9) {
                                                await PromiseUtil.sleep(0.5);
                                                this.showWinAni(a.profit / a.betmoney);
                                            }
                                            else {
                                                // await PromiseUtil.sleep(0.5);
                                                this.isPlayAni = false;
                                                if(this.isAutoBetting) {
                                                    this.autoStartSpin();
                                                }
                                                else {
                                                    if(!this.isAutoBetting) {
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                                        this.autoCountLabel.string = '';
                                                    }    
                                                }
                                            }
                                        }
                                    }
                                    // this.slotItem_2[0].setRunAction();
                                })
                                .start();
                            }

                        }
                        else {
                            let index = Math.floor(Math.random() * Common.itemType.length);
                             // console.log('index1>>', index);
                            let node = cc.instantiate(this.slotItem)
                            let item = node.getComponent(slotItem);
                            item.initView(Common.itemType[index]);
                            node.setPosition(0, 0);
                            this.slotItemNode_1.addChild(node);
                            this.slotItemNode_1.setPosition(-136, this.slotItemNode_1.y - targetPoint);
                        }
                    }
                    
                }
                else {
                    let index = Math.floor(Math.random() * Common.itemType.length);
                        // console.log('index1>>', index);
                    let node = cc.instantiate(this.slotItem)
                    let item = node.getComponent(slotItem);
                    item.initView(Common.itemType[index]);
                    node.setPosition(0, 0);
                    this.slotItemNode_1.addChild(node);
                    this.slotItemNode_1.setPosition(-136, this.slotItemNode_1.y - targetPoint);
                }
                
            }
            if(this.isBoxPlay_1) {
                if(this.symbols.length != 0) {
                    if(this.turboSpin.isChecked || this.isSpeed) {
                        this.isBoxPlay_1 = false;
                        // this.isGamePlay = false;
                        this.slotItemNode_2.removeAllChildren();
                        for(let i = 0; i < 5; i++) {
                            let index;
                            if(i == 2) {
                                if(this.symbols[0].lines[1] != null) {
                                    index = Common.itemType.indexOf(this.symbols[0].lines[1]);
                                }
                                else {
                                    index = Math.floor(Math.random() * Common.itemType.length);
                                }

                            }
                            else {
                                index = Math.floor(Math.random() * Common.itemType.length);
                            }
                            // let isReward = true;
                        // console.log('index1>>', index);
                            let node = cc.instantiate(this.slotItem)
                            let item = node.getComponent(slotItem);
                            item.initView(Common.itemType[index]);
                            if(this.symbols[0].lines[1] != null && i == 2) {
                                this.slotItem_2.push(item);
                            }
                            // if(i == 2 && isReward) {
                            //     this.slotItem_2.push(item);
                            // }
                            node.setPosition(0, 0);
                            this.slotItemNode_2.addChild(node);
                        }
                        if(this.symbols[0].lines[1] != null) {
                            this.soltItemReturn2 = Math.floor(Math.random() * 100) < 10 && this.profit > 0;
                            if(this.soltItemReturn2) {
                                this.slotItemNode_2.setPosition(-48, -74);
                                cc.tween(this.slotItemNode_2)
                                .to(0.2, {position: new cc.Vec3(-48, -84)}, {easing: 'backOut'})
                                .call(()=>{
                                    SoundManager.playwildSoundById('roll_null');
                                })
                                .start();
                            }
                            else {
                                this.slotItemNode_2.setPosition(-48, -115);
                                cc.tween(this.slotItemNode_2)
                                .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                                .call(()=>{
                                    SoundManager.playwildSoundById('roll_end')
                                })
                                .start();
                            }
                            //this.slotItem_2.push(item);
                        }
                        else{
                            this.slotItemNode_2.setPosition(-48, -164);
                            cc.tween(this.slotItemNode_2)
                            .to(0.2, {position: new cc.Vec3(-48, this.itemnoBingPosY)}, {easing: 'backOut'})
                            .call(()=>{
                                SoundManager.playwildSoundById('roll_null');
                            })
                            .start();
                        }
                    }
                    else {
                        if(curentPos1.y - targetPoint < endPosY1) {
                            this.isBoxPlay_1 = false;
                            // this.isGamePlay = false;
                            this.slotItemNode_2.removeAllChildren();
                            for(let i = 0; i < 5; i++) {
                                let index;
                                if(i == 2) {
                                    if(this.symbols[0].lines[1] != null) {
                                        index = Common.itemType.indexOf(this.symbols[0].lines[1]);
                                    }
                                    else {
                                        index = Math.floor(Math.random() * Common.itemType.length);
                                    }

                                }
                                else {
                                    index = Math.floor(Math.random() * Common.itemType.length);
                                }
                                // let isReward = true;
                            // console.log('index1>>', index);
                                let node = cc.instantiate(this.slotItem)
                                let item = node.getComponent(slotItem);
                                item.initView(Common.itemType[index]);
                                if(this.symbols[0].lines[1] != null && i == 2) {
                                    this.slotItem_2.push(item);
                                }
                                // if(i == 2 && isReward) {
                                //     this.slotItem_2.push(item);
                                // }
                                node.setPosition(0, 0);
                                this.slotItemNode_2.addChild(node);
                            }
                            if(this.symbols[0].lines[1] != null) {
                                SoundManager.playwildSoundById('roll_null');
                                this.soltItemReturn2 = Math.floor(Math.random() * 100) < 10 && this.profit > 0;
                                if(this.soltItemReturn2) {
                                    this.slotItemNode_2.setPosition(-48, -74);
                                    cc.tween(this.slotItemNode_2)
                                    .to(0.2, {position: new cc.Vec3(-48, -84)}, {easing: 'backOut'})
                                    .call(()=>{
                                        
                                    })
                                    .start();
                                }
                                else {
                                    SoundManager.playwildSoundById('roll_end')
                                    this.slotItemNode_2.setPosition(-48, -115);
                                    cc.tween(this.slotItemNode_2)
                                    .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                                    .call(()=>{
                                        
                                    })
                                    .start();
                                }
                                //this.slotItem_2.push(item);
                            }
                            else{
                                SoundManager.playwildSoundById('roll_null');
                                this.slotItemNode_2.setPosition(-48, -164);
                                cc.tween(this.slotItemNode_2)
                                .to(0.2, {position: new cc.Vec3(-48, this.itemnoBingPosY)}, {easing: 'backOut'})
                                .call(()=>{
                                    
                                })
                                .start();
                            }
                        }
                        else {
                            let index = Math.floor(Math.random() * Common.itemType.length);
                                // console.log('index1>>', index);
                            let node = cc.instantiate(this.slotItem)
                            let item = node.getComponent(slotItem);
                            item.initView(Common.itemType[index]);
                            node.setPosition(0, 0);
                            this.slotItemNode_2.addChild(node);
                            this.slotItemNode_2.setPosition(-48, this.slotItemNode_2.y - targetPoint);
                        }
                    }
                }
                else {
                    let index = Math.floor(Math.random() * Common.itemType.length);
                    // console.log('index1>>', index);
                    let node = cc.instantiate(this.slotItem)
                    let item = node.getComponent(slotItem);
                    item.initView(Common.itemType[index]);
                    node.setPosition(0, 0);
                    this.slotItemNode_2.addChild(node);
                    this.slotItemNode_2.setPosition(-48, this.slotItemNode_2.y - targetPoint);
                } 
            } 
            if(this.isBoxPlay_2 && !this.lockSolt.active) {
                if(this.symbols.length != 0) {
                    if(this.turboSpin.isChecked || this.isSpeed) {
                        this.isBoxPlay_2 = false;
                            // this.isGamePlay = false;
                        this.slotItemNode_3.removeAllChildren();
                        for(let i = 0; i < 5; i++) {
                            let index;
                            if(i == 2) {
                                if(this.symbols[0].lines[2] != null) {
                                    index = Common.itemType.indexOf(this.symbols[0].lines[2]);
                                }
                                else {
                                    index = Math.floor(Math.random() * Common.itemType.length);
                                }

                            }
                            else {
                                index = Math.floor(Math.random() * Common.itemType.length);
                            }
                        // console.log('index1>>', index);
                            let node = cc.instantiate(this.slotItem)
                            let item = node.getComponent(slotItem);
                            item.initView(Common.itemType[index]);
                            if(this.symbols[0].lines[2] != null && i == 2) {
                                this.slotItem_3.push(item);
                            }
                            // if(i == 2 && isReward) {
                            //     this.slotItem_3.push(item);
                            // }
                            node.setPosition(0, 0);
                            this.slotItemNode_3.addChild(node);
                        }
                        if(this.symbols[0].lines[2] != null) {
                            SoundManager.playwildSoundById('roll_end');
                            this.soltItemReturn3 = Math.floor(Math.random() * 100) < 10 && this.profit > 0;
                            if(this.soltItemReturn3) {
                                this.slotItemNode_3.setPosition(38, -74);
                                cc.tween(this.slotItemNode_3)
                                .to(0.2, {position: new cc.Vec3(38, -84)}, {easing: 'backOut'})
                                .call(()=>{
                                    
                                })
                                .start();
                            }
                            else {
                                SoundManager.playwildSoundById('roll_null');
                                this.slotItemNode_3.setPosition(38, -115);
                                cc.tween(this.slotItemNode_3)
                                .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                                .call(()=>{
                                    
                                })
                                .start();
                            }
                            // this.slotItem_3.push(item);  
                        }
                        else{
                            SoundManager.playwildSoundById('roll_null');
                            this.slotItemNode_3.setPosition(38, -164);
                            cc.tween(this.slotItemNode_3)
                            .to(0.2, {position: new cc.Vec3(38, this.itemnoBingPosY)}, {easing: 'backOut'})
                            .call(()=>{
                                
                            })
                            .start();
                        }
                    }
                    else {
                        if(curentPos2.y - targetPoint < endPosY2) {
                            this.isBoxPlay_2 = false;
                            // this.isGamePlay = false;
                            this.slotItemNode_3.removeAllChildren();
                            for(let i = 0; i < 5; i++) {
                                let index;
                                if(i == 2) {
                                    if(this.symbols[0].lines[2] != null) {
                                        index = Common.itemType.indexOf(this.symbols[0].lines[2]);
                                    }
                                    else {
                                        index = Math.floor(Math.random() * Common.itemType.length);
                                    }

                                }
                                else {
                                    index = Math.floor(Math.random() * Common.itemType.length);
                                }
                            // console.log('index1>>', index);
                                let node = cc.instantiate(this.slotItem)
                                let item = node.getComponent(slotItem);
                                item.initView(Common.itemType[index]);
                                if(this.symbols[0].lines[2] != null && i == 2) {
                                    this.slotItem_3.push(item);
                                }
                                // if(i == 2 && isReward) {
                                //     this.slotItem_3.push(item);
                                // }
                                node.setPosition(0, 0);
                                this.slotItemNode_3.addChild(node);
                            }
                            if(this.symbols[0].lines[2] != null) {
                                SoundManager.playwildSoundById('roll_end');
                                this.soltItemReturn3 = Math.floor(Math.random() * 100) < 10 && this.profit > 0;
                                if(this.soltItemReturn3) {
                                    this.slotItemNode_3.setPosition(38, -74);
                                    cc.tween(this.slotItemNode_3)
                                    .to(0.2, {position: new cc.Vec3(38, -84)}, {easing: 'backOut'})
                                    .call(()=>{
                                        
                                    })
                                    .start();
                                }
                                else {
                                    SoundManager.playwildSoundById('roll_null');
                                    this.slotItemNode_3.setPosition(38, -115);
                                    cc.tween(this.slotItemNode_3)
                                    .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                                    .call(()=>{
                                        
                                    })
                                    .start();
                                }
                                // this.slotItem_3.push(item);  
                            }
                            else{
                                SoundManager.playwildSoundById('roll_null');
                                this.slotItemNode_3.setPosition(38, -164);
                                cc.tween(this.slotItemNode_3)
                                .to(0.2, {position: new cc.Vec3(38, this.itemnoBingPosY)}, {easing: 'backOut'})
                                .call(()=>{
                                    
                                })
                                .start();
                            }
                        }
                        else {
                            let index = Math.floor(Math.random() * Common.itemType.length);
                                // console.log('index1>>', index);
                            let node = cc.instantiate(this.slotItem)
                            let item = node.getComponent(slotItem);
                            item.initView(Common.itemType[index]);
                            node.setPosition(0, 0);
                            this.slotItemNode_3.addChild(node);
                            this.slotItemNode_3.setPosition(38, this.slotItemNode_3.y - targetPoint);
                        }
                    }
                }
                else {
                    let index = Math.floor(Math.random() * Common.itemType.length);
                        // console.log('index1>>', index);
                    let node = cc.instantiate(this.slotItem)
                    let item = node.getComponent(slotItem);
                    item.initView(Common.itemType[index]);
                    node.setPosition(0, 0);
                    this.slotItemNode_3.addChild(node);
                    this.slotItemNode_3.setPosition(38, this.slotItemNode_3.y - targetPoint);
                }
            } 
            if(this.isBoxPlay_3) {
                if(this.symbols.length != 0) {
                    if(this.turboSpin.isChecked || this.isSpeed) {
                        this.isBoxPlay_3 = false;
                        this.multipleItemNode.removeAllChildren();
                        for(let i = 0; i < 5; i++) {
                            let multiple;
                            if(i == 2) {
                                if(this.special_symbols != null){
                                    multiple =  Common.multipleArr[Common.multipleArrServer.indexOf(this.special_symbols)];
                                }
                                else {
                                    multiple = Common.multipleArr[Math.floor(Math.random() * Common.multipleArr.length)];
                                }
                            }
                            else {
                                multiple = Common.multipleArr[Math.floor(Math.random() * Common.multipleArr.length)];
                            }
                            // let isReward = true;
                        // console.log('index1>>', index);
                            let node = cc.instantiate(this.multipleItem)
                            let item = node.getComponent(multipleItem);
                            item.initView(multiple);
                            node.setPosition(0, 0);
                            if(i == 2 && this.special_symbols != null) {
                                this.multipleItems.push(item);
                            }
                            this.multipleItemNode.addChild(node);
                        }
                        if(this.special_symbols != null) {
                            this.multipleReturn = Math.floor(Math.random() * 100) < 10 && this.profit > 0;
                            if(this.multipleReturn) {
                                this.multipleItemNode.setPosition(136, -74);
                                cc.tween(this.multipleItemNode)
                                .to(0.2, {position: new cc.Vec3(136, -84)}, {easing: 'backOut'})
                                .call(()=>{
                                    SoundManager.playwildSoundById('roll_end');
                                })
                                .start();
                            }
                            else {
                                this.multipleItemNode.setPosition(136, -115);
                                cc.tween(this.multipleItemNode)
                                .to(0.2, {position: new cc.Vec3(136, this.itemBingPosY)}, {easing: 'backOut'})
                                .call(()=>{
                                    if(a.special_symbols == '2' || a.special_symbols == '5' || a.special_symbols == '10') {
                                        SoundManager.playSoundById('beishu_' + a.special_symbols);
                                    }
                                    else {
                                        SoundManager.playwildSoundById('roll_null');
                                    }
                                })
                                .start();
                            }
                        }
                        else{
                            SoundManager.playwildSoundById('roll_null');
                            this.multipleItemNode.setPosition(136, -160);
                            cc.tween(this.multipleItemNode)
                            .to(0.2, {position: new cc.Vec3(136, -170)}, {easing: 'backOut'})
                            .start();
                        }
                    }
                    else {
                        if(curentPos3.y - targetPoint < endPosY3) {
                            this.isBoxPlay_3 = false;
                            this.multipleItemNode.removeAllChildren();
                            for(let i = 0; i < 5; i++) {
                                let multiple;
                                if(i == 2) {
                                    if(this.special_symbols != null){
                                        multiple =  Common.multipleArr[Common.multipleArrServer.indexOf(this.special_symbols)];
                                    }
                                    else {
                                        multiple = Common.multipleArr[Math.floor(Math.random() * Common.multipleArr.length)];
                                    }
                                }
                                else {
                                    multiple = Common.multipleArr[Math.floor(Math.random() * Common.multipleArr.length)];
                                }
                                // let isReward = true;
                            // console.log('index1>>', index);
                                let node = cc.instantiate(this.multipleItem)
                                let item = node.getComponent(multipleItem);
                                item.initView(multiple);
                                node.setPosition(0, 0);
                                if(i == 2 && this.special_symbols != null) {
                                    this.multipleItems.push(item);
                                }
                                this.multipleItemNode.addChild(node);
                            }
                            if(this.special_symbols != null) {
                                this.multipleReturn = Math.floor(Math.random() * 100) < 10 && this.profit > 0;
                                if(this.multipleReturn) {
                                    this.multipleItemNode.setPosition(136, -74);
                                    cc.tween(this.multipleItemNode)
                                    .to(0.2, {position: new cc.Vec3(136, -84)}, {easing: 'backOut'})
                                    .call(()=>{
                                        SoundManager.playwildSoundById('roll_end');
                                    })
                                    .start();
                                }
                                else {
                                    this.multipleItemNode.setPosition(136, -115);
                                    cc.tween(this.multipleItemNode)
                                    .to(0.2, {position: new cc.Vec3(136, this.itemBingPosY)}, {easing: 'backOut'})
                                    .call(()=>{
                                        if(a.special_symbols == '2' || a.special_symbols == '5' || a.special_symbols == '10') {
                                            SoundManager.playSoundById('beishu_' + a.special_symbols);
                                        }
                                        else {
                                            SoundManager.playwildSoundById('roll_end');
                                        }
                                    })
                                    .start();
                                }
                            }
                            else{
                                SoundManager.playwildSoundById('roll_null');
                                this.multipleItemNode.setPosition(136, -160);
                                cc.tween(this.multipleItemNode)
                                .to(0.2, {position: new cc.Vec3(136, -170)}, {easing: 'backOut'})
                                // .call(()=>{
                                //     SoundManager.playSoundById('roll_null');
                                // })
                                .start();
                            }
                        }
                        else {
                            let index = Math.floor(Math.random() * Common.multipleArr.length);
                        // console.log('index1>>', index);
                            let node = cc.instantiate(this.multipleItem)
                            let item = node.getComponent(multipleItem);
                            item.initView(Common.multipleArr[index]);
                            node.setPosition(0, 0);
                            this.multipleItemNode.addChild(node);
                            this.multipleItemNode.setPosition(136, this.multipleItemNode.y - targetPoint);
                        }
                    }
                }
                else {
                    let index = Math.floor(Math.random() * Common.multipleArr.length);
                // console.log('index1>>', index);
                    let node = cc.instantiate(this.multipleItem)
                    let item = node.getComponent(multipleItem);
                    item.initView(Common.multipleArr[index]);
                    node.setPosition(0, 0);
                    this.multipleItemNode.addChild(node);
                    this.multipleItemNode.setPosition(136, this.multipleItemNode.y - targetPoint);
                }
            }
        }
    }

    async runEffect(){
        if(this.betmoney == 1 || this.betmoney == 5 || this.betmoney == 10) {
            cc.tween(this.select_10)
            .to(0.9, {opacity: 255}, { easing: 'sineOut' })
            .start()
        }
        else {
            cc.tween(this.select_50)
            .to(0.9, {opacity: 255}, { easing: 'sineOut' })
            .start()
        }
        cc.tween(this.light_effect)
        .to(0.25, {opacity: 255, scale: 0.5}, { easing: 'sineOut' })
        .to(0.4, {opacity: 0, scale: 0}, { easing: 'sineIn'})
        .union()
        .start()

        await PromiseUtil.sleep(0.2);
        this.light_effect1.active = true;
        cc.tween(this.light_effect1)
        .to(0.4, {opacity: 0, height: 0, width: 300}, { easing: 'sineOut'})
        .call(()=>{
            this.light_effect1.active = false;
            this.light_effect1.opacity = 255;
            this.light_effect1.width = 42;
            this.light_effect1.height = 42;
        })
        .start()
    }

    onSeletcBetMoney(event: any, customEventData: any) {
        this.betmoney = Number(customEventData);
        this.bettingLabel.string = 'Bet' + Common.moneyStr + ' ' +  this.betmoney.toLocaleString();
        this.slotItem_1 = [];
        this.slotItem_2 = [];
        this.slotItem_3 = [];
        this.multipleItems = [];
        this.slotItemNode_1.removeAllChildren();
        this.slotItemNode_2.removeAllChildren();
        this.slotItemNode_3.removeAllChildren();
        this.multipleItemNode.removeAllChildren();
        this.isPlay = true;
        this.turnPlay.node.active = false
        this.turnPlayEnd.node.active = false;
        this.titleNode.active = true;
        this.bigAwardNode.active = false;
        this.bigAwardNode.scaleY = 0;
        this.special_profitLabel.string = '0.00';
        this.select_10.opacity = 0;
        this.select_50.opacity = 0;
        this.select_10.active = true;
        this.select_50.active = true;
        if(this.betmoney == 1) {
            this.light_effect.y = this.light_effect1.y = -41
            this.runEffect();
            // this.runEffect();
            this.lockZhuangpan(true);
            // this.replaceSpriteFrame('bet1');
            this.updeteTitleTip('bet1', 'bet5');
            this.titleNode.getChildByName('mask').y = -10;
            // this.select_10.active = true;
            // this.select_50.active = false;
            this.roulettebg_green.active = true;
            this.roulettebg_red.active = false;
            this.iconBg_green.active = true;
            this.iconBg_red.active = false;
            // this.lockSolt.active = true;
            this.lockSlot(true);
            Common.turntableItemmMoney = [1000, 100, 25, 500, 75, 150, 50, 250];
        }
        else if(this.betmoney == 5) {
            this.light_effect.y = this.light_effect1.y = -41
            this.runEffect();
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet5');
            this.updeteTitleTip('bet5', 'bet10');
            this.titleNode.getChildByName('mask').y = -10;
            // this.select_10.active = true;
            // this.select_50.active = false;
            this.roulettebg_green.active = true;
            this.roulettebg_red.active = false;
            this.iconBg_green.active = true;
            this.iconBg_red.active = false;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [1000, 100, 25, 500, 75, 150, 50, 250];
        }
        else if(this.betmoney == 10) {
            this.light_effect.y = this.light_effect1.y = -41
            this.runEffect();
            SoundManager.playSoundById('seletc_100');
            this.moneySelectAni.node.active = true;
            this.moneySelectAni.setAnimation(0, 'besqiehuan', false);
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet10');
            this.updeteTitleTip('bet10', 'bet50');
            this.titleNode.getChildByName('mask').y = -10;
            // this.select_10.active = true;
            // this.select_50.active = false;
            this.roulettebg_green.active = true;
            this.roulettebg_red.active = false;
            this.iconBg_green.active = true;
            this.iconBg_red.active = false;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [2000, 200, 50, 1000, 150, 300, 100, 500];
        }
        else if(this.betmoney == 50) {
            this.light_effect.y = this.light_effect1.y = -12;
            this.runEffect();
            SoundManager.playSoundById('seletc_100');
            this.moneySelectAni.node.active = true;
            this.moneySelectAni.setAnimation(0, 'besqiehuan', false);
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet50');
            this.updeteTitleTip('bet10', 'bet50');
            this.titleNode.getChildByName('mask').y = -41;
            // this.select_10.active = false;
            // this.select_50.active = true;
            this.roulettebg_green.active = false;
            this.roulettebg_red.active = true;
            this.iconBg_green.active = false;
            this.iconBg_red.active = true;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [50000, 2000, 500, 25000, 1500, 5000, 1000, 10000];
        }
        else if(this.betmoney == 100) {
            this.light_effect.y = this.light_effect1.y = -12;
            this.runEffect();
            SoundManager.playSoundById('seletc_100');
            this.moneySelectAni.node.active = true;
            this.moneySelectAni.setAnimation(0, 'besqiehuan', false);
            this.lockZhuangpan(false);
            this.replaceSpriteFrame('bet100');
            this.updeteTitleTip('bet10', 'bet50');
            this.titleNode.getChildByName('mask').y = -41;
            // this.select_10.active = false;
            // this.select_50.active = true;
            this.roulettebg_green.active = false;
            this.roulettebg_red.active = true;
            this.iconBg_green.active = false;
            this.iconBg_red.active = true;
            // this.lockSolt.active = false;
            this.lockSlot(false);
            Common.turntableItemmMoney = [100000, 5000, 1000, 50000, 3000, 10000, 2000, 20000];
        }
        if(this.betmoney == 50 || this.betmoney == 100) {
            Common.itemType = ['00', '0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'x10', 'all_respin', 'scatter_100'];
            Common.multipleArrServer = ['2', '5', '10', 'all_respin', 'scatter_red'];
        }
        else if(this.betmoney == 10) {
            Common.itemType = ['0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'x10', 'all_respin', 'scatter'];
            Common.multipleArrServer = ['2', '5', '10', 'all_respin', 'scatter_green'];
        }
        else if(this.betmoney == 5) {
            Common.itemType = ['0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'all_respin', 'scatter'];
            Common.multipleArrServer = ['2', '5', 'all_respin', 'scatter_green'];
        }
        else{
            Common.itemType = ['0', '1', '5', '10'];
            Common.multipleArr = ['x2', 'x5', 'all_respin'];
            Common.multipleArrServer = ['2', '5', 'all_respin'];
        }
        this.initSlotItem();
        this.hideBetSetView();
        cc.sys.localStorage.setItem('betmoney', this.betmoney)
    }

    /**
     * 锁住转盘
     * @param isLock
     */
    async lockZhuangpan(isLock: boolean = true) {
        this.lockNode.active = isLock;
        if(isLock) {
            this.chainAni.node.active = true;
            this.chainAni.setAnimation(0, 'jiasuo', false)
        }
        else {
            if(this.chainAni.node.active) {
                this.chainAni.setAnimation(0, 'jiesuo', false);
                await PromiseUtil.sleep(0.5);
                this.chainAni.node.active = false;
            }            
        }
        
    }

    async lockSlot(isLock: boolean = true) {
        if(isLock) {
            this.lockSolt.active = true;
            this.lockAni.node.active = true;
            this.lockAni.setAnimation(0, 'openlock', false);
            await PromiseUtil.sleep(0.5);
            SoundManager.playSoundById('lock');
        }
        else {
            if(this.lockAni.node.active) {
                this.lockAni.setAnimation(0, 'closlock', false);
                await PromiseUtil.sleep(0.5);
                SoundManager.playwildSoundById('unlock');
                SoundManager.playSoundById('unlock_1');
                await PromiseUtil.sleep(0.5);
                this.lockAni.node.active = false;
            }
            this.lockSolt.active = false;
        }
    }

    replaceSpriteFrame(type: string) {
        let a = this;
        cc.tween(this.betImage)
        .to(0.2, {opacity: 0})
        .call(()=>{
            var frame = a.betImageAtlas.getSpriteFrame(type);
            a.betImage.getComponent(cc.Sprite).spriteFrame = frame;
        })
        .to(0.2, { opacity: 255})
        .start();
    }

    

    updeteTitleTip(currentLevel: string, nextLevel: string) {
        this.titleNode.getChildByName('bet1').active = false;
        this.titleNode.getChildByName('bet5').active = false;
        this.titleNode.getChildByName('bet10').active = false;
        this.titleNode.getChildByName('bet50').active = false;
        this.titleNode.getChildByName(currentLevel).active = true;
        this.titleNode.getChildByName(nextLevel).active = true;
        if(currentLevel == 'bet1') {
            this.titleNode.getChildByName(currentLevel).y = -29;
            this.titleNode.getChildByName(nextLevel).y = 4;
        }
        else if(currentLevel == 'bet5') {
            this.titleNode.getChildByName(currentLevel).y = -29;
            this.titleNode.getChildByName(nextLevel).y = 3;
        }
        else if(currentLevel == 'bet10' || currentLevel == 'bet50') {
            this.titleNode.getChildByName(currentLevel).y = -29;
            this.titleNode.getChildByName(nextLevel).y = 1;
        }
        // this.titleNode.getChildByName(currentLevel).y = -26;
        // this.titleNode.getChildByName(nextLevel).y = 4;
    }

    /**
     * 再转一次
     * @param dt 
     */
    allRespinRoll(dt: number) {
        if(this.isAllRespinRoll) {
            let curentPos = this.slotItemNode_1.position;
            let curentPos1 = this.slotItemNode_2.position;
            let curentPos2 = this.slotItemNode_3.position;
            let curentPos3 = this.multipleItemNode.position;
            let targetPoint = 1800 * dt;
            let endPosY = this.lockSolt.active ? -2620 : -3420;
            let endPosY1 = this.lockSolt.active ? -1820 : -2620;
            let endPosY2 = -1820;
            let endPosY3 = -1020;
            let a = this;
            if(this.start1) {
                let index = Math.floor(Math.random() * Common.itemType.length);
                        // console.log('index1>>', index);
                let node = cc.instantiate(this.slotItem)
                let item = node.getComponent(slotItem);
                item.initView(Common.itemType[index]);
                node.setPosition(0, 0);
                this.slotItemNode_1.addChild(node);
                this.slotItemNode_1.setPosition(-136, this.slotItemNode_1.y - targetPoint);
            }
            else {
                this.isAllRespinRoll = false;
                this.unschedule(this.allRespinRoll);
                this.slotItemNode_1.removeAllChildren();
                for(let i = 0; i < 5; i++) {
                    let index;
                    if(i == 2) {
                        if(this.symbols[1].lines[0] != null) {
                            index = Common.itemType.indexOf(this.symbols[1].lines[0]);
                        }
                        else {
                            index = Math.floor(Math.random() * Common.itemType.length);
                        }

                    }
                    else {
                        index = Math.floor(Math.random() * Common.itemType.length);
                    }
                    // let isReward = false;
                    // console.log('index1>>', index);
                    let node = cc.instantiate(this.slotItem)
                    let item = node.getComponent(slotItem);
                    item.initView(Common.itemType[index]);
                    if(i == 2 && this.symbols[1].lines[0] != null) {
                        this.slotItem_1.push(item);
                    }
                    // if(i == 2) {
                    //     this.slotItem_1.push(item);
                    // }
                    node.setPosition(0, 0);
                    this.slotItemNode_1.addChild(node);
                }
                if(this.symbols[1].lines[0] != null) {
                    this.slotItemNode_1.setPosition(-136, -115);
                    cc.tween(this.slotItemNode_1)
                    .to(0.2, {position: new cc.Vec3(-136, this.itemBingPosY)}, {easing: 'backOut'})
                    .call(async ()=>{
                        SoundManager.playwildSoundById('roll_end')
                        // a.isPlayAni = false;
                        // a.isRolling = false;
                        a.special_profitLabel.string = a.special_profit.toFixed(2);
                        if(a.symbols[1].lines[0] != '0' && a.symbols[1].lines[0] != '00') {
                            a.slotItem_1[0].setRunAction();
                            if(a.slotItem_2.length != 0) {
                                a.slotItem_2[0].setRunAction();
                            }
                            if(a.slotItem_3.length != 0) {
                                a.slotItem_3[0].setRunAction();
                            }
                        }
                        else {
                            if(a.slotItem_2[0] && a.symbols[1].lines[1] != '0' && a.symbols[1].lines[1] != '00') {
                                a.slotItem_2[0].setRunAction();
                                if(a.slotItem_3.length != 0) {
                                    a.slotItem_3[0].setRunAction();
                                }
                            }
                            else {
                                if(a.slotItem_3[0] && a.symbols[1].lines[2] != '0' && a.symbols[1].lines[2] != '00') {
                                    a.slotItem_3[0].setRunAction();
                                }
                            }
                            
                            if(a.multipleItems[0] && a.multipleItems.length != 0) {
                                a.multipleItems[0].setRunAction();
                            }
                        }
                        // if(a.special_symbols == 'all_respin' || a.special_symbols == 'scatter_green' || a.special_symbols == 'scatter_red') {
                        //     a.updateSpecialsymbols(a.special_symbols);
                        // }
                        // else {
                        this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                        if(a.profit / a.betmoney > 9) {
                            await PromiseUtil.sleep(0.5);
                            a.showWinAni(a.profit / a.betmoney);
                        }
                        else {
                            await PromiseUtil.sleep(1.5);
                            a.isPlayAni = false;
                            if(this.isAutoBetting && !this.isPlayAni) {
                                this.autoStartSpin();
                            }
                            else {
                                if(!this.isAutoBetting) {
                                    this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                    this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                    this.autoCountLabel.string = '';
                                }    
                            }
                        }
                        //this.special_profitLabel.string = this.special_profit.toFixed(2);                        
                        
                    })
                    .start();
                }
                else{
                    this.slotItemNode_1.setPosition(-136, -164);
                    cc.tween(this.slotItemNode_1)
                    .to(0.2, {position: new cc.Vec3(-136, this.itemnoBingPosY)}, {easing: 'backOut'})
                    .call(async ()=>{
                        SoundManager.playwildSoundById('roll_null')
                        // a.isRolling = false;
                        a.special_profitLabel.string = a.special_profit.toFixed(2);
                        if(a.profit > 0) {
                            if(a.slotItem_2[0] && a.symbols[1].lines[1] != '0' && a.symbols[1].lines[1] != '00') {
                                a.slotItem_2[0].setRunAction();
                                if(a.slotItem_3.length != 0) {
                                    a.slotItem_3[0].setRunAction();
                                }
                            }
                            else{
                                if(a.slotItem_3[0] && a.symbols[1].lines[2] != '0' && a.symbols[1].lines[2] != '00') {
                                    a.slotItem_3[0].setRunAction();
                                    
                                }
                            }
                            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
                            if(a.profit / a.betmoney > 9) {
                                await PromiseUtil.sleep(0.5);
                                this.showWinAni(a.profit / a.betmoney);
                            }
                            else {
                                await PromiseUtil.sleep(1.5);
                                a.isPlayAni = false;
                                if(this.isAutoBetting && !this.isPlayAni) {
                                    this.autoStartSpin();
                                }
                                else {
                                    if(!this.isAutoBetting) {
                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                        this.autoCountLabel.string = '';
                                    }    
                                }
                            }
                            // }
                        }
                        else {
                            await PromiseUtil.sleep(0.5);
                            a.isPlayAni = false;
                            if(this.isAutoBetting && !this.isPlayAni) {
                                this.autoStartSpin();
                            }
                            else {
                                if(!this.isAutoBetting) {
                                    this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                                    this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                                    this.autoCountLabel.string = '';
                                }    
                            }
                        }
                        // this.slotItem_2[0].setRunAction();
                    })
                    .start();
                }
            }
            if(this.start2) {
                let index = Math.floor(Math.random() * Common.itemType.length);
                        // console.log('index1>>', index);
                let node = cc.instantiate(this.slotItem)
                let item = node.getComponent(slotItem);
                item.initView(Common.itemType[index]);
                node.setPosition(0, 0);
                this.slotItemNode_2.addChild(node);
                this.slotItemNode_2.setPosition(-48, this.slotItemNode_2.y - targetPoint);
            }
            else {
                this.slotItemNode_2.removeAllChildren();
                for(let i = 0; i < 5; i++) {
                    let index;
                    if(i == 2) {
                        if(this.symbols[1].lines[1] != null) {
                            index = Common.itemType.indexOf(this.symbols[1].lines[1]);
                        }
                        else {
                            index = Math.floor(Math.random() * Common.itemType.length);
                        }

                    }
                    else {
                        index = Math.floor(Math.random() * Common.itemType.length);
                    }
                    // let isReward = true;
                // console.log('index1>>', index);
                    let node = cc.instantiate(this.slotItem)
                    let item = node.getComponent(slotItem);
                    item.initView(Common.itemType[index]);
                    if(this.symbols[1].lines[1] != null && i == 2) {
                        this.slotItem_2.push(item);
                    }
                    // if(i == 2 && isReward) {
                    //     this.slotItem_2.push(item);
                    // }
                    node.setPosition(0, 0);
                    this.slotItemNode_2.addChild(node);
                }
                if(this.symbols[1].lines[1] != null) {
                    //this.slotItem_2.push(item);
                    this.slotItemNode_2.setPosition(-48, -115);
                    cc.tween(this.slotItemNode_2)
                    .to(0.2, {position: new cc.Vec3(-48, this.itemBingPosY)}, {easing: 'backOut'})
                    .call(()=>{
                        SoundManager.playwildSoundById('roll_end')
                    })
                    .start();
                    }
                else{
                    this.slotItemNode_2.setPosition(-48, -164);
                    cc.tween(this.slotItemNode_2)
                    .to(0.2, {position: new cc.Vec3(-48, this.itemnoBingPosY)}, {easing: 'backOut'})
                    .call(()=>{
                        SoundManager.playwildSoundById('roll_null')
                    })
                    .start();
                }
            }
            if(this.start3 && !this.lockSolt.active) {
                let index = Math.floor(Math.random() * Common.itemType.length);
                        // console.log('index1>>', index);
                let node = cc.instantiate(this.slotItem)
                let item = node.getComponent(slotItem);
                item.initView(Common.itemType[index]);
                node.setPosition(0, 0);
                this.slotItemNode_3.addChild(node);
                this.slotItemNode_3.setPosition(38, this.slotItemNode_3.y - targetPoint);
            }
            else {
                if(this.respinPlay3 && !this.lockSolt.active) {
                    this.respinPlay3 = false;
                    this.slotItemNode_3.removeAllChildren();
                    for(let i = 0; i < 5; i++) {
                        let index;
                        if(i == 2) {
                            if(this.symbols[1].lines[2] != null) {
                                index = Common.itemType.indexOf(this.symbols[1].lines[2]);
                            }
                            else {
                                index = Math.floor(Math.random() * Common.itemType.length);
                            }

                        }
                        else {
                            index = Math.floor(Math.random() * Common.itemType.length);
                        }
                    // console.log('index1>>', index);
                        let node = cc.instantiate(this.slotItem)
                        let item = node.getComponent(slotItem);
                        item.initView(Common.itemType[index]);
                        if(this.symbols[1].lines[2] != null && i == 2) {
                            this.slotItem_3.push(item);
                        }
                        // if(i == 2 && isReward) {
                        //     this.slotItem_3.push(item);
                        // }
                        node.setPosition(0, 0);
                        this.slotItemNode_3.addChild(node);
                    }
                    if(this.symbols[1].lines[2] != null) {
                        // this.slotItem_3.push(item);
                        this.slotItemNode_3.setPosition(38, -115);
                        cc.tween(this.slotItemNode_3)
                        .to(0.2, {position: new cc.Vec3(38, this.itemBingPosY)}, {easing: 'backOut'})
                        .call(()=>{
                            SoundManager.playwildSoundById('roll_end')
                        })
                        .start();
                        }
                    else{
                        this.slotItemNode_3.setPosition(38, -164);
                        cc.tween(this.slotItemNode_3)
                        .to(0.2, {position: new cc.Vec3(38, this.itemnoBingPosY)}, {easing: 'backOut'})
                        .call(()=>{
                            SoundManager.playwildSoundById('roll_null')
                        })
                        .start();
                    }
                }
            }
        }
    }

    private isAllRespinRoll: boolean = false;
    private start1: boolean = true;
    private start2: boolean = true;
    private start3: boolean = true;
    private respinPlay3: boolean = false;
    async updateSpecialsymbols(type: string) {
        this.titleNode.active = false;
        this.bigAwardNode.active = true;
        this.symbols_profitLabel.string = this.symbols_profit.toFixed(2);
        cc.tween(this.bigAwardNode)
        .to(0.2, {scaleY: 1})
        .start();
        let a = this;
        if(type == 'all_respin'){
            SoundManager.playSoundById('luck_respin1');
            // this.isPlayAni = true;
            this.bigAwardNode.getChildByName('blue_bg').active = true;
            this.bigAwardNode.getChildByName('green_bg').active = false;
            this.bigAwardNode.getChildByName('red_bg').active = false;
            this.bigAwardNode.getChildByName('respin').active = true;
            this.bigAwardNode.getChildByName('scatter').active = false;
            this.bigAwardNode.getChildByName('supperscatter').active = false;
            await PromiseUtil.sleep(0.5);
            this.all_respinEffect.node.active = true;
            if(!this.lockSolt.active) {
                if(a.profit / this.betmoney >= 50) {
                    this.all_respinEffect.setAnimation(0, 'allwin2', false);
                }
                else {
                    this.all_respinEffect.setAnimation(0, 'allwin', false);
                }
                
            }
            else {
                if(a.profit / this.betmoney >= 50) {
                    this.all_respinEffect.setAnimation(0, 'allwin4', false);
                }
                else {
                    this.all_respinEffect.setAnimation(0, 'allwin3', false);
                }
            }
            this.all_respinEffect.setEventListener((trackEntry, event)=>{
                // // 在这里处理事件
                if(event.data.name == 'shot1') {
                    a.start3 = false;
                }
                else if(event.data.name == 'shot2') {
                    a.start2 = false;
                    a.start1 = false;
                }
                console.log(`动画事件：${event.data.name}, 参数：${event.stringValue}`);
            });
            this.slotItem_1 = [];
            this.slotItem_2 = [];
            this.slotItem_3 = [];
            this.start1 = true;
            this.start2 = true;
            this.start3 = true;
            this.respinPlay3 = true;
            await PromiseUtil.sleep(1);
            this.isAllRespinRoll = true;
            SoundManager.playSoundById('respin');
            this.schedule(this.allRespinRoll, 0.01);
        }
        else if(type == 'scatter_green') {
            SoundManager.playSoundById('luck_turn');
            // this.isPlayAni = true;
            this.bigAwardNode.getChildByName('blue_bg').active = false;
            this.bigAwardNode.getChildByName('green_bg').active = true;
            this.bigAwardNode.getChildByName('red_bg').active = false;
            this.bigAwardNode.getChildByName('respin').active = false;
            this.bigAwardNode.getChildByName('scatter').active = true;
            this.bigAwardNode.getChildByName('supperscatter').active = false;

            await PromiseUtil.sleep(1);
            this.turnStartParticle.resetSystem();
            this.turnStartParticleAnimation = this.turnStartParticle.getComponent(cc.Animation);
            this.turnStartParticleAnimation.play();
            this.turnStartAni.node.active = true;
            this.turnStartAni.setAnimation(0, 'greenwinstars', false);
            this.turnStartAnimation = this.turnStartAni.getComponent(cc.Animation);
            if(this.turnStartAnimation) {
                this.turnStartAnimation.play();
                this.turnStartAnimation.on('finished', this.onturnStartAnimationFinished, this);
            }
        }
        else if(type == 'scatter_red') {
            SoundManager.playSoundById('luck_turn1');
            // this.isPlayAni = true;
            this.bigAwardNode.getChildByName('blue_bg').active = false;
            this.bigAwardNode.getChildByName('green_bg').active = false;
            this.bigAwardNode.getChildByName('red_bg').active = true;
            this.bigAwardNode.getChildByName('respin').active = false;
            this.bigAwardNode.getChildByName('scatter').active = false;
            this.bigAwardNode.getChildByName('supperscatter').active = true;
            await PromiseUtil.sleep(1);
            this.turnStartParticle.resetSystem();
            this.turnStartParticleAnimation = this.turnStartParticle.getComponent(cc.Animation);
            this.turnStartParticleAnimation.play();
            this.turnStartAni.node.active = true;
            this.turnStartAni.setAnimation(0, 'greenwinstars', false);
            this.turnStartAnimation = this.turnStartAni.getComponent(cc.Animation);
            if(this.turnStartAnimation) {
                this.turnStartAnimation.play();
                this.turnStartAnimation.on('finished', this.onturnStartAnimationFinished, this);
            }
            
        }
        
    }

    onturnStartAnimationFinished() {
        this.turnStartParticle.stopSystem();
        this.turnStartAni.node.active = false;
        this.turnStartAni.node.position = new cc.Vec3(136, -207);
        this.turnEndAni.node.active = true;
        if(this.special_symbols == 'scatter_green') {
            this.turnEndAni.setAnimation(0, 'xzpwinstars', false);
            this.isPlay = false;
            this.startTurn();
        }
        else if(this.special_symbols == 'scatter_red') {
            this.turnEndAni.setAnimation(0, 'redwinstars', false);
            this.isPlay = false;
            this.startTurn();
            // this.isRedPlay = true;
        }
        
    }

    // 最大速度
    private maxSpeed: number = -2160;
    private turnTween: cc.Tween;
    startTurn() {
        let a = this;
        this.isTurnPlay = true;
        this.isPlayAni = false;
        this.turnPlay.node.active = true;
        // if(this.special_symbols == 'scatter_green') {
        //     this.turnPlay.setAnimation(0, 'greenredhx', true);
        // }
        // else if(this.special_symbols == 'scatter_red') {
        //     this.turnPlay.setAnimation(0, 'dajianghx', true);
        // }
        if(Math.floor(this.lucky.amount / this.betmoney) >= 50) {
            this.turnPlay.setAnimation(0, 'dajianghx', true);
        }
        else {
            this.turnPlay.setAnimation(0, 'greenredhx', true);
        }
        SoundManager.play('turn_back');
        SoundManager.playSoundById('startTurn');
        this.zhuangpanNode.angle = 0;
        let startAngle = this.maxSpeed * 1 + Common.turntableItemRotation[0];
        let endAngle;
        endAngle = this.maxSpeed * 3 + Common.turntableItemRotation[Common.turntableItemmMoney.indexOf(this.lucky.amount)];
        // console.log(Common.turntableItemmMoney.indexOf(this.lucky.amount), endAngle);
        this.turnTween = cc.tween(this.zhuangpanNode)
        .to(4, { angle: startAngle }, { easing: 'cubicIn' })  // 加速到 10 圈每秒
        .to(4, { angle: endAngle }, { easing: 'cubicOut' }) 
        .call(async ()=>{
            SoundManager.playSoundById('endTurn');
            this.turnPlayEnd.node.active = true;
            this.turnPlayEnd.node.angle = -endAngle;
            this.turnPlayEnd.setAnimation(0, 'greenredwin2', true);
            //     // 停止旋转后的处理
            if(a.special_symbols == 'scatter_green') {
                a.turnPlay.setAnimation(0, 'greenredwin1', true);
            }
            else if(a.special_symbols == 'scatter_red') {
                a.turnPlay.setAnimation(0, 'dajiangwin1', true);
            }
            a.special_profitLabel.string = a.special_profit.toFixed(2);
            await PromiseUtil.sleep(0.5);
            this.winNumLabel.string = '₹ ' + a.profit.toFixed(2) + ' ';
            if(a.profit / a.betmoney > 9) {
                SoundManager.play('back')
                this.showWinAni(a.profit / a.betmoney);
            }
            else {
                SoundManager.play('back')
                // a.isPlayAni = false;
                a.isTurnPlay = false;
                await PromiseUtil.sleep(1.5);
                if(this.isAutoBetting && !this.isPlayAni) {
                    this.autoStartSpin();
                }
                else {
                    if(!this.isAutoBetting) {
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                        this.autoCountLabel.string = '';
                    }    
                }
            }
        }) // 减速到 20 圈每秒
        .start();
        // endAngle = this.maxSpeed * 4 - Common.turntableItemRotation[Common.turntableItemmMoney.indexOf(this.multiple)];
    }

    private timePassed: number = 0;
    private currentNumber: number;
    private targetNumber: number;
    private startNumber: number;
    private bigduration: number = 6;
    showWinAni(multiple: number) {
        let a = this;
        SoundManager.pause();
        this.money_1.resetSystem();
        this.money_2.resetSystem();
        this.money_3.resetSystem();
        this.money_4.resetSystem();
        this.isPlayAni = true;
        this.isTurnPlay = false;
        this.winBg.active = true;
        this.winAni.node.scale = 1;
        this.winAni.node.active = true;
        if(multiple >= 10 && multiple <= 19) {
            SoundManager.playSoundById('win_big');
            this.bigduration = 4;
            this.winAni.setAnimation(0, 'bigwin1', false);
            
        }
        else if(multiple >= 20 && multiple <= 49) {
            SoundManager.playSoundById('win_mega');
            this.bigduration = 10;
            this.winAni.setAnimation(0, 'megawin1', false);
            
        }
        else if(multiple >= 50) {
            SoundManager.playSoundById('win_super');
            this.bigduration = 11;
            this.winAni.setAnimation(0, 'supperwin1', false);
            
        }
        a.startNumber = 0;
        a.targetNumber = this.profit;
        a.currentNumber = a.startNumber;
        a.timePassed = 0;
        a.updateBigNumber();
        a.schedule(a.updateBigCount, 0.01);
        this.winAni.setCompleteListener(this.winComplete.bind(this));
    }

    async winComplete() {
        if(this.winAni.animation == 'bigwin1' || this.winAni.animation == 'megawin1' || this.winAni.animation == 'supperwin1') {
            if(this.winAni.animation == 'bigwin1') {
                this.winAni.setAnimation(0, 'bigwin2', false);
                
            }
            else if(this.winAni.animation == 'megawin1') {
                this.winAni.setAnimation(0, 'megawin2', false);
                
                
            }
            else if(this.winAni.animation == 'supperwin1') {
                this.winAni.setAnimation(0, 'supperwin2', false);
                
            }
            // this.winAni.setCompleteListener(this.winComplete.bind(this));
        }
        else if(this.winAni.animation == 'bigwin2' || this.winAni.animation == 'megawin2' || this.winAni.animation == 'supperwin2') {
            // await PromiseUtil.sleep(0.5);
            // this.money_1.stopSystem();
            // this.money_2.stopSystem();
            // this.money_3.stopSystem();
            // this.money_4.stopSystem();
            // SoundManager.stopSound();
            // SoundManager.play('black')
            // this.bigWinLabel.string = '0';
            // this.winBg.active = false;
            // this.winAni.node.active = false;
            // this.isPlayAni = false;
            // this.isFirstClick = false;
            // await PromiseUtil.sleep(1.5);
            // if(this.isAutoBetting && !this.isPlayAni) {
            //     this.autoStartSpin();
            // }
            // else {
            //     if(!this.isAutoBetting) {
            //         this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
            //         this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
            //         this.autoCountLabel.string = '';
            //     }    
            // }
        }
    }

    /**
     * 跳过动画，直接显示结果
     */
    private isFirstClick: boolean = false;
    async skipWinAni() {
        if(cc.director.getScheduler().isScheduled(this.updateBigCount, this) && this.isPlayAni && this.winAni.node.active && !this.isFirstClick) {
            SoundManager.stopSound();
            SoundManager.playSoundById('win_end');
            SoundManager.resume();
            SoundManager.play('black');
            this.isFirstClick = true;
            this.unschedule(this.updateBigCount);
            if(this.winAni.animation == 'bigwin1') {
                this.winAni.setAnimation(0, 'bigwin2', true);
            }
            else if(this.winAni.animation == 'megawin1') {
                this.winAni.setAnimation(0, 'megawin2', true);
                
            }
            else if(this.winAni.animation == 'supperwin1') {
                this.winAni.setAnimation(0, 'supperwin2', true);
            }
            this.money_1.stopSystem();
            this.money_2.stopSystem();
            this.money_3.stopSystem();
            this.money_4.stopSystem();
            this.currentNumber = this.targetNumber;
            this.updateBigNumber();
            
            // this.isPlayAni = false;
            await PromiseUtil.sleep(1)
            cc.tween(this.winAni.node)
            .to(0.3, {scale: 0})
            .call(async ()=>{
                this.bigWinLabel.string = '0';
                this.winBg.active = false;
                this.winAni.node.active = false;
                this.isPlayAni = false;
                this.isFirstClick = false;
                await PromiseUtil.sleep(1.5);
                if(this.isAutoBetting && !this.isPlayAni) {
                    this.autoStartSpin();
                }
                else {
                    if(!this.isAutoBetting) {
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                        this.autoCountLabel.string = '';
                    }    
                }
            })
            .start();
        }
    }

    async updateBigCount(dt) {
        this.timePassed += dt;
        if (this.timePassed >= this.bigduration) {
            this.money_1.stopSystem();
            this.money_2.stopSystem();
            this.money_3.stopSystem();
            this.money_4.stopSystem();
            this.currentNumber = this.targetNumber;
            this.updateBigNumber();
            this.unschedule(this.updateBigCount);
            
            await PromiseUtil.sleep(1)
            cc.tween(this.winAni.node)
            .to(0.3, {scale: 0})
            .call(async ()=>{
                SoundManager.play('back');
                this.bigWinLabel.string = '0';
                this.winBg.active = false;
                this.winAni.node.active = false;
                this.isPlayAni = false;
                this.isFirstClick = false;
                await PromiseUtil.sleep(0.5);
                if(this.isAutoBetting && !this.isPlayAni) {
                    this.autoStartSpin();
                }
                else {
                    if(!this.isAutoBetting) {
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_unselect').active = true;
                        this.autoBtn.node.getChildByName('Background').getChildByName('auto_select').active = false;
                        this.autoCountLabel.string = '';
                    }    
                }
            })
            .start();
            // this.bigWinNumLabel.node.y = -78;
        } else {
            let progress = this.timePassed / this.bigduration;
            this.currentNumber = this.startNumber + (this.targetNumber - this.startNumber) * progress;
            this.updateBigNumber();
        }
    }

    updateBigNumber() {
        let formattedNumber: string;
        if(this.currentNumber > 999) {
            formattedNumber = this.currentNumber.toFixed(2).toLocaleString();
        }
        else {
            formattedNumber = this.currentNumber.toFixed(2);
        }
        this.bigWinLabel.string = formattedNumber.toString();
    }

    showSettingView() {
        this.hideBetSetView();
        if(this.isShowSettingView) {
            this.settingView.active = false;
            this.isShowSettingView = false;
        }
        else {
            this.settingView.active = true;
            this.isShowSettingView = true;
        }
        
    }

    hideSettingView() {
        this.settingView.active = false;
        this.isShowSettingView = false;
    }

    showBetSetView() {
        if(this.isRolling) {
            return;
        }
        if(this.isPlayAni) {
            return;
        }
        if(this.isTurnPlay) {
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        this.hideSettingView();
        this.betSetView.getChildByName('setNode').getChildByName('toggle100').getComponent(cc.Toggle).isChecked = this.betmoney == 100;
        this.betSetView.getChildByName('setNode').getChildByName('toggle50').getComponent(cc.Toggle).isChecked = this.betmoney == 50;
        this.betSetView.getChildByName('setNode').getChildByName('toggle10').getComponent(cc.Toggle).isChecked = this.betmoney == 10;
        this.betSetView.getChildByName('setNode').getChildByName('toggle5').getComponent(cc.Toggle).isChecked = this.betmoney == 5;
        this.betSetView.getChildByName('setNode').getChildByName('toggle1').getComponent(cc.Toggle).isChecked = this.betmoney == 1;
        if(this.isShowBetSetView) {
            this.betSetView.active = false;
            this.isShowBetSetView = false;
        }
        else {
            this.betSetView.active = true;
            this.isShowBetSetView = true;
        }
    }

    hideBetSetView() {
        this.betSetView.active = false;
        this.isShowBetSetView = false;
    }

    showAutoSpinView() {
        if(this.isRolling) {
            return;
        }
        if(this.isPlayAni) {
            return;
        }
        if(this.isTurnPlay) {
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        this.hideSettingView();
        Common.showAutoSpinView();
    }

    showFortuneGems() {
        if(this.isRolling) {
            return;
        }
        if(this.isPlayAni) {
            return;
        }
        if(this.isTurnPlay) {
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        this.hideSettingView();
        Common.showFortuneGems();
    }

    showBackpackView() {
        Common.showBackpackView();
    }

    showWinMoreView() {
        this.onClick(null);
        Common.showWinMoreView();
    }

    showrecordView() {
        if(this.isRolling) {
            return;
        }
        if(this.isPlayAni) {
            return;
        }
        if(this.isTurnPlay) {
            return;
        }
        if(this.isAutoBetting) {
            return;
        }
        this.hideSettingView();
        SocketIOManager.Instance.onQuery_bettingrecord();
        Common.showrecordView();
    }
    
}
