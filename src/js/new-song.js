{
    let view = {
        el: document.querySelector('.createSongs'),
        template(){
            let t = `
            <span>点击新建歌曲</span>
            `
            return t
        },
        render(data) {
            this.el.innerHTML = this.template()
        }
    }
    let model = {}
    let controller = {
        init(model, view) {
            this.model = model
            this.view = view
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data) => {
                this.active()
            })
        },
        active(){
            this.view.el.classList.add('active')
        }
    }
    controller.init(model, view)



}