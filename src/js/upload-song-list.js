{
    let view = {
        el: document.querySelector('.uploadSongList'),
        template(data) {

            let { name, link } = data
            let singer = name.split(' - ')[0]
            let songName = name.split(' - ')[1]
            let t = `
                <li data-link=${link}>${singer} - ${songName}</li>
            `
            return t
        },
        render(data) {
            this.el.insertAdjacentHTML('beforeend', this.template(data))
        }
    }
    let model = {
        songList: []
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEventHub()
            this.bindEvents()
        },
        bindEventHub() {
            window.eventHub.on('upload', data => {
                this.model.songList.push(data)
                this.view.render(data)
            })
            window.eventHub.on('successCreate', data => {
                let liList = this.view.el.children
                let link = data.link
                for (let i = 0; i < liList.length; i++) {
                    const li = liList[i]
                    log(link, li.getAttribute('data-link'))
                    if (link === li.getAttribute('data-link')) {
                        li.classList.add('finish')
                    }
                }
            })
            window.eventHub.on('uploadImg', data => {
                let liList = this.view.el.children
                if (liList.length) {
                    log(liList.length)
                    log()
                    liList[liList.length - 1].setAttribute('data-img', data.imgLink)
                } else {
                    alert('先上传一首歌，再上传图片哈')
                }
            })
        },
        bindEvents() {
            this.view.el.addEventListener('click', e => {
                let target
                if (e.target.tagName === 'LI') {
                    target = e.target
                    let liList = target.parentElement.children
                    for (let i = 0; i < liList.length; i++) {
                        const li = liList[i]
                        li.classList.remove('active')
                    }
                    target.classList.add('active')
                    let [singer, songName, link] = [target.textContent.split('-')[0], target.textContent.split('-')[1], target.getAttribute('data-link')]
                    let o = { singer, songName, link }
                    window.eventHub.emit('selectedUploadList', o)
                }

            })
        }
    }
    controller.init(view, model)
}