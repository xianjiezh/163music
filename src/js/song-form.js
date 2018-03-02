{
    let model = {
        data: {}
    }
    let view = {
        el: document.querySelector('.page main'),
        template(singer, songName, link){
            let t = `
            <form class="saveSongsForm">
                <div class="row">
                    <label>
                        <span class="message">歌手：</span>
                        <input type="text" value="${singer}">
                    </label>
                </div>
                <div class="row">
                    <label>
                        <span class="message">歌曲名：</span>
                        <input type="text" value="${songName}">
                    </label>
                </div>
                <div class="row">
                    <label>
                        <span class="message">歌曲外链：</span>
                        <input type="text" value="${link}">
                    </label>
                </div>
                <div class="row">
                    <span class="message"></span>
                    <button type="submit">保存</button>
                </div>
            </form>
            `
            return t
        } ,
        render(data) {
            let {singer, songName, link} = data
            this.el.innerHTML = this.template(singer || '', songName || '', link || '')
        }
    }
    let controller = {
        init(model, view) {
            this.model = model
            this.view = view
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data) => {
                let o = {
                    singer: data.name.split('-')[0],
                    songName: data.name.split('-')[1],
                    link: data.link
                }
                this.view.render(o)
            })
        }
    }
    controller.init(model, view)
}