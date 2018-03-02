{
    let view = {
        el: document.querySelector('.songList-container'),
        template: `
        
        <ul class="songList">
            <li>1</li>
            <li>2adsf </li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
        </ul>
        `,
        render(data) {
            this.el.innerHTML = this.template
        }
    }
    let model = {}

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)

}