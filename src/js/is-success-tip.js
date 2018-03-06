{
    let view = {
        el: document.querySelector('.successTip'),
        render(isSuccessed){
            if(isSuccessed){
                this.el.textContent = '保存成功'
                this.el.classList.remove('fail')
                this.el.classList.add('success')
            }else{
                this.el.textContent = '保存失败'
                this.el.classList.remove('success')
                this.el.classList.add('fail')
            }
        }
    }
    let model = {

    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('successEdit', data => {
                log(data)
                if(data + '' === 'successss'){
                    this.view.el.classList.add('success')
                    setTimeout(() => {
                        this.view.el.classList.remove('success')
                    }, 1700)
                } else{
                    this.view.el.classList.add('fail')
                    setTimeout(() => {
                        this.view.el.classList.remove('fail')
                    }, 1900)
                }
            })
        },
    }

    controller.init(view, model)

}