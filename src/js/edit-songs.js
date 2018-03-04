{
    let view = {
        el: document.querySelector('.editSongs'),
        init(){
            this.el.innerHTML = `<ul></ul>`
        },
        template(o) {
            let {id, singer, songName} = o
            let t = `
                <li data-id="${id}">${singer}-${songName}</li>
            `
            return t
        },
        render(o) {
            this.el.querySelector('ul').insertAdjacentHTML('beforeend', this.template(o))
            log('render2')
        },

    }
    let model = {
        fetch() {
            let query = new AV.Query('Playlist')
            return query.find()
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.model.fetch().then(songs => {
                songs.forEach(song => {
                    let id = song.id
                    let songName = song.attributes.songName
                    let singer = song.attributes.singer
                    let o = {id, singer, songName}
                    this.view.render(o)
                })
            })
        },
        bindEvents() {

        },


    }
    controller.init(view, model)
}