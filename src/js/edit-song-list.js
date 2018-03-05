{
    let view = {
        el: document.querySelector('.editSongList'),
    } 
    let model = {

    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEventHub()
        },
        deActive(elements) {
            for (let i = 0; i < elements.length; i++) {
                const ele = elements[i]
                ele.classList.remove('active')
            }
        },
        bindEventHub() {
            window.eventHub.on('upload', data => {
                this.deActive(this.view.el.querySelector('.songList').children)
                this.model.editSongs = data
                let t = this.view.template(data)
                this.view.uploadSongTemplate += t
                log(t)
                this.view.renderUpload()
            })
            window.eventHub.on('tabToEdit', data => {
                if (this.model.editSongs !== data) {
                    this.model.editSongs = data
                    this.view.editSongTemplate = ''
                    data.forEach(song => {
                        let t = this.view.template(song)
                        this.view.editSongTemplate += t
                    })
                    this.view.renderEdit()
                }

            })
        }
    }
    controller.init(view, model)

}