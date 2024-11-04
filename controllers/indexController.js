const asyncHandler = require("express-async-handler");

const getHomePage = function (req, res)  {
    res.render("index", { title: "Home", page: "home", active: "home" });
}

const getArtistForm = function (req, res)  {
    const { countries } =  require("countries-list");
    let countriesList = Object.values(countries).map(country => country.name).sort();

    res.render("index", { title: "Add Artist", page: "artist_form", active: "add artist", countries: countriesList });
}


const getMusicTypeForm = function (req, res) {
    res.render("index", { title: "Select Music Type", page: "music_form", active: "add music" });
}

const postMusicTypeSelection = function (req, res) {
    const  selectedType = req.body.music_type;
    res.render("index", { title: "Add Music",
                          page: selectedType === "album" ? 'album_form' : selectedType === "single" ?  'single_form' : 'music_form',
                          active: "add music"
               });
}

module.exports = { getHomePage, getArtistForm, getMusicTypeForm, postMusicTypeSelection }