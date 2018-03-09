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
            let { singer, songName, link, imgLink, lyrics} = data
            return testObject.save({
                singer: singer,
                songName: songName,
                link: link,
                imgLink: imgLink,
                lyrics: lyrics
            })
        }
    }
    let view = {
        el: document.querySelector('.page main .saveSongsForm'),
        render(data) {
            let { singer, songName, link, imgLink, lyrics} = data
            let inputSinger = this.el.querySelector('[name=singer]')
            let inputSongName = this.el.querySelector('[name=songName]')
            let inputLink = this.el.querySelector('[name=link]')
            let inputImgLink = this.el.querySelector('[name=imgLink]')
            let inputLyrics = this.el.querySelector('textarea')
            inputSinger.value = singer || ''
            inputSongName.value = songName || ''
            inputLink.value = link || ''
            inputImgLink.value = imgLink || ''
            inputLyrics.value = lyrics || ''
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
                let m = ['singer', 'songName', 'link', 'imgLink', 'lyrics']
                let data = {}
                m.forEach(value => {
                    data[value] = this.view.el.querySelector(`[name=${value}]`).value
                })
                if (!document.querySelector('.createSongs').classList.contains('hide')) {
                    this.createSongs(data)
                    this.reset()
                } else {
                    let id = this.model.editSongLi.id
                    let { singer, songName, link, imgLink, lyrics} = data
                    this.editSongs({ id, singer, songName, link })
                }
            })
        },
        bindEventHub() {
            window.eventHub.on('upload', (data) => {
                let dataCopy = JSON.parse(JSON.stringify(data))
                let o = {
                    singer: dataCopy.name.split(' - ')[0],
                    songName: dataCopy.name.split(' - ')[1],
                    link: dataCopy.link
                }
                this.view.render(o)
            })
            window.eventHub.on('selected', data => {
                let selectedSong = {
                    id: data.id,
                    singer: data.attributes.singer,
                    songName: data.attributes.songName,
                    link: data.attributes.link
                }
                this.model.editSongLi = Object.assign(selectedSong)
                this.view.render(selectedSong)
            })
            window.eventHub.on('selectedUploadList', data => {
                this.view.render(data)
            })
            window.eventHub.on('uploadImg', data => {
                this.view.el.querySelector('[name=imgLink]').value = data.imgLink
            })
        },
        reset() {
            this.view.render({})
        },
        createSongs(data) {
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
                window.eventHub.emit('successCreate', data)
                this.reset()
            })
        },
        editSongs(data) {
            log(data)
            let { id, singer, songName, link, lyrics} = data
            let song = AV.Object.createWithoutData('Playlist', id)
            song.set('singer', singer)
            song.set('songName', songName)
            song.set('link', link)
            song.set('imgLink', imgLink)
            song.set('lyrics', lyrics)
            song.save().then(res => {
                data['success'] = 'success'
                window.eventHub.emit('successEdit', data)
            })
        }
    }
    controller.init(model, view)
}