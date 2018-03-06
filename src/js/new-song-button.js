{
    let view = {
        el: document.querySelector('.createSongs'),
    }
    let model = {}
    let controller = {
        init(model, view) {
            this.model = model
            this.view = view
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents(){
            this.view.el.addEventListener('click', e => {
                e.currentTarget.classList.remove('hide')
                document.querySelector('.editSongs').classList.add('hide')
                document.querySelector('.uploadSongList').style.display = 'block'
                document.querySelector('.editSongList').style.display = 'none'
            })
        },
        bindEventHub(){
            window.eventHub.on('upload', data =>{
                this.view.el.click()
            })
        }
    }
    controller.init(model, view)

}