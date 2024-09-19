import { Common } from "../common/Common";
// import i18nMgr, { Language } from "../i18n/i18nMgr";
import { ResManager } from "./ResManager";

const { ccclass, property } = cc._decorator;

@ccclass('SoundManager')
export class SoundManager extends cc.Component {

    public static audioSoure: cc.AudioSource;

    public static musicSoure: cc.AudioSource;

    public static girlSoure: cc.AudioSource;

    public static clickSoure: cc.AudioSource;

    public static playSoundById(strRes: string, volume: number = 1) {
        let a = this;
        // if(!isLoop) {
        // if(UserInfo.openSoundTag == 1) {
        //     return;
        // }
        // }
        

        ResManager.loadSound(strRes, function(clip){
            if(clip == null) {
                console.log("strRes = " + strRes + " 音效加载失败...........")
                return
            }
            a.audioSoure.clip = clip;
            if(Common.music_switch == 0) {
                a.audioSoure.play();
            }
            a.audioSoure.loop = false;
            a.audioSoure.volume = volume
        })
    }

    public static playwildSoundById(strRes: string, volume: number = 1) {
        let a = this;
        // if(!isLoop) {
        // if(UserInfo.openSoundTag == 1) {
        //     return;
        // }
        // }
        

        ResManager.loadSound(strRes, function(clip){
            if(clip == null) {
                console.log("strRes = " + strRes + " 音效加载失败...........")
                return
            }
            a.girlSoure.clip = clip;
            if(Common.music_switch == 0) {
                a.girlSoure.play();
            }
            a.girlSoure.loop = false;
            a.girlSoure.volume = volume
        })
    }

    public static playClickSound(strRes: string, volume: number = 1) {
        let a = this;
        ResManager.loadSound(strRes, function(clip){
            if(clip == null) {
                console.log("strRes = " + strRes + " 音效加载失败...........")
                return
            }
            a.clickSoure.clip = clip;
            if(Common.music_switch == 0) {
                a.clickSoure.play();
            }
            a.clickSoure.loop = false;
            a.clickSoure.volume = volume
        })
    }

    public static play(strRes: string, volume: number = 0.5) {
        let a = this;
        ResManager.loadSound(strRes, function(clip){
            if(clip == null) {
                console.log("strRes = " + strRes + " 音乐加载失败...........")
                return
            }
            // a.musicSoure.stop();
            a.musicSoure.clip = clip;
            if(Common.music_switch == 0) {
                a.musicSoure.play();
            }
            a.musicSoure.volume = volume;
            a.musicSoure.loop = true;
        })
    }

    static stopSound() {
        this.audioSoure.stop();
    }

    /**
     * stop the audio play
     */
    static stop() {
        console.log('背景音乐停止')
        this.musicSoure.stop();
    }

    /**
     * pause the audio play
     */
    static pause() {
        console.log('背景音乐暂停')
        this.musicSoure.pause();
    }

    /**
     * resume the audio play
     */
    static resume(){
        this.musicSoure.play();
    }
}