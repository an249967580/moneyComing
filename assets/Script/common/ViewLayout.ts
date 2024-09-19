import { SoundManager } from "../manager/SoundManager";

const { ccclass, property, menu } = cc._decorator;


@ccclass
export default class ViewLayout extends cc.Component {


    onLoad() {
        if(cc.sys.isBrowser) {
            // let winSize = director.getWinSize();
            let winSize = cc.view.getVisibleSize();
            if(winSize.width > 390) {
                this.node.width = winSize.width;
            }            
        }
    }
}