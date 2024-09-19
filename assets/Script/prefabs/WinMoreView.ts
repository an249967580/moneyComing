// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "../common/Common";
import { SoundManager } from "../manager/SoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinMoreView extends cc.Component {


    @property(cc.Toggle)
    favoritesToggle: cc.Toggle = null;

    @property(cc.Node)
    favoritesNode: cc.Node = null;

    @property(cc.Node)
    featuresNode: cc.Node = null;

    @property(cc.Toggle)
    featuresToggle: cc.Toggle = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    main: cc.Node = null;

    onLoad () {

    }

    show(desc) {
        let winSize = cc.view.getVisibleSize();
        let toScale = winSize.width / 390; 
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
        .to(0.5, { scale: toScale, opacity: 255 }, { easing: 'backOut' })
        .start();
    }

    hide() {
         // 背景遮罩
        SoundManager.stopSound();
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
        this.favoritesNode.active = this.favoritesToggle.isChecked;
        this.featuresNode.active = this.featuresToggle.isChecked;
    }

    // update (dt) {}
}
