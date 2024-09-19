// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class ResManager extends cc.Component {

    
    public static loadSound(url, callBack: Function) {
        cc.resources.load('sound/' + url, cc.AudioClip, function(err, clip){
            callBack(clip)
        })
    }

    // update (dt) {}
}
