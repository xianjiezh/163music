{
    let model = {}
    let view = {
        el: document.querySelector('.page main'),
        template: `
        <form class="saveSongsForm">
            <div class="row">
                <label>
                    <span class="message">歌手：</span>
                    <input type="text">
                </label>
            </div>
            <div class="row">
                <label>
                    <span class="message">歌曲名：</span>
                    <input type="text">
                </label>
            </div>
            <div class="row">
                <label>
                    <span class="message">歌曲外链：</span>
                    <input type="text">
                </label>
            </div>
            <div class="row">
                <span class="message"></span>
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data) {
            this.el.innerHTML = this.template
        }
    }
    let controller = {
        init(model, view) {
            this.model = model
            this.view = view
            this.view.render(this.model.data)
        }
    }
    controller.init(model, view)
}