// const asyncHandler = require("express-async-handler");
const { getArtists, addArtist, addAlbum, addSingle, get_albums_fromdb, addMusicFromAlbum } = require("../db/query");

const getHomePage = function (req, res)  {
    res.render("index", { title: "Home", page: "home", active: "home" });
}

const getArtistForm = function (req, res)  {
    const { countries } =  require("countries-list");
    let countriesList = Object.values(countries).map(country => country.name).sort();

    res.render("index", {
                          title: "Add Artist",
                          page: "artist_form",
                          active: "add artist",
                          countries: countriesList
                        });
}

const getMusicTypeForm = function (req, res) {
    res.render("index", { title: "Select Music Type", page: "music_form", active: "add music" });
}



const postMusicTypeSelection = async function (req, res) {
    const  selectedType = req.body.music_type;
    const artists = await getArtists();
    const albums  = await get_albums_fromdb()
    console.log(artists)
    res.render("index", { title: "Add Music",
                          page: selectedType === "album" ? 'album_form' : selectedType === "single" ?  'single_form' : selectedType === 'in_album_music' ? 'music_in_album' : 'music_form',
                          active: "add music",
                          artists: artists,
                          albums: albums
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


module.exports = {
            getHomePage,
            getArtistForm,
            getMusicTypeForm,
            postMusicTypeSelection,
            postArtistData,
            postAlbumData,
            postSingleMusicData,
            postMusicFromAlbumData
        }