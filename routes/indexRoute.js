const { Router } = require("express");
const { getHomePage, getArtistForm, getMusicTypeForm, postMusicTypeSelection, postArtistData, postAlbumData, postSingleMusicData, postMusicFromAlbumData, getTopRatedItems, postSearch } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getHomePage)

indexRouter.get("/add_artist", getArtistForm)

indexRouter.get("/music_type", getMusicTypeForm)

indexRouter.post("/add_music", postMusicTypeSelection)

indexRouter.post("/artist_added", postArtistData);

indexRouter.post("/album_added", postAlbumData);

indexRouter.post("/single_added", postSingleMusicData);

indexRouter.post("/music_from_album_added", postMusicFromAlbumData)

indexRouter.get("/top_rated", getTopRatedItems)

indexRouter.post("/search", postSearch)

module.exports = { indexRouter }
