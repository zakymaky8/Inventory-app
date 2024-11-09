const { getAllSingles, getArtists, updateSingle } = require("../db/query")

const getSingles = async function(req, res) {
    const allSingles = await getAllSingles()
    res.render("index", { title: "Singles", page: "cards", active: "singles", card: "card", items: allSingles })
}

const postSingleFromForEdit = async function(req, res) {
    const { single_id } = req.params;
    const allSingles = await getAllSingles();
    const artists = await getArtists();
    const single = allSingles.filter(single => single.singles_id === Number(single_id));

    res.render("index", { title: "Edit Single",
        page: "single_form",
        active: "singles",
        mode: "edit",
        single: single,
        artists: artists
    });
}

const postUpdatedInfoForSingle = async function (req, res) {
    const { sgl_id }= req.params;
    await updateSingle(req.body, Number(sgl_id))
    res.redirect("/singles")
}

module.exports = {
    getSingles,
    postSingleFromForEdit,
    postUpdatedInfoForSingle
}