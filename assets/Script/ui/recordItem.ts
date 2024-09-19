import { BettingData } from "../common/Common";
import { EgrManager } from "../manager/EgrManager";

const {ccclass, property, menu} = cc._decorator;

/**
 * @author 徐航 (xuhang)
 * @version 2024.06.13
 * 
 */
@ccclass
@menu('xuhang/item/recordItem')
export default class recordItem extends cc.Component {


    @property(cc.RichText)
    netSpecialLabel: cc.RichText = null;

    @property(cc.Label)
    betWin: cc.Label = null;

    @property(cc.Label)
    roundNumber: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    // @property(cc.Node)
    // addIcon: cc.Node = null;

    @property(cc.Node)
    special: cc.Node = null;

    private data: BettingData;

    initView(data: BettingData) {
        this.data = data;
        if(data.special_symbols == 'all_respin' || data.special_symbols == 'scatter_green' || data.special_symbols == 'scatter_red') {
            if(Number(data.mprofit) < 0) {
                this.netSpecialLabel.string = '<color=#D1575D>₹' + data.mprofit +  '</c><color=#FFFFFF>/</color>'
            }
            else {
                this.netSpecialLabel.string = '<color=#4feeb9>₹' + data.mprofit +  '</c><color=#FFFFFF>/</color>'
            }
            this.special.active = true;
            let str = data.mprofit + '/'
            this.special.x = this.netSpecialLabel.fontSize / 2 * str.length + 10;
        }
        else {
            if(Number(data.mprofit) < 0) {
                this.netSpecialLabel.string = '<color=#D1575D>₹' + data.mprofit +  '</c><color=#FFFFFF>/-</color>'
            }
            else {
                this.netSpecialLabel.string = '<color=#4feeb9>₹' + data.mprofit +  '</c><color=#FFFFFF>/-</color>'
            }
            // this.addIcon.active = false;
            // if(data.special_profit != 0) {
            //     this.special.active = true;
            //     let str = data.mprofit + '/'
            //     this.special.x = this.netSpecialLabel.fontSize / 2 * str.length;
            // }
            // else {
            this.special.active = false
            // }
        }
        this.betWin.string = '₹' + data.money + '/' + '₹' + data.profit;
        if(data.orderid) {
            this.roundNumber.string = this.formatString(data.orderid, 18);
        }
        else {
            this.roundNumber.string = 'fail';
        }
        var date = new Date()
        this.timeLabel.string = date.getFullYear() + '/' + data.time.replace(/-/g, '/') + "\n(GMT+8)";
        // this.timeLabel.string = data.time
    }

    showDetails() {
        // NetMgr.Instance.onQuery_bettingrecordDesic(this.data.period);
        EgrManager.Instance.dispatch_event('showDetails', '', this.data);
    }

    // 定义一个函数来处理字符串长度限制和显示格式
    formatString(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength - 2) + '..';
        } else {
            return str;
        }
    }
}