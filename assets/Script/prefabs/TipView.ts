// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "../common/Common";
const {ccclass, property, menu} = cc._decorator;

/**
 * 提示界面
 * @author 徐航 (xuhang)
 * @version 2024.07.29
 * 
 */
@ccclass
@menu('xuhang/弹窗界面/TipView')
export default class TipView extends cc.Component {

    @property(cc.Node)
    main: cc.Node = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Label)
    descLabel: cc.Label = null;

    private _callfunc: any;

    show(desc, callfunc: any = null) {
        let winSize = cc.view.getVisibleSize();
        let toScale = winSize.width / 390; 
        this._callfunc = callfunc;
        this.mask.active = true;
        this.mask.opacity = 0;
        this.main.active = true;
        this.main.scale = 0.5;
        this.main.opacity = 0;
        this.descLabel.string = desc;
        // this.descLabel.getComponent(i18nLabel).setValue(desc, []);
         // 背景遮罩
        cc.tween(this.mask)
         .to(0.5, { opacity: 135 })
         .start();
        // 弹窗主体
        cc.tween(this.main)
        .to(0.5, { scale: toScale, opacity: 255 }, { easing: 'backOut' })
        .start();
    }

    changeDesc(desc) {
        this.descLabel.string = desc;
    }

    onConfirm() {
        if(this._callfunc) {
            this._callfunc.call();
            this.hide();
        }
        else {
            this.hide();
        }
    }

    hide() {
         // 背景遮罩
        cc.tween(this.mask)
         .to(0.5, { opacity: 0 })
         .start();
        // 弹窗主体
        cc.tween(this.main)
        .to(0.5, { scale: 0.5, opacity: 0 }, { easing: 'backOut' })
        .call(()=>{
            this.mask.active = false;
            this.mask.opacity = 0;
            this.main.active = false;
            this.main.scale = 0.5;
            this.main.opacity = 0;
            this.main.destroy();
            this.mask.destroy();
            Common.curTipView = null;
        })
        .start();
        
    }

    reloadView() {
        location.reload();
    }
}