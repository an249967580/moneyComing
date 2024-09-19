import { SoundManager } from "../manager/SoundManager";

const { ccclass, property, menu } = cc._decorator;

/**
 * 按钮点击特效
 * @author 徐航 (xuhang)
 * @version 2024.05.07
 * 
 */
@ccclass
@menu('xuhang/button/ButtonEffect')
export default class ButtonEffect extends cc.Component {


    private startScale: number;

    private endScale: number

    onLoad() {

        this.startScale = this.node.scale;
        this.endScale = this.node.scale - 0.1;

        this.node.on(cc.Node.EventType.TOUCH_START, this.mouseDown, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.mouseEnd, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.mouseEnd, this)
        // this.node.on(Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => this.mouseMove(e))

    }

    mouseDown() {
        // let ani = this.node.getComponent(UIOpacity) as UIOpacity
        // ani.play('animation');
        // SoundManager.playSoundById('click');
        cc.tween(this.node)
        .to(0.1, {scale : this.endScale})
        // .to(0.5, {scale : new Vec3(1, 1, 1)})
        // .union()
        // .repeat(1) // 注意这里会重复 by 这个缓动 3 次
        .start()
    }

    mouseEnd() {
        SoundManager.playClickSound('click');
        cc.tween(this.node)
        // .to(0.5, {scale : new Vec3(0.5, 0.5, 0.5)})
        .to(0.1, {scale : this.startScale})
        // .union()
        // .repeat(1) // 注意这里会重复 by 这个缓动 3 次
        .start()
    }
}