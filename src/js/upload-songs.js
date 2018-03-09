
{
    let view = {
        el: document.querySelector('.upload-area'),
        
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.initQiniu(this.view.el)
        },
        initQiniu(view) {
            let uploadText = view.getElementsByClassName('upload-text')[0]
            let progressBar = view.getElementsByClassName('progressBar')[0]
            let uploader = Qiniu.uploader({
                runtimes: 'html5,html4',    //上传模式,依次退化
                browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                uptoken_url: 'http://47.100.0.222:9420/uptoken',
                domain: 'http://p4uyjeusv.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
                get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb',           //最大文件体积限制
                flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                max_retries: 3,                   //上传失败最大重试次数
                dragdrop: true,                   //开启可拖曳上传
                drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                //分块上传时，每片的体积
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                        })
                    },
                    'BeforeUpload': function (up, file) {
                        log(file.type)
                        if((file.type + '' !== 'audio/mp3') && (file.type + '' !== 'image/jpeg')){
                            up.destroy()
                            alert('只支持上传mp3格式的音频文件或jpg格式的图片')
                        }
                    },
                    'UploadProgress': function (up, file) {
                        
                        let num = up.files.length
                        uploadText.textContent = '正在上传第' + (up.total.uploaded - 0 + 1) + '个文件，共' + up.files.length + '个，' + '当前文件进度：' + file.percent + '%'
                        progressBar.classList.add('active')
                        progressBar.parentElement.classList.add('active')
                        progressBar.style.width = file.percent + '%'
                    },
                    'FileUploaded': function (up, file, info) {
                        
                        uploadText.textContent = '文件上传成功'
                        var domain = up.getOption('domain')
                        var res = JSON.parse(info.response)
                        var sourceLink = domain + encodeURIComponent(res.key)
                        log(file.type)
                        if(file.type === 'audio/mp3'){
                            window.eventHub.emit('upload', {
                                name: file.name,
                                link: sourceLink,
                                type: 'mp3'
                            })
                        } else if(file.type === 'image/jpeg'){
                            window.eventHub.emit('uploadImg', {
                                name: file.name,
                                imgLink: sourceLink,
                                type: 'jpeg'
                            })
                        }
                        
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function (up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效

                        var key = "";
                        // do something with key here
                        return key
                    }
                }
            })
        }
    }
    controller.init(view, model)
}


