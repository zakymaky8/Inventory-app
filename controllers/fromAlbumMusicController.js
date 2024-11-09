const { getMusicFromAlbum_fromdb, get_albums_fromdb, getAllMusicFromOneAlbum, getArtists, getAllAlbums, updateMusicFromAlbum } = require("../db/query")


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


const postMusicFromAlbumFormForEdit = async function(req, res) {
    const { mfa_id } = req.params;
    const allMfas = await getMusicFromAlbum_fromdb();
    const allAlbums = await getAllAlbums();
    const artists = await getArtists();
    const mfa = allMfas.filter(mfa => mfa.mfa_id === Number(mfa_id));

    res.render("index", { title: `Edit ${mfa[0].music_title}`,
        page: "music_in_album",
        active: "from album",
        mode: "edit",
        mfa: mfa,
        artists: artists,
        albums: allAlbums
    });
}

const postUpdatedInfoForMusicFromAlbum = async function (req, res) {
    const { mfa_id }= req.params;
    await updateMusicFromAlbum(req.body, Number(mfa_id))
    res.redirect("/music_from_albums/select_album/")
}


module.exports = {
    getMusicFromAlbum,
    getAlbumSelectionForm,
    postMusicFromAlbumFormForEdit,
    postUpdatedInfoForMusicFromAlbum
}