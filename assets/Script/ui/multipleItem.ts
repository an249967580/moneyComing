import { Common } from "../common/Common";

const {ccclass, property, menu} = cc._decorator;

/**
 * @author 徐航 (xuhang)
 * @version 2024.06.26
 * 
 */
@ccclass
@menu('xuhang/item/multipleItem')
export default class multipleItem extends cc.Component {


    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    win: cc.Node = null;

    @property(sp.Skeleton)
    iconAni: sp.Skeleton = null;

    private _multiple: string = '';

    private  jumpDuration = 1 // 跳动一次的持续时间

    private  scaleUpRatio = 1.15; 

    private  scaleDownRatio = 1;

    initView(multiple: string) {
        // console.log(multiple);
        this._multiple = multiple;
        let a = this;
        cc.resources.load('atlas/item', cc.SpriteAtlas, async function (err, m_atlas) {
            // let icon = cc.instantiate(a.chipIconNode_he);
            
            var frame: any;
            // @ts-ignore
            frame = m_atlas.getSpriteFrame(multiple);
            a.icon.getComponent(cc.Sprite).spriteFrame = frame;
        })
    }

    chageView(multiple: number) {
        // let a = this;
        // cc.resources.load('atlas/item', cc.SpriteAtlas, async function (err, m_atlas) {
        //     // let icon = cc.instantiate(a.chipIconNode_he);
            
        //     var frame: any;
        //     // @ts-ignore
        //     frame = m_atlas.getSpriteFrame(multiple + 'x_bg');
        //     a.icon.getComponent(cc.Sprite).spriteFrame = frame;
        // })
    }

    setRunAction() {
        this.icon.active = false;
        this.iconAni.node.active = true;

        if(this._multiple == 'x2') {
            this.iconAni.setAnimation(0, 'x2', true);
        }
        else if(this._multiple == 'x5') {
            this.iconAni.setAnimation(0, 'x5', true);
        }
        else if(this._multiple == 'x10') {
            this.iconAni.setAnimation(0, 'x10', true);
        }
        else if(this._multiple == 'all_respin') {
            this.iconAni.setAnimation(0, 'all', true);
        }
        else if(this._multiple == 'scatter') {
            this.iconAni.setAnimation(0, 'lvsexiaojiang', true);
        }
        else if(this._multiple == 'scatter_100') {
            this.iconAni.setAnimation(0, 'lpred', true);
        }
    }

    // setRunAction() {
    //     var bg_frame:any;
    //     var icon_frame:any;
    //     if(this._multiple == 'x2' || this._multiple == 'x5' || this._multiple == 'x10') {
    //         bg_frame = Common.item_icons[0].getSpriteFrame(this._multiple + '_bg')
    //         this.bg.getComponent(cc.Sprite).spriteFrame = bg_frame;

    //         icon_frame = Common.item_icons[0].getSpriteFrame(this._multiple + '_kong')
    //         this.icon.getComponent(cc.Sprite).spriteFrame = bg_frame;
    //     }
    //     else {
    //         // bg_frame = Common.item_icons[0].getSpriteFrame(this._multiple + '_kong')
    //         // this.bg.getComponent(cc.Sprite).spriteFrame = bg_frame;
    //     }
    //     // else {
    //     //     this.bg.active = false;
    //     //     this.icon.zIndex = 999;
    //     // }
    //     // icon_frame = Common.item_icons[0].getSpriteFrame(this._multiple);
    //     // this.icon.getComponent(cc.Sprite).spriteFrame = icon_frame;

    //     let originalScale;
    //     // if(this._multiple == 'wild') {
    //     //     this.bg.scale = 0.9;
    //     //     originalScale = 0.9;
    //     // }
    //     // else {
    //         this.bg.scale = 1;
    //         originalScale = this.icon.scale;
    //     // }
    //     var scaleUpAction = cc.scaleTo(this.jumpDuration / 2, originalScale * this.scaleUpRatio).easing(cc.easeElasticInOut(0.4));
    //     var scaleDownAction = cc.scaleTo(this.jumpDuration / 2, originalScale * this.scaleDownRatio);
    //     var jumpAction = cc.sequence(scaleUpAction, scaleDownAction);

    //     // 无限重复动作
    //     var repeatAction = cc.repeatForever(jumpAction);

    //     // 开始动作
    //     this.icon.runAction(repeatAction);
    // }

    get multiple() {
        return this._multiple;
    }
}