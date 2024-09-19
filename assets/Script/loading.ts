// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "./common/Common";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    private loadProgress:number = 0; //加载进度

    private currentCount: number = 0;

    private totalCount: number = 3;
    onLoad(): void {
        cc.debug.setDisplayStats(false);
        let a = this;
        cc.director.preloadScene("intro", function () {
            //cc.log("Next scene preloaded");
        });
        cc.director.preloadScene("game", function () {
            //cc.log("Next scene preloaded");
        });
        cc.loader.loadRes('atlas/item', cc.SpriteAtlas, (err, atlas)=>{
            Common.item_icons.push(atlas);
            // a.initSlotItem();
        });
        cc.loader.loadRes('atlas/gems', cc.SpriteAtlas, (err, atlas)=>{
            Common.record_item_icons.push(atlas);
            // a.initSlotItem();
        });
        cc.resources.loadDir('sound', (completedCount, totalCount, item) => {
            // console.log('加载个数>>', completedCount, totalCount)
            let progress = parseFloat((completedCount / totalCount).toFixed(3));
            this.updateProgress(progress);
        }, (error, assets) => {
            if (error) {
                console.error('Failed to preload resources:', error);
                return;
            }
            // console.log('Resources preloaded successfully:', assets);
            // this.totalCount = this.totalCount + assets.length;
            // 跳转到游戏主场景或其他场景
            // cc.director.loadScene('MainScene');
        });
        
   }

   //更新进度
   updateProgress(progress: number){
        if(progress > this.progressBar.progress) {
            this.progressBar.progress = progress;
        }
        if(progress >= 1) {
            let sceneName = cc.sys.localStorage.getItem('startScene');
            if(sceneName != null) {
                cc.director.loadScene(sceneName);
            }
            else {
                cc.director.loadScene('intro');
            }
        }
   }
}
