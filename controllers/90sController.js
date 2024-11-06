const { get90s_from_db } = require("../db/query")



const get90sMusic = async function (re, res) {
    const _90sMusic = await get90s_from_db();
    res.render("index", { title: "90s", page: "cards", active: "90s", items: _90sMusic})
}


module.exports = {
    get90sMusic
}