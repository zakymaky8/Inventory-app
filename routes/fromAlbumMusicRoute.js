const { Router } = require("express");
const { getMusicFromAlbum, getAlbumSelectionForm, postMusicFromAlbumFormForEdit, postUpdatedInfoForMusicFromAlbum } = require("../controllers/fromAlbumMusicController");

const fromAlbumMusicRouter = Router();



fromAlbumMusicRouter.get("/select_album", getAlbumSelectionForm)

fromAlbumMusicRouter.post("/", getMusicFromAlbum);

fromAlbumMusicRouter.post("/edit/:mfa_id", postMusicFromAlbumFormForEdit);

fromAlbumMusicRouter.post("/edit/mfa/:mfa_id", postUpdatedInfoForMusicFromAlbum);

module.exports = { fromAlbumMusicRouter }

