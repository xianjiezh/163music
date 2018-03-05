{
    let view = {
        el: document.querySelector('.songList-container'),
        uploadSongTemplate: '',
        editSongTemplate: '',
        template(song) {
            let { id, songName } = song
            let t = `<li class="active" data-id="${id}">${songName}</li>`
            return t
        },
        render(data) {
            this.el.querySelector('.songList').innerHTML = this.uploadSongTemplate
        }
    }
    let model = {
        data: {},
        uploadSongs: [],
        editSongs: [],
        playlist: null,

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
                this.view.addSongs(this.model.data.name)
                this.model.songs.push(data)
                log(this.model.songs)
            })
            window.eventHub.on('tabToEdit', data => {
                if (this.editSongs !== data) {
                    this.editSongs = data
                    this.view.uploadSongTemplate = ''
                    data.forEach(song => {
                        let t = this.view.template(song)
                        this.view.uploadSongTemplate += t
                    })
                    log()
                    this.view.render(data)
                }

            })
        }
    }
    controller.init(view, model)

}