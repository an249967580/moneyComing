// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Intro extends cc.Component {

    @property(cc.Node)
    view1: cc.Node = null;

    @property(cc.Node)
    view2: cc.Node = null;

    @property(cc.Button)
    rightBtn: cc.Button = null;

    @property(cc.Button)
    leftBtn: cc.Button = null;

    @property(cc.Node)
    iconNodes: cc.Node = null;

    // @property(cc.Node)
    // bigIconNode: cc.Node = null;

    @property(cc.Toggle)
    optionToggle_1: cc.Toggle = null;

    @property(cc.Toggle)
    optionToggle_2: cc.Toggle = null;

    @property(cc.Node)
    iconNodes_1: cc.Node = null;

    // @property(cc.Node)
    // titileNode: cc.Node = null;

    // @property(cc.Node)
    // beishuIconNode: cc.Node = null;

    @property(cc.ProgressBar)
    loadProgressBar: cc.ProgressBar = null;

    @property(cc.Label)
    loadingLabel: cc.Label = null;

    @property(cc.Button)
    continueBtn: cc.Button = null;

    onLoad(): void {
        cc.debug.setDisplayStats(false);

        cc.director.preloadScene("game", function () {
            cc.log("Next scene preloaded");
        });

        cc.resources.loadDir('atlas', (completedCount, totalCount, item) => {
            // console.log('加载个数>>', completedCount, totalCount)
            let progress = parseFloat((completedCount / totalCount).toFixed(3));
            this.updateProgress(progress);
        }, (error, assets) => {
            if (error) {
                console.error('Failed to preload resources:', error);
                return;
            }
            console.log('Resources preloaded successfully:', assets);
            // this.totalCount = this.totalCount + assets.length;
            // 跳转到游戏主场景或其他场景
            // cc.director.loadScene('MainScene');
        });
    }
    
    start(): void {
        this.iconAction();
        this.beishuIconAction();
        // this.loadingAction();
        // this.progressAction();
    }

    updateProgress(progress: number){
        if(progress > this.loadProgressBar.progress) {
            this.loadProgressBar.progress = progress;
            this.loadingLabel.string = 'Loading...' +  Math.floor(progress * 100) + '%'
        }
        if(progress >= 1) {
            this.loadingAction();
        }
    }

    iconAction() {
        // cc.tween(this.iconNodes).to(0.5, {
        //     opacity: 150
        // }, {easing: 'cubicInOut'})
        // .call(()=>{
        this.iconNodes.opacity = 255;
        var scaleToBig = cc.scaleTo(0.4, 1.2);
        var scaleToNormal = cc.scaleTo(0.4, 1);
        scaleToNormal.easing(cc.easeCubicActionInOut());
        var callback = cc.callFunc(this.onActionFinised, this);

        var sequence = cc.sequence(scaleToBig, scaleToNormal);
        var repeat = cc.repeatForever(sequence);

        this.iconNodes.runAction(repeat);
        // })
        // .start();
        
    }

    onActionFinised() {
        // var scaleToBig = cc.scaleTo(0.5, 0.9);
        // var scaleToNormal = cc.scaleTo(0.5, 0.8);
        // var callback = cc.callFunc(this.onBigIconActionFinised, this);
        // scaleToNormal.easing(cc.easeCubicActionInOut());
        // var sequence = cc.sequence(scaleToBig, scaleToNormal, callback);
        // var repeat = cc.repeat(sequence, 4);

        // this.bigIconNode.runAction(repeat);
    }

    private cyclesCount: number = 0;
    onBigIconActionFinised() {
        this.cyclesCount += 1;
        if(this.cyclesCount >= 4) {
            cc.tween(this.iconNodes).to(0.5, {
                opacity: 0
            }, {easing: 'cubicInOut'})
            .call(()=>{
                this.cyclesCount = 0;
                this.scheduleOnce(this.iconAction, 1);
            })
            .start();
        }
        // this.iconAction();
    }

    private beishu_cyclesCount: number = 0;
    beishuIconAction() {
        // cc.tween(this.beishuIconNode).to(0.5, {
        //     opacity: 150
        // }, {easing: 'cubicInOut'})
        // .call(()=>{
        //     this.beishuIconNode.opacity = 255;
        //     var scaleToBig = cc.scaleTo(0.6, 1.1);
        //     var scaleToNormal = cc.scaleTo(0.6, 1);
        //     scaleToNormal.easing(cc.easeCubicActionInOut());
        //     var callback = cc.callFunc(this.onbeishuIconActionFinised, this);

        //     var sequence = cc.sequence(scaleToBig, scaleToNormal, callback);
        //     var repeat = cc.repeat(sequence, 4);

        //     this.iconNodes_1.runAction(repeat);
        // })
        // .start();
        var scaleToBig = cc.scaleTo(0.6, 1.1);
        var scaleToNormal = cc.scaleTo(0.6, 1);
        scaleToNormal.easing(cc.easeCubicActionInOut());
        // var callback = cc.callFunc(this.onbeishuIconActionFinised, this);

        var sequence = cc.sequence(scaleToBig, scaleToNormal);
        var repeat = cc.repeatForever(sequence);

        this.iconNodes_1.runAction(repeat);
    }

    loadingAction() {
        this.loadingLabel.string = '';
        cc.tween(this.loadProgressBar.node).to(0.5, {
            scaleY: 0
        }, {easing: 'cubicInOut'})
        .call(()=>{
            cc.tween(this.continueBtn.node).to(0.5, {
                scaleY: 0.53
            }, {easing: 'cubicInOut'})
            .start();
        })
        .start();
    }

    leftMove() {
        this.optionToggle_1.isChecked = true;
        this.optionToggle_2.isChecked = false;
        this.rightBtn.node.active = true;
        this.leftBtn.node.active = false;
        cc.tween(this.view1).to(0.5, {
            position: new cc.Vec3(0, 0, 0)
        }, {easing: 'cubicInOut'})
        .start();

        cc.tween(this.view2).to(0.5, {
            position: new cc.Vec3(348, 0, 0)
        }, {easing: 'cubicInOut'})
        .start();
    }

    rightMove() {
        this.optionToggle_1.isChecked = false;
        this.optionToggle_2.isChecked = true;
        this.rightBtn.node.active = false;
        this.leftBtn.node.active = true;
        cc.tween(this.view1).to(0.5, {
            position: new cc.Vec3(-368, 0, 0)
        }, {easing: 'cubicInOut'})
        .start();

        cc.tween(this.view2).to(0.5, {
            position: new cc.Vec3(0, 0, 0)
        }, {easing: 'cubicInOut'})
        .start();
    }

    progressAction() {
        cc.tween(this.loadProgressBar)
        .to(0.5, {progress: 0.9}, {easing: cc.easeCubicActionOut})
        .start();
    }

    startGame() {
        cc.director.loadScene('game');
    }

    onShowNextTime(event) {
        if(event.isChecked) {
            cc.sys.localStorage.setItem('startScene', 'game')
        }
        else {
            cc.sys.localStorage.setItem('startScene', 'intro')
        }
    }

}
