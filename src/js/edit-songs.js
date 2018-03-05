{
    let view = {
        el: document.querySelector('.editSongs'),
    }
    let model = {
        fetch() {
            let query = new AV.Query('Playlist')
            return query.find()
        },
        editedSongs: []
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.fetch()
            this.bindEvents()
        },
        bindEvents() {
            this.view.el.addEventListener('click', e => {
                this.view.el.classList.add('active')
                eventHub.emit('tabToEdit', this.model.editedSongs)
            })
        },
        fetch() {
            this.model.fetch().then(songs => {
                songs.forEach(song => {
                    let id = song.id
                    let songName = song.attributes.songName
                    let singer = song.attributes.singer
                    let o = { id, singer, songName }
                    this.model.editedSongs.push(o)
                })
            })
        }


    }
    controller.init(view, model)
}