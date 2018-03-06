{
    let view = {
        el: document.querySelector('.editSongList'),
        template(song) {
            let id = song.id
            let singer = song.attributes.singer
            let songName = song.attributes.songName
            let t = `
            <li data-id=${id}>${singer} - ${songName}</li>
            `
            return t
        },
        render(song) {
            this.el.insertAdjacentHTML('beforeend', this.template(song))
        }
    }
    let model = {
        fetch() {
            let query = new AV.Query('Playlist')
            return query.find()
        },
        songs: []
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.getSongs()
            this.selected()
            this.bindEventHub()
        },
        getSongs() {
            this.model.fetch().then(songs => {
                this.model.songs = songs
                songs.forEach(song => {
                    this.view.render(song)
                })
            })
        },
        selected() {
            this.view.el.addEventListener('click', e => {
                let liList = e.target.parentElement.children
                for (let i = 0; i < liList.length; i++) {
                    const li = liList[i]
                    li.classList.remove('active')

                }
                e.target.classList.add('active')
                let id = e.target.getAttribute('data-id')
                let songs = Object.assign(this.model.songs)
                songs.forEach(song => {
                    if (song.id === id) {
                        window.eventHub.emit('selected', song)
                    }
                })
            })
        },
        bindEventHub(){
            window.eventHub.on('successEdit', data => {
                let liList = this.view.el.children
                for (let i = 0; i < liList.length; i++) {
                    const li = liList[i]

                    if(li.getAttribute('data-id') === data.id){
                        let { id, singer, songName} = data
                        li.innerHTML = `${singer} - ${songName}`
                        break
                    }
                    
                }
            })
        }
        

    }
    controller.init(view, model)

}