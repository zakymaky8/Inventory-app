const { Router } = require("express");
const { getHomePage, getArtistForm, getMusicTypeForm, postMusicTypeSelection, postArtistData, postAlbumData, postSingleMusicData, postMusicFromAlbumData } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getHomePage)

indexRouter.get("/add_artist", getArtistForm)

indexRouter.get("/music_type", getMusicTypeForm)

indexRouter.post("/add_music", postMusicTypeSelection)

indexRouter.post("/artist_added", postArtistData);

indexRouter.post("/album_added", postAlbumData);

indexRouter.post("/single_added", postSingleMusicData);

indexRouter.post("/music_from_album_added", postMusicFromAlbumData)


module.exports = { indexRouter }
