
function uploadSongMessage(name, description, songName) {

    var TestObject = AV.Object.extend('Playlist')
    var testObject = new TestObject()
    testObject.save({
        name: name,
        songName: songName
    }).then(function (object) {
        console.log('leancloud rocks')
    })
}
var log = console.log.bind(console)
 
