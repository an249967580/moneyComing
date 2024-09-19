// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "../common/Common";

const {ccclass, property, menu} = cc._decorator;

/**
 * 提示视图
 * @author 徐航 (xuhang)
 * @version 2024.06.15
 * 
 */
@ccclass
@menu('xuhang/预制体/PromptView')
export default class PromptView extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Label)
    descLabel: cc.Label = null;

    start(): void {
        this.descLabel.node.on(cc.Node.EventType.SIZE_CHANGED, this.textHeghtChange, this)
    }
    
    textHeghtChange() {
        let textHeight = this.descLabel.node.height;
        // console.log("文本高度: " + textHeight);
        this.bg.height = this.descLabel.node.height + 36;
    }

    changeDesc(desc: string) {
        this.descLabel.string = desc;
    }

    showPromt(desc: string) {
        // Common.showTipNode.addChild(this.bg);
        // this.descLabel.string = desc;
        this.bg.opacity = 255;
        this.descLabel.string = desc;
        cc.tween(this.bg).to(2, {
            opacity: 0
        }, {easing:'cubicInOut'})
        .call(()=>{
            this.bg.destroy();
            Common.curPrompt = null;
        })
        .start();
    }
}
