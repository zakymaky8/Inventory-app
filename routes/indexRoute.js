const { Router } = require("express");
const { getHomePage, getArtistForm, getMusicTypeForm, postMusicTypeSelection } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getHomePage)

indexRouter.get("/add_artist", getArtistForm)

indexRouter.get("/music_type", getMusicTypeForm)

indexRouter.post("/add_music", postMusicTypeSelection)

module.exports = { indexRouter }
