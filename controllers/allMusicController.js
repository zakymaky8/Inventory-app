const { getEveryMusic } = require("../db/query")



const getAllMusic = async function (req, res) {
    const allMusic = await getEveryMusic();
    res.render("index", { title: "From All Music", page: "cards", active: 'from all', items: allMusic })
}

module.exports = {
    getAllMusic
}