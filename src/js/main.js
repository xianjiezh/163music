
function xxxx() {
    var APP_ID = 'hIYCCR1IrJDOFPV1WgEftfS0-gzGzoHsz'
    var APP_KEY = 'WXIq5lFROJGSxBpkeTeqx25U'

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    })

    var TestObject = AV.Object.extend('Playlist')
    var testObject = new TestObject()
    testObject.save({
        name: 'test',
        cover: 'test',
        creatorId: 'test',
        description: 'test',
        songs: ['1', '2', '3']
    }).then(function (object) {
        console.log('leancloud rocks')
    })
}



