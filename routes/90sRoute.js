const { Router } = require("express");
const { get90sMusic } = require("../controllers/90sController");

const _90sRouter = Router();



_90sRouter.get("/", get90sMusic)

module.exports = { _90sRouter }

