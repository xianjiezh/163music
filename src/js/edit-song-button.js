{
    let view = {
        el: document.querySelector('.editSongs'),
    }
    let model = {
    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            this.view.el.addEventListener('click', e => {
                e.currentTarget.classList.remove('hide')
                document.querySelector('.createSongs').classList.add('hide')
                document.querySelector('.uploadSongList').style.display = 'none'
                document.querySelector('.editSongList').style.display = 'block'
            })
        }

    }
    controller.init(view, model)
}