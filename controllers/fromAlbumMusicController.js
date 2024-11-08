const { getMusicFromAlbum_fromdb, get_albums_fromdb, getAllMusicFromOneAlbum } = require("../db/query")


const getAlbumSelectionForm = async function (req, res) {
    const albums  = await get_albums_fromdb()
    res.render("index", { title: "Select Album", page: "select_album", active: "from album", albums: albums })
}

const getMusicFromAlbum = async function (req, res) {
    const { album } = req.body;
    if (album === 'all_albums') {
        const music_from_album = await getMusicFromAlbum_fromdb();
        res.render("index", { title: "From Albums", page: "cards", active: "from album", items: music_from_album })
    } else {
        const music_from_album = await getAllMusicFromOneAlbum(album);
        console.log(music_from_album)
        res.render("index", { title: `From ${album}`, page: "cards", active: "from album", items: music_from_album})
    }
}


module.exports = {
    getMusicFromAlbum,
    getAlbumSelectionForm
}