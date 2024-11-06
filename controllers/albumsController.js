const { getAllAlbums, addAlbum } = require("../db/query");

const getAlbums = async function(req, res)  {
    const allAlbums = await getAllAlbums();
    res.render("index", { title: "Albums", page: "cards", active: "albums", items: allAlbums })
}


module.exports = {
    getAlbums,
}