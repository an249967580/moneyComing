// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BettingData, Common } from "../common/Common";
import { EgrManager } from "../manager/EgrManager";
import { NetMgr } from "../manager/net/NetMgr";
import SocketIOManager from "../manager/net/SocketIOManager";
import ItemDay from "../ui/ItemDay";
import recordItem from "../ui/recordItem";
import PromiseUtil from "../utils/PromiseUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class recordView extends cc.Component {


    @property(cc.Node)
    main: cc.Node = null;

    @property(cc.Label)
    idLabel: cc.Label = null;

    @property(cc.Node)
    walkingNodes: cc.Node = null;

    @property(cc.Node)
    noResultNode: cc.Node = null;

    @property(cc.Label)
    noResultLabel: cc.Label = null;

    @property(cc.Node)
    resultNode: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    itemContentNode: cc.Node = null;

    @property(cc.Node)
    itemNode: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    scrollViewBg: cc.Node = null;

    @property(cc.Label)
    tipLabel: cc.Label = null;

    @property(cc.EditBox)
    idEditBox: cc.EditBox = null;

    @property(cc.Node)
    dateView: cc.Node = null;

    @property(cc.Node)
    pfbDay: cc.Node = null;

    @property(cc.Node)
    ndDays: cc.Node = null;

    @property(cc.Label)
    dateTitle: cc.Label = null;

    @property(cc.Label)
    dateLabel: cc.Label = null;

    @property(cc.Label)
    loadLabel: cc.Label = null;


    /**detail相关 */
    @property(cc.ScrollView)
    detailScrollView: cc.ScrollView = null;

    @property(cc.Label)
    detailIdLabel: cc.Label = null;

    @property(cc.Label)
    detailRoundNumber: cc.Label = null;

    @property(cc.Label)
    detailNetLabel: cc.Label = null;

    @property(cc.Label)
    detailBetLabel: cc.Label = null;

    @property(cc.Label)
    detailPumpingLabel: cc.Label = null;

    @property(cc.Label)
    detailWinLabel: cc.Label = null;

    @property(cc.Label)
    detailTimeLabel: cc.Label = null;

    @property(cc.Node)
    resultItem: cc.Node = null;

    @property(cc.Node)
    specialItem: cc.Node = null;

    @property(cc.Node)
    resultToggleContainer: cc.Node = null;

    @property(cc.Node)
    specialToggle: cc.Node = null;

    @property(cc.Node)
    specialToggleContainer: cc.Node = null;

    @property(cc.Node)
    resultToggle: cc.Node = null;

    @property(cc.Label)
    mainGameWinLabel: cc.Label = null;

    @property(cc.Label)
    specialWinLabel: cc.Label = null;

    @property(cc.Node)
    aloneWin: cc.Node = null;

    @property(cc.Node)
    specialAloneWin: cc.Node = null;

    @property(cc.Node)
    aloneBg: cc.Node = null;

    @property(cc.Node)
    specialAloneBg: cc.Node = null;

    @property(cc.Label)
    aloneLabel: cc.Label = null;

    @property(cc.Label)
    specialAloneLabel: cc.Label = null;

    @property(cc.Node)
    pumpingNode: cc.Node = null;

    @property(cc.Node)
    detailContent: cc.Node = null;

    @property(cc.Node)
    detailItemsNode: cc.Node = null;

    private currentPage: number = 0;

    private currentType: string = '15mins';

    show() {
        this.initData();
        this.updateDate();
        this.moveTitle();
        this.main.active = true;
        this.idLabel.string = this.truncateMiddle(Common.userid, 8);
        EgrManager.Instance.add_event_listenner('showRecordView', this, this.onShowView);
        EgrManager.Instance.add_event_listenner('showDetails', this, this.onShowDetails);
        let a = this;
        this.scrollView.node.on('scroll-to-bottom', () => {
            console.log('ScrollView scrolled to bottom');
            a.loadLabel.string = 'Loading Result.'
            if(a.currentPage == 0) {
                a.currentPage = 2;
                a.loadQuery_bettingrecordByPage();
            }
            else {
                a.currentPage += 1
                a.loadQuery_bettingrecordByPage();
            }
            // 在这里可以编写滚动到底部后的逻辑
            // 例如加载更多内容或者显示提示信息
        });
    }

    truncateMiddle(str, maxLength) {
        if(str.length > maxLength) {
            // 保留开头和结尾各一部分，中间用 "..." 代替
            const frontLength = Math.floor((maxLength - 3) / 2);
            const backLength = maxLength - frontLength - 3;
            return str.slice(0, frontLength) + '...' + str.slice(-backLength); 
        }
        return str;
    }

    async moveTitle() {
        cc.tween(this.walkingNodes)
        .to(0.5, {position: new cc.Vec3(0, -2, 0)})
        .call(async ()=>{
            await PromiseUtil.sleep(5);
            cc.tween(this.walkingNodes)
            .to(0.5, {position: new cc.Vec3(0, 27, 0)})
            .call(async ()=>{
                await PromiseUtil.sleep(5);
                this.moveTitle();
            })
            .start();
        })
        .start();
        // var moveUpAction = cc.moveTo(2, new cc.Vec2(0, 0));
        // var moveDownAction = cc.moveTo(2, new cc.Vec2(0, -34));
        // var moveAction = cc.sequence(moveUpAction, moveDownAction);

        // // 无限重复动作
        // var repeatAction = cc.repeatForever(moveAction);

        // // 开始动作
        // this.walkingNodes.runAction(repeatAction);
    }

    onShowView(){
        if(this.currentPage == 0) {
            this.resultNode.active = false;
            this.detailScrollView.node.active = false;
            this.noResultLabel.string = 'No Result.'
        }
        if(Common.recordArr.length == 0) {
            if(this.currentPage == 0) {
                this.noResultNode.active = true;
                this.resultNode.active = false;
            }
            else {
                this.noResultNode.active = false;
                this.resultNode.active = true;
                this.loadLabel.string = 'Resource download completed.'
            }
            // this.noResultNode.active = true;
            // this.resultNode.active = false;
            // this.noRecordLabel.string = '暂无记录'
            // this.noRecordLabel.node.getComponent(i18nLabel).setValue('zwjl', []);
        }
        else {
            if(this.currentPage == 0) {
                this.noResultNode.active = false;
                this.resultNode.active = true;
                this.itemNode.removeAllChildren();
                for(let i = 0; i < Common.recordArr.length; i++) {
                    let node = cc.instantiate(this.item);
                    node.active = true;
                    let item = node.getComponent(recordItem);
                    item.initView(Common.recordArr[i]);
                    node.setPosition(-167, 0);
                    this.itemNode.addChild(node);
                    this.itemNode.height = 170 * i + 170;
                }
                this.itemContentNode.height = 320 + this.itemNode.height;
                this.scrollViewBg.height = this.itemNode.height + 60;
                this.tipLabel.getComponent(cc.Widget).bottom = 16.4;
                this.loadLabel.string = 'Resource download completed.'
            }
            else {
                let itemHeight = this.itemNode.height;
                this.noResultNode.active = false;
                this.resultNode.active = true;
                for(let i = 0; i < Common.recordArr.length; i++) {
                    let node = cc.instantiate(this.item);
                    node.active = true;
                    let item = node.getComponent(recordItem);
                    item.initView(Common.recordArr[i]);
                    node.setPosition(-167, 0);
                    this.itemNode.addChild(node);
                    this.itemNode.height = itemHeight + 170 * i + 170;
                }
                this.itemContentNode.height = 320 + this.itemNode.height;
                this.scrollViewBg.height = this.itemNode.height + 60;
                this.tipLabel.getComponent(cc.Widget).bottom = 16.4;
                this.loadLabel.string = 'Resource download completed.'
                // console.log('高度>> ', this.scrollViewBg.height)
            }
            
        }
    }
    private roundNum:string;
    onShowDetails(event: any, uname:string, udata:BettingData) {
        // const result = JSON.parse(udata.result);
        // console.log(result);
        this.detailIdLabel.string = Common.userid + '';
        if(udata.orderid) {
            this.roundNum = udata.orderid.toString();
            this.detailRoundNumber.string = this.formatString(udata.orderid, 18);
        }
        else {
            this.detailRoundNumber.string = '';
        }
        
        this.detailNetLabel.string = Common.moneyStr + udata.mprofit + '';
        if(Number(udata.mprofit) > 0) {
            this.detailNetLabel.node.color = new cc.Color(72, 190, 144, 255);
        }
        else {
            this.detailNetLabel.node.color = new cc.Color(238, 77, 76, 255);
        }
        this.detailBetLabel.string = Common.moneyStr + udata.money + '';
        this.detailWinLabel.string = Common.moneyStr + udata.profit;
        var date = new Date()
        this.detailTimeLabel.string = date.getFullYear() + '/' + udata.time.replace(/-/g, '/') + "\n(GMT+8)";
        // this.detailTimeLabel.string = udata.time.replace(/-/g, '/') + '\n(GMT+8)';
        // this.detailTimeLabel.string = udata.time

        this.scrollView.node.active = false;
        this.detailScrollView.node.active = true;

        let detailContengLayout = this.detailContent.getComponent(cc.Layout);
        if(udata.pumping != null) {
            this.pumpingNode.active = true;
            this.detailItemsNode.height = 682;
            detailContengLayout.spacingY = -300;
            this.detailPumpingLabel.string = Common.moneyStr + udata.pumping;
        }
        else {
            this.pumpingNode.active = false;
            this.detailItemsNode.height = 514;
            detailContengLayout.spacingY = -220;
        }
        for(let i = 0; i < udata.result[0].lines.length; i++) {
            let data = udata.result[0].lines;
            if(data[i]){
                this.resultItem.getChildByName('bg').getChildByName('item' + i).active = true;
                let index = Common.recordItemType.indexOf(data[i]);
                const frame = Common.record_item_icons[0].getSpriteFrame(Common.recordItemType[index]);
                this.resultItem.getChildByName('bg').getChildByName('item' + i).getComponent(cc.Sprite).spriteFrame = frame;
            }
            else {
                this.resultItem.getChildByName('bg').getChildByName('item' + i).active = false;
            }
        }
        let multiple = Common.recordmultipleArrServer.indexOf(udata.special_symbols)
        let frame = Common.record_item_icons[0].getSpriteFrame(Common.recordMultipleArr[multiple]);
        this.resultItem.getChildByName('bg').getChildByName('multiple1').getComponent(cc.Sprite).spriteFrame = frame;
        this.resultItem.getChildByName('bg').getChildByName('result1').active = false;
        this.aloneWin.active = false;
        if(Number(udata.profit) > 0) {
            this.resultToggle.active = true;
            if(udata.special_symbols == 'scatter_green' || udata.special_symbols == 'scatter_red') {
                this.mainGameWinLabel.string = 'Main game win:' + Common.moneyStr + udata.result[0].amount + '\n' + 'Lucky Wheel Win:' + Common.moneyStr + udata.special_profit;
                this.resultItem.height = 320;
                this.resultItem.getChildByName('bg').color = new cc.Color(41, 84, 23, 1);
            }
            else if(udata.special_symbols == '2' || udata.special_symbols == '5' || udata.special_symbols == '10') {
                this.mainGameWinLabel.string = 'Special Rell: x' + udata.special_symbols + '\n' + 'Multiplied Bonus Score:' + Common.moneyStr + udata.mprofit;
                this.resultItem.height = 360;
                this.resultItem.getChildByName('bg').color = new cc.Color(119, 111, 19, 1);
            }
            else {
                this.mainGameWinLabel.string = 'Main game win:' + Common.moneyStr + udata.result[0].amount;
                this.resultItem.height = 270;
                if(udata.special_symbols == 'all_respin') {
                    this.resultItem.getChildByName('bg').color = new cc.Color(65, 23, 23, 1);
                }
                else {
                    this.resultItem.getChildByName('bg').color = new cc.Color(60, 65, 68, 1);
                }
                
            }
        }
        else {
            this.resultToggle.active = false;
            this.resultItem.height = 200;
            this.mainGameWinLabel.string = '';
            this.resultItem.getChildByName('bg').color = new cc.Color(60, 65, 68, 1);
        }

        
        
        // let toggle = cc.instantiate(this.resultToggle);
        this.resultToggle.name = udata.result[0].amount + ''
        // toggle.on(cc.Node.EventType.TOUCH_END, this.onShowResultLine, this);

        if(udata.result.length > 1) {
            this.specialItem.active = true;
            for(let i = 0; i < udata.result[1].lines.length; i++) {
                let data = udata.result[1].lines;
                if(data[i]){
                    this.specialItem.getChildByName('bg').getChildByName('item' + i).active = true;
                    let index = Common.recordItemType.indexOf(data[i]);
                    const frame = Common.record_item_icons[0].getSpriteFrame(Common.recordItemType[index]);
                    this.specialItem.getChildByName('bg').getChildByName('item' + i).getComponent(cc.Sprite).spriteFrame = frame;
                }
                else {
                    this.specialItem.getChildByName('bg').getChildByName('item' + i).active = false;
                }
            }
            let multiple =  Common.recordMultipleArr[Common.recordmultipleArrServer.indexOf(udata.special_symbols)]
            let frame = Common.record_item_icons[0].getSpriteFrame(multiple);
            this.specialItem.getChildByName('bg').getChildByName('multiple1').getComponent(cc.Sprite).spriteFrame = frame;
            // this.resultToggleContainer.removeAllChildren();
            this.specialItem.getChildByName('bg').getChildByName('result1').active = false;
            // let toggle = cc.instantiate(this.specialToggle);
            this.specialToggle.name = udata.result[1].amount + ''
            if(udata.special_symbols == 'all_respin') {
                this.specialItem.getChildByName('bg').color = new cc.Color(65, 23, 23, 1);
            }
            else {
                this.specialItem.getChildByName('bg').color = new cc.Color(60, 65, 68, 1);
            }
            if(udata.special_profit > 0) {
                this.specialToggle.active = true;
                this.specialItem.height = 270;
                this.specialWinLabel.string = 'Respin Win:' + Common.moneyStr + udata.special_profit;
            }
            else {
                this.specialToggle.active = false;
                this.specialItem.height = 200;
                this.specialWinLabel.string = '';
            }
            // toggle.on(cc.Node.EventType.TOUCH_END, this.onShowSpecialLine, this);
        }
        else {
            this.specialItem.active = false;
        }

        // this.aloneBg.width = 70;
        // let payout: number = 0;
        // for(let i = 0; i < udata.winningResults.length; i++) {
        //     let data = udata.winningResults[i];
        //     let toggle = cc.instantiate(this.resultToggle);
        //     toggle.active = true;
        //     payout = payout + Number(data.payout);
        //     let frame = Common.record_item_icons[0].getSpriteFrame('symbol_' + data.symbol_name);
        //     if(data.symbol_name == 'ruby') {
        //         frame = Common.record_item_icons[0].getSpriteFrame('symbol_red');
        //     }
        //     else if(data.symbol_name == 'sapphire') {
        //         frame = Common.record_item_icons[0].getSpriteFrame('symbol_blue');
        //     }
        //     else if(data.symbol_name == 'emerald') {
        //         frame = Common.record_item_icons[0].getSpriteFrame('symbol_green');
        //     }
        //     toggle.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = frame;
        //     // toggle.getChildByName('resultLabel').getComponent(cc.Label).string = data.type;
        //     if(data.line[0] == 3 && data.line[1] == 4 && data.line[2] == 5) {
        //         toggle.name = 1 + ',' + data.payout;
        //     }
        //     else if(data.line[0] == 0 && data.line[1] == 1 && data.line[2] == 2) {
        //         toggle.name = 2 + ',' + data.payout;
        //     }
        //     else if(data.line[0] == 6 && data.line[1] == 7 && data.line[2] == 8) {
        //         toggle.name = 3 + ',' + data.payout;
        //     }
        //     else if(data.line[0] == 0 && data.line[1] == 4 && data.line[2] == 8) {
        //         toggle.name = 4 + ',' + data.payout;
        //     }
        //     else if(data.line[0] == 2 && data.line[1] == 4 && data.line[2] == 6) {
        //         toggle.name = 5 + ',' + data.payout;
        //     }
            
        //     toggle.on(cc.Node.EventType.TOUCH_END, this.onShowResultLine, this);
        //     this.resultToggleContainer.addChild(toggle);
        // }
        
        // if(udata.winningResults.length != 0) {
        //     this.resultItem.height = 400;
        //     this.mainGameWinLabel.string = 'Main game win:' + Common.moneyStr + payout;
        //     if(udata.special_profit != 0) {
        //         this.resultItem.height = 420;
        //         this.mainGameWinLabel.string = this.mainGameWinLabel.string + '\n' + 'Lucky Wheel Win:' + Common.moneyStr + udata.special_profit;
        //     }
        //     this.mainGameWinLabel.node.y = -373;
        // }
        // else {
        //     this.resultItem.height = 300;
        //     this.mainGameWinLabel.string = '';
        //     if(udata.special_profit != 0) {
        //         this.resultItem.height = 320;
        //         this.mainGameWinLabel.string = 'Lucky Wheel Win:' + Common.moneyStr + udata.special_profit;
        //         this.mainGameWinLabel.node.y = -290;
        //     }
        //     else {
        //         this.mainGameWinLabel.node.y = -373;
        //     }
        // }
        // Common.itemType[index]
    }

    async onShowResultLine(event) {
        // console.log(event);
        this.aloneWin.active = true;
        let type = this.resultToggle.name
        this.resultItem.getChildByName('bg').getChildByName('result1').active = true;
        this.aloneLabel.string = Common.moneyStr + Common.oDecimal2(type) + ' →';
        // await PromiseUtil.sleep(0.5);
        // this.aloneBg.setContentSize(this.aloneLabel.node.width + 5, this.aloneBg.height); 

    }

    async onShowSpecialLine(event) {
        // console.log(event);
        this.specialAloneWin.active = true;
        let type = this.specialToggle.name
        this.specialItem.getChildByName('bg').getChildByName('result1').active = true;
        this.specialAloneLabel.string = Common.moneyStr + Common.oDecimal2(type) + ' →';
        // await PromiseUtil.sleep(0.5);
        // this.aloneBg.setContentSize(this.aloneLabel.node.width + 5, this.aloneBg.height); 

    }

    hide() {
        this.itemNode.removeAllChildren();
        this.main.active = false;
        // this.main.destroy();
        Common.curShowView = null; 
    }

    onSelectResultTime(event: any, customEventData: any) {
        let startTime = Math.floor(new Date().getTime() / 1000);
        let endTime: number = 0;
        this.resultNode.active = false;
        this.detailScrollView.node.active = false;
        this.noResultLabel.string = 'Loading Result.'
        if(customEventData == '15mins') {
            this.currentType = '15mins';
            this.currentPage = 0;
            endTime = startTime - 900;
            this.noResultNode.active = true;
            this.resultNode.active = false;
            SocketIOManager.Instance.onQuery_bettingrecord(endTime, startTime);
        }
        else if(customEventData == '30mins') {
            this.currentType = '30mins';
            this.currentPage = 0;
            endTime = startTime - 1800;
            this.noResultNode.active = true;
            this.resultNode.active = false;
            SocketIOManager.Instance.onQuery_bettingrecord(endTime, startTime);
        }
        else if(customEventData == '1hour') {
            this.currentType = '1hour';
            endTime = startTime - 3600;
            this.currentPage = 0;
            this.noResultNode.active = true;
            this.resultNode.active = false;
            SocketIOManager.Instance.onQuery_bettingrecord(endTime, startTime);
        }
    }

    onQuery_bettingrecordById() {
        this.resultNode.active = false;
        this.detailScrollView.node.active = false;
        this.noResultLabel.string = 'Loading Result.'
        this.noResultNode.active = true;
        this.resultNode.active = false;
        this.currentPage = 0;
        SocketIOManager.Instance.onQuery_bettingrecord(0, 0, this.idEditBox.string);
    }

    onQuery_bettingrecordByDate() {
        let startTime:number = 0;
        let endTime: number = 0;
        this.resultNode.active = false;
        this.detailScrollView.node.active = false;
        this.noResultLabel.string = 'Loading Result.'
        this.noResultNode.active = true;
        this.resultNode.active = false;
        this.currentPage = 0;
        this.currentType = 'date';
        if(this.dateLabel.string != '') {
            let dateArr = this.dateLabel.string.split('-');
            let startdate = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 0, 0, 0)
            startTime = Math.floor(startdate.getTime() / 1000);
            let endDate = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 23, 59, 59)
            endTime = Math.floor(endDate.getTime() / 1000);
            SocketIOManager.Instance.onQuery_bettingrecord(startTime, endTime);
        }
    }

    loadQuery_bettingrecordByPage() {
        let startTime = Math.floor(new Date().getTime() / 1000);
        let endTime: number = 0;
        if(this.currentType == '15mins') {
            this.currentType = '15mins';
            endTime = startTime - 900;
            SocketIOManager.Instance.onQuery_bettingrecord(endTime, startTime, null,this.currentPage);
        }
        else if(this.currentType == '30mins') {
            this.currentType = '30mins';
            endTime = startTime - 1800;
            SocketIOManager.Instance.onQuery_bettingrecord(endTime, startTime, null,this.currentPage);
        }
        else if(this.currentType == '1hour') {
            this.currentType = '1hour';
            endTime = startTime - 3600;
            SocketIOManager.Instance.onQuery_bettingrecord(endTime, startTime, null, this.currentPage);
        }
        else if(this.currentType == 'date') {
            let dateArr = this.dateLabel.string.split('-');
            let startdate = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 0, 0, 0)
            startTime = Math.floor(startdate.getTime() / 1000);
            let endDate = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 23, 59, 59)
            endTime = Math.floor(endDate.getTime() / 1000);
            SocketIOManager.Instance.onQuery_bettingrecord(startTime, endTime, null,this.currentPage);
        }
    }

    onClearEditString() {
        this.idEditBox.string = '';
    }

    onClearDateString() {
        this.dateLabel.string = '';
    }

    backRecordView() {
        this.scrollView.node.active = true;
        this.detailScrollView.node.active = false;
    }

    showDateView() {
        if(!this.isShowDateView){
            cc.tween(this.dateView).to(0.2, {
                scaleX: 0.54, scaleY: 0.54
            }, {easing:'cubicInOut'})
            .call(()=>{
                this.isShowDateView = true;
            })
            .start();
        }
        else{
            cc.tween(this.dateView).to(0.2, {
                scaleX: 0.54, scaleY: 0
            }, {easing:'cubicInOut'})
            .call(()=>{
                this.isShowDateView = false;
            })
            .start();
        }
    }

    hideDateView() {
        cc.tween(this.dateView).to(0.2, {
            scaleX: 0.54, scaleY: 0
        }, {easing:'cubicInOut'})
        .call(()=>{
            this.isShowDateView = false;
        })
        .start();
    }

    /**日历相关 */
    private isShowDateView: boolean = false
    private date: Date = null;
    private year: number = 0;
    private month: number = 0;
    private day: number = 0;
    private cb: any = null;
    private pfgListDay: cc.Node[] = [];
    private monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



    initData() {
        this.date = this.date ? this.date : new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        this.pfgListDay = [];
        const date = new Date(this.year, this.month, 0);
        const totalDays: number = date.getDate();

        for(let i = 0; i < totalDays; i++) {
            const node = cc.instantiate(this.pfbDay);
            this.ndDays.addChild(node);
            this.pfgListDay.push(node)
        }
    }

    public setDate(year: number, month: number, day: number) {
        if(year < 0 || month < 0 || month > 11 || day < 1 || day > 31) {
            console.error('Invalid date!')
            return;
        }

        this.date = new Date(year, month, day)
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        this.updateDate();
    }

    updateDate() {
        this.dateTitle.string = this.year + '  ' + this.monthNames[this.month];
        const date = new Date(this.year, this.month + 1, 0);
        const totalDays: number = date.getDate();
        const fromWeek: number = new Date(this.year, this.month, 1).getDay();

        for(let i = 0; i < this.pfgListDay.length; i++) {
            const node = this.pfgListDay[i]
            if(i < totalDays) {
                node.active = true;
                const index: number = fromWeek + i;
                const row: number = Math.floor(index / 7);
                const col: number = index % 7;
                const x: number = -(this.ndDays.width - node.width - 22) * 0.5 + col * node.width * 1.8;
                const y: number = (this.ndDays.height - node.height - 80) * 0.5 - row * node.height * 1.8;
                node.setPosition(x, y);
                const item = node.getComponent(ItemDay);
                item.setDay(i, i + 1, this.day === i + 1, (selIndex: number, selDay: number)=>{
                    this.day = selDay;
                    this.updateDate();
                    this.dateLabel.string = this.year + '-' + (this.month + 1) + '-' + selDay;
                    this.hideDateView();
                })
            } else {
                node.active = false;
            }
        }
    }

    public onClickLeft(): void {
        if (this.month > 0) {
            this.month -= 1;
        } else {
            this.month = 11;
            this.year -= 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }

    public onClickRight(): void {
        if (this.month < 11) {
            this.month += 1;
        } else {
            this.month = 0;
            this.year += 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }
    
    public setPickDateCallback(cb: (year: number, month: number, day: number) => void): void {
        this.cb = cb;
    }

    onCopyText() {
        let copyStr = this.roundNum;
        if(navigator.clipboard) {
            navigator.clipboard.writeText(copyStr).then(()=>{
                Common.showPrompt('Successfully Copied');
            }).catch(err=>{
                console.log('复制失败', err);
            })
        }
        else {//如果浏览器不支持Clipboard API的话，用document.execCommand('copy');
            let textArea = document.createElement('textarea');
            textArea.value = copyStr;
            // 使text area不在viewport，同时设置不可见
            textArea.style.position = "absolute";
            textArea.style.opacity = '0';
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            console.error('浏览器不支持Clipboard API');
            Common.showPrompt('Successfully Copied');
        }
        // native.copyTextToClipboard('?????'); 
    }

    // 定义一个函数来处理字符串长度限制和显示格式
    formatString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 2) + '..';
    } else {
        return str;
    }
}
    // update (dt) {}
}
