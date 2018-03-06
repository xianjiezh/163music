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
            
        },
    }

    controller.init(view, model)

}