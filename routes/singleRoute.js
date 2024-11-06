const { Router } = require("express");
const { getSingles } = require("../controllers/singleMusicController");

const singleRouter = Router();



singleRouter.get("/", getSingles)

module.exports = { singleRouter }



