


const get90sMusic = function (re, res) {
    res.render("index", { title: "90s", page: "cards", active: "90s", card: "card" }) // there might be some db information to be applied here
}


module.exports = {
    get90sMusic
}