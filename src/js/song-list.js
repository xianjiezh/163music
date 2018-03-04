{
    let view = {
        el: document.querySelector('.songList-container'),
        init() {
            this.el.innerHTML = `<ul class="songList"></ul>`
        },
        template(songName) {
            let t = `<li class="active" id="${id}">${songName}</li>`
            return t
        },
        addSongs(data) {
            let t = this.template(data)
            this.el.querySelector('.songList').insertAdjacentHTML('beforeend', t)
        }
    }
    let model = {
        data: {},
        songs:[],
        playlist: null,
        
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEventHub()
        },
        deActive(elements){
            for (let i = 0; i < elements.length; i++) {
                const ele = elements[i]
                ele.classList.remove('active')
            }
        },
        bindEventHub(){
            window.eventHub.on('upload', data => {
                this.model.data = data
                this.deActive(this.view.el.querySelector('.songList').children)
                this.view.addSongs(this.model.data.name)
                this.model.songs.push(data)
                log(this.model.songs)
            })
        }
    }
    controller.init(view, model)

}