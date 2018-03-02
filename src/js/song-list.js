{
    let view = {
        el: document.querySelector('.songList-container'),
        template(songName){
            let t = `
            <ul class="songList">
                <li>${songName}</li>
            </ul>`
            return t
        },
        render(data) {
            let t = this.template(data)
            this.el.innerHTML = t
            console.log('t', this.el.innerHTML)
        }
    }
    let model = {
        data: '000'
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)

}