const { Router } = require("express");
const { getMusicFromAlbum, getAlbumSelectionForm } = require("../controllers/fromAlbumMusicController");

const fromAlbumMusicRouter = Router();



fromAlbumMusicRouter.get("/select_album", getAlbumSelectionForm)

// fromAlbumMusicRouter.get("/:album_id", getMusicFromAlbum)

fromAlbumMusicRouter.post("/", getMusicFromAlbum)

module.exports = { fromAlbumMusicRouter }

