// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "../common/Common";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FortuneGems extends cc.Component {
    @property(cc.Node)
    main: cc.Node = null;

    onLoad () {

    }

    show() {
        this.main.active = true;
    }

    hide() {
        this.main.active = false;
        this.main.destroy();
        Common.curShowView = null;
    }

    // update (dt) {}
}
