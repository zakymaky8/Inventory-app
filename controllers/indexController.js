const { getArtists, addArtist, addAlbum, addSingle, get_albums_fromdb, addMusicFromAlbum, fetchTopRatedItemsFrom_db, fetchSearchResult } = require("../db/query");
const { countries } =  require("countries-list");
let countriesList = Object.values(countries).map(country => country.name).sort();

const {body, validationResult} = require("express-validator");

const validateArtisForm = [
    body("album_count")
        .notEmpty().withMessage("Album Count shouldn't be empty")
        .isNumeric().withMessage("Album count should be a number")
        .isLength({min: 0, max: 30}).withMessage("album count shouldn't exceed 30 and less than 0"),
    body("artist_name")
        .trim()
        .notEmpty().withMessage("Artist Name shouldn't be empty"),
    body("artist_country")
        .notEmpty().withMessage("Artist Name shouldn't be empty"),
]


const getHomePage = function (req, res)  {
    res.render("index", { title: "Home", page: "home", active: "home" });
}

const getArtistForm = function (req, res)  {
    res.render("index", {
                          title: "Add Artist",
                          page: "artist_form",
                          active: "add artist",
                          countries: countriesList,
                          mode: "create"
                        });
}

const getMusicTypeForm = function (req, res) {
    res.render("index", { title: "Select Music Type", page: "music_form", active: "add music", mode: "create" });
}



const postMusicTypeSelection = async function (req, res) {
    const  selectedType = req.body.music_type;
    const artists = await getArtists();
    const albums  = await get_albums_fromdb()
    res.render("index", { title: "Add Music",
                          page: selectedType === "album" ? 'album_form' : selectedType === "single" ?  'single_form' : selectedType === 'in_album_music' ? 'music_in_album' : 'music_form',
                          active: "add music",
                          artists: artists,
                          albums: albums,
                          mode: "create"
               });
}

const postArtistData = async function(req, res) {
    const { artist_name, artist_country, album_count } = req.body;
    await addArtist(artist_name, artist_country, album_count);
    res.redirect("/albums");
}

const postAlbumData = async function (req, res) {
    await addAlbum(req.body);
    res.redirect("/albums");
}


const postSingleMusicData = async function(req, res) {
    await addSingle(req.body);
    res.redirect("/singles");
}

const postMusicFromAlbumData = async function(req, res) {
    await addMusicFromAlbum(req.body);
    res.redirect("/")
}


const getTopRatedItems = async function(req,res) {
    const topRatedAlbums = await fetchTopRatedItemsFrom_db();
    res.render("index", { title: "Top Rated Albums", page: "cards", active: "top rated", items: topRatedAlbums })
}

const postSearch = async (req, res) => {
    const { search, type } = req.body;
    const dataFrom_db = await fetchSearchResult(search, type);
    console.log(req.body)
    res.render("index", { title: "Search Results", page: "cards", active: `${type}`, items: dataFrom_db })
}

module.exports = {
            getHomePage,
            getArtistForm,
            getMusicTypeForm,
            postMusicTypeSelection,
            postArtistData,
            postAlbumData,
            postSingleMusicData,
            postMusicFromAlbumData,
            getTopRatedItems,
            postSearch
        }