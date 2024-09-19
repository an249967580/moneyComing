// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "../common/Common";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackpackView extends cc.Component {


    @property(cc.Toggle)
    thisGameToggle: cc.Toggle = null;

    @property(cc.Node)
    thisGameNode: cc.Node = null;

    @property(cc.Node)
    otherGameNode: cc.Node = null;

    @property(cc.Toggle)
    otherGameToggle: cc.Toggle = null;

    @property(cc.Node)
    messageNode: cc.Node = null;

    @property(cc.Toggle)
    messageToggle: cc.Toggle = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    main: cc.Node = null;

    onLoad () {

    }

    show(desc) {
        this.mask.active = true;
        this.mask.opacity = 0;
        this.main.active = true;
        this.main.scale = 0.5;
        this.main.opacity = 0;
         // 背景遮罩
        cc.tween(this.mask)
         .to(0.5, { opacity: 135 })
         .start();
        // 弹窗主体
        cc.tween(this.main)
        .to(0.5, { scale: 1.0, opacity: 255 }, { easing: 'backOut' })
        .start();
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
            Common.curShowView = null;
        })
        .start();
        
    }

    changeView(event) {
        // console.log(event);
        this.thisGameNode.active = this.thisGameToggle.isChecked;
        this.otherGameNode.active = this.otherGameToggle.isChecked;
        this.messageNode.active = this.messageToggle.isChecked;
    }

    // update (dt) {}
}
