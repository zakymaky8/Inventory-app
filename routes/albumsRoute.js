const { Router } = require("express");
const { getAlbums } = require("../controllers/albumsController");

const albumsRouter = Router();



albumsRouter.get("/", getAlbums)

module.exports = { albumsRouter }

