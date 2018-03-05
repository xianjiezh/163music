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
        el: document.querySelector('.page main'),
        template(singer, songName, link) {
            let t = `
            <form class="saveSongsForm">
                <div class="row">
                    <label>
                        <span class="message">歌手：</span>
                        <input type="text" value="${singer}" name="singer">
                    </label>
                </div>
                <div class="row">
                    <label>
                        <span class="message">歌曲名：</span>
                        <input type="text" value="${songName}" name="songName">
                    </label>
                </div>
                <div class="row">
                    <label>
                        <span class="message">歌曲外链：</span>
                        <input type="text" value="${link}" name="link">
                    </label>
                </div>
                <div class="row">
                    <span class="message"></span>
                    <input type="submit" class="enabled" value="提交">
                </div>
            </form>
            `
            return t
        },
        render(data) {
            let { singer, songName, link } = data
            this.el.innerHTML = this.template(singer || '', songName || '', link || '')
        }
    }
    let controller = {
        init(model, view) {
            this.model = model
            this.view = view
            this.view.render(this.model.data)
            this.bindEventHub()
            this.bindEvents()
        },
        bindEvents() {
            let form = this.view.el.querySelector('.saveSongsForm')
            form.addEventListener('submit', e => {
                e.preventDefault()
                let m = ['singer', 'songName', 'link']
                let data = {}
                m.forEach(value => {
                    data[value] = form.querySelector(`[name=${value}]`).value
                })
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
                    let submitButton = form.querySelector('[type="submit"]')
                    submitButton.disabled = true
                    submitButton.classList.remove('enabled')
                    submitButton.classList.add('disabled')
                    this.reset()
                },(err) =>{
                    console.log(err)
                })
            })
        },
        bindEventHub(){
            window.eventHub.on('upload', (data) => {
                let o = {
                    singer: data.name.split(' - ')[0],
                    songName: data.name.split(' - ')[1],
                    link: data.link
                }
                this.view.render(o)
            })
        },
        reset(){
            this.view.render({})
        }
    }
    controller.init(model, view)
}