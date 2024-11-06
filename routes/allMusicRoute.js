const { Router } = require("express");
const { getAllMusic } = require("../controllers/allMusicController");

const allMusicRouter = Router();



allMusicRouter.get("/", getAllMusic)

module.exports = { allMusicRouter }