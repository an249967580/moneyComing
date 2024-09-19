const { ccclass, property } = cc._decorator;

@ccclass('EgrManager')
export  class EgrManager extends cc.Component {
    
    public static Instance: EgrManager = null;

    private events_map = {};

    onLoad() {
        if(EgrManager.Instance === null) {
            EgrManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    public add_event_listenner(event_name, caller, func) {
        if(!this.events_map[event_name]) {
            this.events_map[event_name] = [];
        }

        var event_queue = this.events_map[event_name];
        event_queue.push({
            caller: caller,
            func: func
        })
    }

    public remove_event_listenner(event_name, caller, func) {
        if(!this.events_map[event_name]) {
            return;
        }

        var event_queue = this.events_map[event_name];
        for(var i = 0; i < event_queue.length; i++) {
            var obj = event_queue[i];
            if(obj.caller == caller && obj.func == func) {
                event_queue.splice(i , 1);
                break;
            }
        }

        if(event_queue.length <= 0) {
            this.events_map[event_name] = null;
        }
    }

    public dispatch_event(event_name, uname = '', udata) {
        if(!this.events_map[event_name]) {
            return;
        }

        var event_queue = this.events_map[event_name];
        for(var i = 0; i < event_queue.length; i++) {
            var obj = event_queue[i];
            obj.func.call(obj.caller, event_name, uname, udata);
        }
    }
}


