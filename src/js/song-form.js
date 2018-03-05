{
    let model = {
        data: {
            singer: '',
            songName: '',
            url: ''
        },
        create(data) {
            let TestObject = AV.Object.extend('Playlist')
            let testObject = new TestObject()
            let { singer, songName, link } = data
            return testObject.save({
                singer: singer,
                songName: songName,
                link: link
            })
        }
    }
    let view = {
        el: document.querySelector('.page main .saveSongsForm'),
        render(data) {
            let { singer, songName, link } = data
            let inputSinger = this.el.querySelector('[name=singer]')
            let inputSongName = this.el.querySelector('[name=songName]')
            let inputLink = this.el.querySelector('[name=link]')
            inputSinger.value = singer
            inputSongName.value = songName
            inputLink.value = link
        }
    }
    let controller = {
        init(model, view) {
            this.model = model
            this.view = view
            this.bindEventHub()
            this.bindEvents()
        },
        bindEvents() {
            this.view.el.addEventListener('submit', (e) => {
                e.preventDefault()
                let m = ['singer', 'songName', 'link']
                let data = {}
                m.forEach(value => {
                    data[value] = this.view.el.querySelector(`[name=${value}]`).value
                })
                if (!document.querySelector('.createSongs').classList.contains('hide')) {
                    this.createSongs()
                } else {
                    this.editSongs()
                }

            })
        },
        bindEventHub() {
            window.eventHub.on('upload', (data) => {
                let o = {
                    singer: data.name.split(' - ')[0],
                    songName: data.name.split(' - ')[1],
                    link: data.link
                }
                this.view.render(o)
            })
            window.eventHub.on('selected', data => {
                log(data)
                let song = {
                    id: data.id,
                    singer: data.attributes.singer,
                    songName: data.attributes.songName,
                    link: data.attributes.link
                }
                log('song', song)
                this.view.render(song)
            })
        },
        reset() {
            this.view.render({})
        },
        createSongs() {
            this.model.create(data).then(o => {
                let { id, attributes } = o
                this.model.data = Object.assign({
                    id,
                    ...attributes
                    // 相当于下面这样写
                    // id: id,
                    // songName: attributes.songName,
                    // singer: singer,
                    // link: attributes.link
                })
                log(this.model.data)
                let submitButton = form.querySelector('[type="submit"]')
                submitButton.classList.remove('enabled')
                submitButton.classList.add('disabled')
                this.reset()
            }, (err) => {
                console.log(err)
            })
        },
        editSongs(data) {
            let { id, attributes } = data
                this.model.data = Object.assign({
                    id,
                    ...attributes
                })
            let song = AV.Object.createWithoutData('Songlist', id);
            // 修改属性
            song.set('singer', singer)
            song.set('songName', songName)
            song.set('link', link)
            // 保存到云端
            todo.save();
        }
    }
    controller.init(model, view)
}