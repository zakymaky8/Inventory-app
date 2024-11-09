const { Router } = require("express");
const { getSingles, postSingleFromForEdit, postUpdatedInfoForSingle } = require("../controllers/singleMusicController");

const singleRouter = Router();



singleRouter.get("/", getSingles)

singleRouter.post("/edit/:single_id",postSingleFromForEdit)

singleRouter.post("/edit/single/:sgl_id", postUpdatedInfoForSingle)

module.exports = { singleRouter }



