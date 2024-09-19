import { BettingData } from "../common/Common";

const {ccclass, property, menu} = cc._decorator;

/**
 * @author 徐航 (xuhang)
 * @version 2024.06.14
 * 
 */
@ccclass
@menu('xuhang/item/ItemDay')
export default class ItemDay extends cc.Component {


    @property(cc.Label)
    private lbDay: cc.Label = null;

    @property(cc.Node)
    private spSel: cc.Node = null;

    // @property(cc.Sprite)
    // private spSel: cc.Sprite = null;

    private index: number = 0;
    private day: number = 0;
    private cb: (index: number, day: number) => void = null;

    public setDay(index: number, day: number, sel: boolean, cb: (index: number, day: number) => void): void {
        this.index = index;
        this.day = day;
        this.cb = cb;

        this.lbDay.string = day.toString();
        this.spSel.active = sel;
        if(this.spSel.active) {
            this.lbDay.node.color = new cc.Color(255, 255, 255, 255);
        }
        else {
            this.lbDay.node.color = new cc.Color(114, 112, 109, 255)
        }
    }

    public onClickItem(): void {
        if (this.cb) {
            this.cb(this.index, this.day);
        }
    }
}