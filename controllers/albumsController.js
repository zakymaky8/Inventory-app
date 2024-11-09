const { getAllAlbums, addAlbum, getArtists, updateAlbum } = require("../db/query");

const getAlbums = async function(req, res)  {
    const allAlbums = await getAllAlbums();
    // console.log(allAlbums);
    console.log(allAlbums)
    res.render("index", { title: "Albums", page: "cards", active: "albums", items: allAlbums })
}


const postAlbumFromForEdit = async function(req, res) {
    const { album_id } = req.params;
    const allAlbums = await getAllAlbums();
    const artists = await getArtists();
    const album = allAlbums.filter(album => album.albums_id === Number(album_id));

    res.render("index", { title: "Edit Album",
        page: "album_form",
        active: "albums",
        mode: "edit",
        album: album,
        artists: artists });
}

const postUpdatedInfoForAlbum = async function (req, res) {
    const { alb_id }= req.params;
    await updateAlbum(req.body, Number(alb_id))
    res.redirect("/albums")
}

module.exports = {
    getAlbums,
    postAlbumFromForEdit,
    postUpdatedInfoForAlbum
}