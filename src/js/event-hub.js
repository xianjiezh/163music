
// 管理页面上数据
window.eventHub = {
    events: {},
    emit(eventName, data){
        // 执行之前放到 events 里面的函数
        for(let key in this.events){
            if(key === eventName){
                // 遍历地执行之前放进去数的函数
                let fnList = this.events[key]
                fnList.forEach(fn => {
                    fn(data)
                })
            }
        }
    },
    on(eventName, callbackFn){
        // on 这里不执行函数，只是把函数传进 events 里面
        if(!this.events[eventName]){
            this.events[eventName] = []
        }
        this.events[eventName].push(callbackFn)
    },
    off(){

    }
}