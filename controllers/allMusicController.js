const getAllMusic = function (req, res) {
    res.render("index", { title: "From All Music", page: "cards", active: 'from all', card: "card" })
}

module.exports = {
    getAllMusic
}