// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Common } from "../common/Common";
import { EgrManager } from "../manager/EgrManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoSpinView extends cc.Component {


    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    main: cc.Node = null;

    @property(cc.Toggle)
    totalSpin_Toggle: cc.Toggle = null;

    @property(cc.Toggle)
    singleWinRatioExceeds_Toggle: cc.Toggle = null;

    @property(cc.Toggle)
    winStop_Toggle: cc.Toggle = null;

    @property(cc.Toggle)
    lossStop_Toggle: cc.Toggle = null;

    @property(cc.Label)
    totalSpinLabel: cc.Label = null;

    @property(cc.Label)
    winRatioLabel: cc.Label = null;

    @property(cc.Label)
    stopifBalance_1: cc.Label = null;

    @property(cc.Label)
    stopifBalance_2: cc.Label = null;

    @property(cc.EditBox)
    winEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    lossEditBox: cc.EditBox = null;

    private totalSpinNum: number = 100;

    private singleNum: number = 100;

    private balanceIfLoseNum: number = 0;

    private balanceIfWinNum: number = 0;

    private heldDown: boolean = false;
    private holdTimer: number = 0;

    private callbackSchedule: any;


    onLoad () {
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndNode, this);
        this.main.getChildByName('selectSpin').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.main.getChildByName('selectSpin').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.main.getChildByName('selectSpin').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.main.getChildByName('selectSingle').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.main.getChildByName('selectSingle').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.main.getChildByName('selectSingle').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.main.getChildByName('stop_1').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.main.getChildByName('stop_1').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.main.getChildByName('stop_1').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.main.getChildByName('stop_2').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.main.getChildByName('stop_2').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.main.getChildByName('stop_2').getChildByName('addBtn').on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

        this.main.getChildByName('selectSpin').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onreducTouchEnd, this);
        this.main.getChildByName('selectSpin').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_END, this.onreducTouchEnd, this);
        this.main.getChildByName('selectSpin').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_START, this.onReduceTouchStart, this);
        this.main.getChildByName('selectSingle').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onreducTouchEnd, this);
        this.main.getChildByName('selectSingle').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_END, this.onreducTouchEnd, this);
        this.main.getChildByName('selectSingle').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_START, this.onReduceTouchStart, this);
        this.main.getChildByName('stop_1').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onreducTouchEnd, this);
        this.main.getChildByName('stop_1').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_END, this.onreducTouchEnd, this);
        this.main.getChildByName('stop_1').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_START, this.onReduceTouchStart, this);
        this.main.getChildByName('stop_2').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_CANCEL, this.onreducTouchEnd, this);
        this.main.getChildByName('stop_2').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_END, this.onreducTouchEnd, this);
        this.main.getChildByName('stop_2').getChildByName('jianBtn').on(cc.Node.EventType.TOUCH_START, this.onReduceTouchStart, this);

        this.lossEditBox.node.on('text-changed', this.onlossTextChanged, this);
        this.winEditBox.node.on('text-changed', this.onwinTextChanged, this);
    }

    losseditBoxClear() {
        this.lossEditBox.string = ''
    }

    wineditBoxClear() {
        this.winEditBox.string = ''
    }

    show(desc) {
        let winSize = cc.view.getVisibleSize();
        let toScale = winSize.width / 390; 
        // this.totalSpin_Toggle.isChecked = Common.totalSpin;
        this.singleWinRatioExceeds_Toggle.isChecked = Common.singleWin;
        this.winStop_Toggle.isChecked = Common.stopwinBalance;
        this.lossStop_Toggle.isChecked = Common.stopLoseBalance
        if(Common.totalSpinNumber > 0) {
            this.totalSpinNum = Common.totalSpinNumber;
        }
        else {
            this.totalSpinNum = 100;
        }
        if(Common.singleWinNumber != 0) {
            this.singleNum = Common.singleWinNumber
        }
        else {
            this.singleNum = 100
        }
        if(Common.stopwinBalanceNumber != 0) {
            this.balanceIfWinNum = Common.stopwinBalanceNumber;
        }
        else {
            this.balanceIfWinNum = Math.floor(Common.availableamount + Common.availableamount * 0.5);
        }
        if(Common.stopLoseBalanceNumber != 0) {
            this.balanceIfLoseNum = Common.stopLoseBalanceNumber
        }
        else {
            this.balanceIfLoseNum = Math.floor(Common.availableamount - Common.availableamount * 0.6);
        }
        this.totalSpinLabel.string = this.totalSpinNum + '';
        this.winRatioLabel.string = this.singleNum.toLocaleString() + 'X';
        this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum.toString();
        this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum.toString();
        this.lossEditBox.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
        this.winEditBox.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
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
    
    private isPressIng:boolean = false;
    private pressStartTime: number = 0;
    private increaseRate: number = 1;
    private touchTime: number = 0;
    onTouchStart(event: any) {
        let a = this;
        // this.heldDown = true;
        // // this.holdTimer = setTimeout(()=>{
        function wrappedCallback(param) {
            return (()=>{
                a.increaseNumber(param);
            })
        }
        // this.callbackSchedule = this.schedule(wrappedCallback(event.currentTarget.parent), 0.1);
        let node = event.currentTarget.parent
        this.isPressIng = true;
        this.pressStartTime = Date.now();
        this.schedule(wrappedCallback(event.currentTarget.parent), 0.1);
        // })
    }

    increaseNumber(node: any) {
        if(!this.isPressIng){
            return;
        }
        let pressDuration = Date.now() - this.pressStartTime;
         console.log('按住时间>>', pressDuration)
         // 根据按住时间长短增加数字
         let increaseAmount = 0;
         if (pressDuration < 1200) {
            // if(node.name == 'selectSpin') {
            //     increaseAmount = 1;
            // }
            // else {
                increaseAmount = Math.floor(pressDuration / 100) * this.increaseRate;
            // }
            // 按住时间少于1秒，增加个位数
            
        } else if (pressDuration < 2000) {
            // 按住时间少于5秒，增加十位数
            increaseAmount = Math.floor(pressDuration / 100) * this.increaseRate * 10;
        } else if(pressDuration >= 2000){
            // 按住时间大于等于5秒，增加百位数
            increaseAmount = Math.floor(pressDuration / 100) * this.increaseRate * 10;
        }
        // console.log('递增数字>>', increaseAmount);
        if(node.name == 'selectSpin') {
            this.totalSpinNum += increaseAmount;
            if(this.totalSpinNum >= 999) {
                this.totalSpinNum = 999;
            }
            this.totalSpinLabel.string = this.totalSpinNum + '';
            this.totalSpin_Toggle.isChecked = true;
        }
        else if(node.name == 'selectSingle') {
            this.singleNum += increaseAmount;
            if(this.singleNum <= 1) {
                this.singleNum = 1;
            }
            this.winRatioLabel.string =  this.singleNum.toLocaleString();
            this.singleWinRatioExceeds_Toggle.isChecked = true;
        }
        else if(node.name == 'stop_1') {
            this.balanceIfLoseNum += increaseAmount;
            if(this.balanceIfLoseNum <= 0) {
                this.balanceIfLoseNum = 0;
            }
            this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
            this.lossEditBox.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
            this.winStop_Toggle.isChecked = true;
        }
        else if(node.name == 'stop_2') {
            this.balanceIfWinNum += increaseAmount;
            if(this.balanceIfWinNum <= 0) {
                this.balanceIfWinNum = 0;
            }
            this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
            this.winEditBox.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
            this.lossStop_Toggle.isChecked = true;
        }
        // this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum;
        // this.lossStop_Toggle.isChecked = true;
    }

    onlossTextChanged(editBox, customEventData) {
        let text = editBox.string;
        if(Number(text) > Math.floor(Common.availableamount)) {
            // this.manualInputEditBox.textLabel.string = Math.floor(Common.balance).toString();
            this.lossEditBox.string = Common.availableamount.toLocaleString();
            this.balanceIfLoseNum = Common.availableamount;
        }
        else {
            this.lossEditBox.string = '₹ ' + text;
            this.balanceIfLoseNum = Number(text);
        }
        
        this.winStop_Toggle.isChecked = true;
        // if(!this.isNumber(text)) {
        //     Common.showPrompt('main.tip6', 1);
        //     this.manualInputEditBox.string = text.replace(/\./g, "");
        //     return;
        // }
    }

    onwinTextChanged(editBox, customEventData) {
        let text = editBox.string;
        // if(Number(text) > Math.floor(Common.availableamount)) {
        //     // this.manualInputEditBox.textLabel.string = Math.floor(Common.balance).toString();
        //     this.winEditBox.string = Common.availableamount.toLocaleString();
        //     this.balanceIfWinNum = Common.availableamount;
        // }
        // else {
        this.winEditBox.string = '₹ ' + text.toLocaleString();
        this.balanceIfWinNum = Number(text);
        // 
        if(this.winEditBox.string.length > 12) {
            this.winEditBox.fontSize = 18 - (text.length - 11);
        }
        else {
            this.winEditBox.fontSize = 18
        }
        // else if(text == 14)
        // }
        this.lossStop_Toggle.isChecked = true;
        // if(!this.isNumber(text)) {
        //     Common.showPrompt('main.tip6', 1);
        //     this.manualInputEditBox.string = text.replace(/\./g, "");
        //     return;
        // }
    }

    onReduceTouchStart(event: any) {
        let a = this;
        this.heldDown = true;
        // this.holdTimer = setTimeout(()=>{
        function wrappedCallback(param) {
            return (()=>{
                a.reduceNumber(param);
            })
        }
        let node = event.currentTarget.parent
        this.isPressIng = true;
        this.pressStartTime = Date.now();
        this.schedule(wrappedCallback(event.currentTarget.parent), 0.1);
    }

    onTouchEndNode(event: any) {
        console.log('松手');
        if (this.isPressIng) {
            this.isPressIng = false;
            this.unscheduleAllCallbacks();;  // 停止更新数字
        }
    }

    onTouchEnd(event: any) {
        
        // this.heldDown = false;
        // this.touchTime = 0;
        // this.unscheduleAllCallbacks();

        if (this.isPressIng) {
            this.isPressIng = false;
            this.unscheduleAllCallbacks();;  // 停止更新数字
        }
        // 计算按住时间
        let node = event.currentTarget.parent
        let pressDuration = Date.now() - this.pressStartTime;
        if (pressDuration < 1000) {
            if(node.name == 'selectSpin') {
                this.totalSpinNum += 1;
                if(this.totalSpinNum >= 999) {
                    this.totalSpinNum = 999;
                }
                this.totalSpinLabel.string = this.totalSpinNum + '';
                this.totalSpin_Toggle.isChecked = true;
            }
            else if(node.name == 'selectSingle') {
                this.singleNum += 10;
                this.winRatioLabel.string =  this.singleNum.toLocaleString();
                this.singleWinRatioExceeds_Toggle.isChecked = true;
            }
            else if(node.name == 'stop_1') {
                this.balanceIfLoseNum += 10;
                this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
                this.lossEditBox.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
                this.winStop_Toggle.isChecked = true;
            }
            else if(node.name == 'stop_2') {
                this.balanceIfWinNum += 10;
                this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
                this.winEditBox.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
                this.lossStop_Toggle.isChecked = true;
            }
        }
        this.winRatioLabel.string =  this.singleNum + 'X';
    }

    onreducTouchEnd(event: any) {
        // this.heldDown = false;
        // this.touchTime = 0;
        // this.unscheduleAllCallbacks();

        if (this.isPressIng) {
            this.isPressIng = false;
            this.unscheduleAllCallbacks();;  // 停止更新数字
        }
        // 计算按住时间
        let node = event.currentTarget.parent
        let pressDuration = Date.now() - this.pressStartTime;
        if (pressDuration < 1000) {
            if(node.name == 'selectSpin') {
                this.totalSpinNum -= 1;
                if(this.totalSpinNum <= 5) {
                    this.totalSpinNum = 5;
                }
                this.totalSpinLabel.string = this.totalSpinNum + '';
                this.totalSpin_Toggle.isChecked = true;
            }
            else if(node.name == 'selectSingle') {
                this.singleNum -= 10;
                if(this.singleNum <= 1) {
                    this.singleNum = 1;
                }
                this.winRatioLabel.string =  this.singleNum.toLocaleString();
                this.singleWinRatioExceeds_Toggle.isChecked = true;
            }
            else if(node.name == 'stop_1') {
                this.balanceIfLoseNum -= 10;
                if(this.balanceIfLoseNum <= 10) {
                    this.balanceIfLoseNum = 10;
                }
                this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
                this.lossEditBox.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
                this.winStop_Toggle.isChecked = true;
            }
            else if(node.name == 'stop_2') {
                this.balanceIfWinNum -= 10;
                if(this.balanceIfWinNum <= 10) {
                    this.balanceIfWinNum = 10;
                }
                this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
                this.winEditBox.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
                this.lossStop_Toggle.isChecked = true;
            }
        }
        this.winRatioLabel.string =  this.singleNum + 'X';
    }

    // increaseNumber(node: any) {
    //     this.touchTime += 1
    //     if(node.name == 'selectSpin') {
    //         if(this.totalSpinNum >= 999) {
    //             this.totalSpinNum = 999;
    //         }
    //         this.totalSpinLabel.string = this.totalSpinNum + '';
    //         this.totalSpin_Toggle.isChecked = true;
    //     }
    //     else if(node.name == 'selectSingle') {
    //         this.singleNum += 1;
    //         this.winRatioLabel.string =  this.singleNum.toLocaleString();
    //         this.singleWinRatioExceeds_Toggle.isChecked = true;
    //     }
    //     else if(node.name == 'stop_1') {
    //         if(this.touchTime < 2) {
    //             this.balanceIfLoseNum += 10;
    //         }
    //         else if(1 < this.touchTime && this.touchTime < 3) {
    //             this.balanceIfLoseNum += 10
    //         }
    //         else if(4 < this.touchTime && this.touchTime < 6) {
    //             this.balanceIfLoseNum += 100
    //         }
    //         else if(7 < this.touchTime && this.touchTime < 9) {
    //             this.balanceIfLoseNum += 1000;
    //         }
    //         else if(10 < this.touchTime && this.touchTime < 12) {
    //             this.balanceIfLoseNum += 10000;
    //         }
    //         else if(this.touchTime > 15) {
    //             this.balanceIfLoseNum += 100000
    //         }
    //         // this.balanceIfLoseNum += 10;
    //         this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum;
    //         this.lossStop_Toggle.isChecked = true;
    //     }
    //     else if(node.name == 'stop_2') {
    //         if(this.touchTime < 2) {
    //             this.balanceIfWinNum += 10;
    //         }
    //         else if(1 < this.touchTime && this.touchTime < 3) {
    //             this.balanceIfWinNum += 10
    //         }
    //         else if(4 < this.touchTime && this.touchTime < 6) {
    //             this.balanceIfWinNum += 100
    //         }
    //         else if(7 < this.touchTime && this.touchTime < 9) {
    //             this.balanceIfWinNum += 1000;
    //         }
    //         else if(10 < this.touchTime && this.touchTime < 12) {
    //             this.balanceIfWinNum += 10000;
    //         }
    //         else if(this.touchTime > 15) {
    //             this.balanceIfWinNum += 100000
    //         }
    //         // this.balanceIfWinNum += 10;
    //         this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum;
    //         this.winStop_Toggle.isChecked = true;
    //     }
    // }

    reduceNumber(node: any) {
        if(!this.isPressIng){
            return;
        }
        let pressDuration = Date.now() - this.pressStartTime;
         console.log('按住时间>>', pressDuration)
         // 根据按住时间长短增加数字
         let increaseAmount = 0;
         if (pressDuration < 1200) {
            // if(node.name == 'selectSpin') {
            //     increaseAmount = 1;
            // }
            // else {
                increaseAmount = Math.floor(pressDuration / 100) * this.increaseRate;
            // }
            // 按住时间少于1秒，增加个位数
            
        } else if (pressDuration < 2000) {
            // 按住时间少于5秒，增加十位数
            increaseAmount = Math.floor(pressDuration / 100) * this.increaseRate * 10;
        } else if(pressDuration >= 2000){
            // 按住时间大于等于5秒，增加百位数
            increaseAmount = Math.floor(pressDuration / 100) * this.increaseRate * 10;
        }
        // console.log('递增数字>>', increaseAmount);
        if(node.name == 'selectSpin') {
            this.totalSpinNum -= increaseAmount;
            if(this.totalSpinNum <= 5) {
                this.totalSpinNum = 5;
            }
            this.totalSpinLabel.string = this.totalSpinNum + '';
            this.totalSpin_Toggle.isChecked = true;
        }
        else if(node.name == 'selectSingle') {
            this.singleNum -= increaseAmount;
            if(this.singleNum <= 1) {
                this.singleNum = 1;
            }
            this.winRatioLabel.string =  this.singleNum.toLocaleString();
            this.singleWinRatioExceeds_Toggle.isChecked = true;
        }
        else if(node.name == 'stop_1') {
            this.balanceIfLoseNum -= increaseAmount;
            if(this.balanceIfLoseNum <= 0) {
                this.balanceIfLoseNum = 0;
            }
            this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
            this.lossEditBox.string = '₹ ' + this.balanceIfLoseNum.toLocaleString();
            this.winStop_Toggle.isChecked = true;
        }
        else if(node.name == 'stop_2') {
            this.balanceIfWinNum -= increaseAmount;
            if(this.balanceIfWinNum <= 0) {
                this.balanceIfWinNum = 0;
            }
            this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
            this.winEditBox.string = '₹ ' + this.balanceIfWinNum.toLocaleString();
            this.lossStop_Toggle.isChecked = true;
        }
        // if(node.name == 'selectSpin') {
        //     this.totalSpinNum -= 1;
        //     if(this.totalSpinNum <= 5) {
        //         this.totalSpinNum = 5;
        //     }
        //     this.totalSpinLabel.string = this.totalSpinNum + ''
        //     this.totalSpin_Toggle.isChecked = true;
        // }
        // else if(node.name == 'selectSingle') {
        //     this.singleNum -= 1;
        //     if(this.singleNum <= 1) {
        //         this.singleNum = 1;
        //     }
        //     this.winRatioLabel.string =  this.singleNum.toLocaleString();
        //     this.singleWinRatioExceeds_Toggle.isChecked = true;
        // }
        // else if(node.name == 'stop_1') {
        //     if(this.balanceIfLoseNum.toString().length == 1) {
        //         this.balanceIfLoseNum -= 1;
        //     }
        //     else if(this.balanceIfLoseNum.toString().length == 2) {
        //         this.balanceIfLoseNum -= 10
        //     }
        //     else if(this.balanceIfLoseNum.toString().length == 3) {
        //         this.balanceIfLoseNum -= 10
        //     }
        //     else if(this.balanceIfLoseNum.toString().length == 4) {
        //         this.balanceIfLoseNum -= 100
        //     }
        //     else if(this.balanceIfLoseNum.toString().length == 5) {
        //         this.balanceIfLoseNum -= 1000
        //     }
        //     else if(this.balanceIfLoseNum.toString().length == 6) {
        //         this.balanceIfLoseNum -= 10000;
        //     }
        //     else{
        //         this.balanceIfLoseNum -= 10000;
        //     }
        //     if(this.balanceIfLoseNum <= 0) {
        //         this.balanceIfLoseNum = 0;
        //     }
        //     this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum;
        //     this.lossStop_Toggle.isChecked = true;
        // }
        // else if(node.name == 'stop_2') {
        //     if(this.balanceIfWinNum.toString().length == 1) {
        //         this.balanceIfWinNum -= 1;
        //     }
        //     else if(this.balanceIfWinNum.toString().length == 2) {
        //         this.balanceIfWinNum -= 10
        //     }
        //     else if(this.balanceIfWinNum.toString().length == 3) {
        //         this.balanceIfWinNum -= 10
        //     }
        //     else if(this.balanceIfWinNum.toString().length == 4) {
        //         this.balanceIfWinNum -= 100
        //     }
        //     else if(this.balanceIfWinNum.toString().length == 5) {
        //         this.balanceIfWinNum -= 1000
        //     }
        //     else if(this.balanceIfWinNum.toString().length == 6) {
        //         this.balanceIfWinNum -= 10000;
        //     }
        //     if(this.balanceIfWinNum <= 0) {
        //         this.balanceIfWinNum = 0;
        //     }
        //     this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum;
        //     this.winStop_Toggle.isChecked = true;
        // }
    }

    onAddHandler(event: any, customEventData: any) {
        if(event.currentTarget.parent.name == 'selectSpin') {
            this.totalSpinNum += 1;
            if(this.totalSpinNum >= 999) {
                this.totalSpinNum = 999;
            }
            this.totalSpinLabel.string = this.totalSpinNum + '';
            this.totalSpin_Toggle.isChecked = true;
        }
        else if(customEventData == 'single') {
            this.singleNum += 1;
            this.winRatioLabel.string =  this.singleNum.toLocaleString();
        }
        else if(customEventData == 'stop_1') {
            this.balanceIfLoseNum += 10;
            this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum;
            this.winStop_Toggle.isChecked = true;
        }
        else if(customEventData == 'stop_2') {
            this.balanceIfWinNum += 10;
            this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum;
            this.winEditBox.string = '₹ ' + this.balanceIfWinNum;
            this.lossStop_Toggle.isChecked = true;
        }
    }

    onReduceHandler(event: any, customEventData: any) {
        if(customEventData == 'spin') {
            this.totalSpinNum -= 1;
            if(this.totalSpinNum <= 5) {
                this.totalSpinNum = 5;
            }
            this.totalSpinLabel.string = this.totalSpinNum + ''
        }
        else if(customEventData == 'single') {
            this.singleNum -= 1;
            if(this.singleNum <= 1) {
                this.singleNum = 1;
            }
            this.winRatioLabel.string =  this.singleNum + 'X';
        }
        else if(customEventData == 'stop_1') {
            this.balanceIfLoseNum -= 10;
            if(this.balanceIfLoseNum <= 0) {
                this.balanceIfLoseNum = 0;
            }
            this.stopifBalance_1.string = '₹ ' + this.balanceIfLoseNum;
        }
        else if(customEventData == 'stop_2') {
            this.balanceIfWinNum -= 10;
            if(this.balanceIfWinNum <= 0) {
                this.balanceIfWinNum = 0;
            }
            this.stopifBalance_2.string = '₹ ' + this.balanceIfWinNum;
            this.winEditBox.string = '₹ ' + this.balanceIfWinNum;
        }
    }

    selectNum(event: any, customEventData: any) {
        this.totalSpinNum = Number(customEventData);
        this.totalSpinLabel.string = this.totalSpinNum + ''
    }

    onAutoStart() {
        if(this.totalSpin_Toggle.isChecked) {
            Common.totalSpinNumber = this.totalSpinNum;
            Common.totalSpin = true;
        }
        else {
            Common.totalSpinNumber = 10;
            Common.totalSpin = false;
        }
        if(this.singleWinRatioExceeds_Toggle.isChecked) {
            Common.singleWinNumber = this.singleNum;
            Common.singleWin = true;
        }
        else {
            Common.singleWinNumber = 0;
            Common.singleWin = false;
        }
        if(this.winStop_Toggle.isChecked) {
            Common.stopwinBalanceNumber = this.balanceIfWinNum;
            Common.stopwinBalance = true;
        }
        else {
            Common.stopwinBalanceNumber = 0;
            Common.stopwinBalance = false;
        }
        if(this.lossStop_Toggle.isChecked) {
            Common.stopLoseBalanceNumber = this.balanceIfLoseNum;
            Common.stopLoseBalance = true;
        }
        else {
            Common.stopLoseBalanceNumber = 0;
            Common.stopLoseBalance = false
        }
        EgrManager.Instance.dispatch_event('AutoStart', '', 1);
        this.hide();
    }
}
