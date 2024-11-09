const { Router } = require("express");
const { getAlbums, postAlbumFromForEdit, postUpdatedInfoForAlbum } = require("../controllers/albumsController");

const albumsRouter = Router();



albumsRouter.get("/", getAlbums)

albumsRouter.post("/edit/:album_id", postAlbumFromForEdit)

albumsRouter.post("/edit/album/:alb_id", postUpdatedInfoForAlbum)

module.exports = { albumsRouter }

