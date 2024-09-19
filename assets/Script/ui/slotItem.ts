import { Common } from "../common/Common";

const {ccclass, property, menu} = cc._decorator;

/**
 * 老虎机数字item
 * @author 徐航 (xuhang)
 * @version 2024.06.26
 * 
 */
@ccclass
@menu('xuhang/item/slotItem')
export default class slotItem extends cc.Component {


    @property(cc.Node)
    icon: cc.Node = null;

    @property(sp.Skeleton)
    iconAni: sp.Skeleton = null;

    private m_type:string;

    private  jumpDuration = 1 // 跳动一次的持续时间

    private  scaleUpRatio = 1.15; 

    private  scaleDownRatio = 1 

    get type() {
        return this.m_type;
    }


    initView(type: string) {
        this.m_type = type;
        let a = this;
        // cc.resources.load('atlas/item', cc.SpriteAtlas, async function (err, m_atlas) {
            // let icon = cc.instantiate(a.chipIconNode_he);
            // @ts-ignore
            var frame: any;
                // @ts-ignore
            frame = Common.item_icons[0].getSpriteFrame(type);
                // a.icon.width = 168;
                // a.icon.height = 149;
            a.icon.getComponent(cc.Sprite).spriteFrame = frame;
        // })
    }

    changeView(type: string) {
        let a = this;
        // cc.resources.load('atlas/item', cc.SpriteAtlas, async function (err, m_atlas) {
        // let icon = cc.instantiate(a.chipIconNode_he);
        // @ts-ignore
        var frame: any;
            // @ts-ignore
        frame = Common.item_icons[0].getSpriteFrame(type);
            // a.icon.width = 168;
            // a.icon.height = 149;
        a.icon.getComponent(cc.Sprite).spriteFrame = frame;
    }

    setRunAction() {
        this.icon.active = false;
        this.iconAni.node.active = true;
        if(this.m_type == '00') {
            this.iconAni.setAnimation(0, 'doublezero', true);
        }
        else if(this.m_type == '0') {
            this.iconAni.setAnimation(0, 'zero', true);
        }
        else if(this.m_type == '1') {
            this.iconAni.setAnimation(0, 'onr', true);
        }
        else if(this.m_type == '5') {
            this.iconAni.setAnimation(0, 'five', true);
        }
        else if(this.m_type == '10') {
            this.iconAni.setAnimation(0, 'ten', true);
        }
        // let originalScale;
        // this.icon.scale = 1;
        // originalScale = this.icon.scale;

        // var scaleUpAction = cc.scaleTo(this.jumpDuration / 2, originalScale * this.scaleUpRatio).easing(cc.easeElasticInOut(0.4));
        // var scaleDownAction = cc.scaleTo(this.jumpDuration / 2, originalScale * this.scaleDownRatio);
        // var jumpAction = cc.sequence(scaleUpAction, scaleDownAction);

        // // 无限重复动作
        // var repeatAction = cc.repeatForever(jumpAction);

        // // 开始动作
        // this.icon.runAction(repeatAction);
    }
}