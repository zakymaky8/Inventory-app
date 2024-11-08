const { Router } = require("express");
const { getAlbums, postAlbumFromForEdit } = require("../controllers/albumsController");

const albumsRouter = Router();



albumsRouter.get("/", getAlbums)

albumsRouter.post("/edit/:album_id", postAlbumFromForEdit)

module.exports = { albumsRouter }

