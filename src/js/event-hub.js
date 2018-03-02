window.eventHub = {
    events: {},
    emit(eventName, data){
        for(let key in this.events){
            if(key === eventName){
                let fnList = this.events[key]
                fnList.forEach(fn => {
                    fn()
                })
            }
        }
    },
    on(eventName, callbackFn){
        if(!this.events[eventName]){
            this.events[eventName] = []
        }
        this.events[eventName].push(callbackFn)
    },
    off(){

    }
}