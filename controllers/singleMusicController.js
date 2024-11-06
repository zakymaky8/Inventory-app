const { getAllSingles } = require("../db/query")

const getSingles = async function(req, res) {
    const allSingles = await getAllSingles()
    res.render("index", { title: "Singles", page: "cards", active: "singles", card: "card", items: allSingles })
}

module.exports = {
    getSingles,
}