import AutoSpinView from "../prefabs/AutoSpinView";
import BackpackView from "../prefabs/BackpackView";
import FortuneGems from "../prefabs/FortuneGems";
import PromptView from "../prefabs/PromptView";
import TipView from "../prefabs/TipView";
import WinMoreView from "../prefabs/WinMoreView";
import recordView from "../prefabs/recordView";

const {ccclass, property} = cc._decorator;

export interface BettingData{
    id: number
    money: string
    mprofit: number
    profit: string
    result: any
    time: string
    special: boolean
    pumping: string
    orderid: number
    special_symbols: string
    winningResults: any
    special_profit: number
}

@ccclass
export class Common {

    public static userid: string;

    public static moneyStr = '₹ ';

    public static token;

    public static settle_availableamount: number = 0;

    public static availableamount: number = 0;

    public static curShowView: any = null;

    public static curTipView: any = null;

    public static showViewNode: cc.Node;

    public static showTipNode: cc.Node;

    public static item_icons = [];

    public static record_item_icons = [];

    public static game_id:string = '60002';

    public static curPrompt:any = null;

     /**
     * 参与记录
     */
     public static recordArr = [];

    //号码类型，万能符(1)>红宝石(2)>蓝宝石(3)>绿宝石(4)>A(5)>K(6)>Q(7)>J(8)
    public static itemType = ['00', '0', '1', '5', '10'];

    public static recordItemType = ['00', '0', '1', '5', '10'];

    public static recordMultipleArr = ['x2', 'x5', 'x10', 'all_respin', 'scatter', 'scatter_100'];

    public static  recordmultipleArrServer = ['2', '5', '10', 'all_respin', 'scatter_green', 'scatter_red'];

    public static multipleArr = ['x2', 'x5', 'x10', 'all_respin', 'scatter', 'scatter_100'];

    public static multipleArrServer = ['2', '5', '10', 'all_respin', 'scatter_green', 'scatter_red'];

    public static totalSpin: boolean = false;

    public static totalSpinNumber: number = 0;

    public static singleWin: boolean = false;

    public static singleWinNumber: number = 0;

    public static stopwinBalance: boolean = false;

    public static stopwinBalanceNumber: number = 0;

    public static stopLoseBalance: boolean = false;

    public static stopLoseBalanceNumber: number = 0;

    public static music_switch: number = 0;

    public static isCanPlaySound: boolean = false;

    public static homeUrl = '';

    public static turntableItemmMoney = [1000, 100, 25, 500, 75, 150, 50, 250];

    public static turntableItemRotation = [0, -45, -90, -135, -180, -225, -270, -315];

    public static isValidJSON(text) {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 强制保留2位小数，如：2，会在2后面补上00.即2.00
     * @param x 
     * @returns 
     */
    public static oDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }

    //显示提示
    public static showPrompt(desc:string){
        if(this.curPrompt != null){
            this.curPrompt.changeDesc(desc)
            return;
        }
        cc.resources.load('prefabs/PromptView', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            this.curPrompt = viewNode.getComponent(PromptView);
            Common.showTipNode.addChild(this.curPrompt.node)
            this.curPrompt.showPromt(desc);
        });
    }



    public static showBackpackView() {
        if(this.curShowView != null) {
            return;
        }
        cc.resources.load('prefabs/BackpackView', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            Common.curShowView = viewNode.getComponent(BackpackView);
            Common.showViewNode.addChild(Common.curShowView.node)
            Common.curShowView.show();
        });
    }

    public static showWinMoreView() {
        if(this.curShowView != null) {
            return;
        }
        cc.resources.load('prefabs/WinMoreView', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            Common.curShowView = viewNode.getComponent(WinMoreView);
            Common.showViewNode.addChild(Common.curShowView.node)
            Common.curShowView.show();
        });
    }

    public static showTipView(desc: string, callfunc: any = null) {
        if(this.curTipView != null) {
            Common.curTipView.changeDesc(desc);
            return;
        }
        cc.resources.load('prefabs/TipView', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            Common.curTipView = viewNode.getComponent(TipView);
            Common.showTipNode.addChild(Common.curTipView.node)
            Common.curTipView.show(desc, callfunc);
        });
    }

    public static showAutoSpinView() {
        if(this.curShowView != null) {
            return;
        }
        cc.resources.load('prefabs/AutoSpinView', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            Common.curShowView = viewNode.getComponent(AutoSpinView);
            Common.showViewNode.addChild(Common.curShowView.node)
            Common.curShowView.show();
        });
    }

    public static showrecordView(){
        if(this.curShowView != null) {
            return;
        }
        cc.resources.load('prefabs/recordView', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            Common.curShowView = viewNode.getComponent(recordView);
            Common.showViewNode.addChild(Common.curShowView.node)
            Common.curShowView.show();
        });
    }

    public static showFortuneGems(){
        if(this.curShowView != null) {
            return;
        }
        cc.resources.load('prefabs/FortuneGems', cc.Prefab, (err, prefab)=>{
            let viewNode = cc.instantiate(prefab);
            // @ts-ignore
            Common.curShowView = viewNode.getComponent(FortuneGems);
            Common.showViewNode.addChild(Common.curShowView.node)
            Common.curShowView.show();
        });
    }

}