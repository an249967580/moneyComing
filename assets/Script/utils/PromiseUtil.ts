/**
 * Promise 工具
 * @author 徐航
 * @version 20240507
 */
export default class PromiseUtil {

    /**
     * 等待
     * @param time 时长（秒）
     * @example
     * await PromiseUtil.sleep(1);
     */
    public static sleep(time: number): Promise<void> {
        return new Promise(res => cc.Canvas.instance.scheduleOnce(res, time));
    }
}