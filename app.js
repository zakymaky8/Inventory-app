const express = require("express") ;
const path = require("path");
const app = express();
const { indexRouter } = require("./routes/indexRoute");
const { singleRouter } = require("./routes/singleRoute");
const { allMusicRouter } = require("./routes/allMusicRoute");
const { albumsRouter } = require("./routes/albumsRoute");
const { _90sRouter } = require("./routes/90sRoute");
const { fromAlbumMusicRouter } = require("./routes/fromAlbumMusicRoute");
const { getAllAlbums, getAllSingles, getMusicFromAlbum_fromdb, getEveryMusic, get90s_from_db, deleteAlbumRecord, deleteSingleRecord, deleteMusicFromAlbumRecord } = require("./db/query");

require("dotenv").config();



app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"))

app.use("/", indexRouter);
app.use("/singles", singleRouter);
app.use("/all_music", allMusicRouter);
app.use("/albums", albumsRouter);
app.use("/90s", _90sRouter)
app.use("/music_from_albums", fromAlbumMusicRouter)


//  to be distributed on theirs controllers and these are details and within detail operations.
app.get("/albums/:album_id", async (req, res) => {
    const { album_id }  = req.params;
    const allAlbums = await getAllAlbums();
    const single_album = allAlbums.filter(album => Number(album.albums_id) === Number(album_id));
    res.render("index", { title: `Detail for ${single_album[0].album_title}`, page: "album_detail", active: 'albums', details: single_album})
})

app.get("/singles/:single_id", async (req, res) => {
    const { single_id }  = req.params;
    const allSingles = await getAllSingles();
    const single_music = allSingles.filter(single => Number(single.singles_id) === Number(single_id));
    res.render("index", { title: `Detail for ${single_music[0].music_title}`, page: "single_detail", active: 'singles', details: single_music})
})
app.get("/music_from_albums/:mfa_id", async (req, res) => {
    const { mfa_id }  = req.params;
    const all_mfa = await getMusicFromAlbum_fromdb();
    const single_mfa = all_mfa.filter(mfa => Number(mfa.mfa_id) === Number(mfa_id));
    res.render("index", { title: `Detail for ${single_mfa[0].music_title}`, page: "music_from_album_detail", active: 'from album', details: single_mfa})
})

app.get("/all_music/:type/:am_id", async (req, res) => {
    const { am_id, type }  = req.params;

    const all_music = await getEveryMusic();
    const mfas_filtered = all_music.filter(music => music.mfa_id !==undefined).filter(music => music.mfa_id === Number(am_id));
    const sglFiltered = all_music.filter(music => music.singles_id !== undefined).filter(music => music.singles_id === Number(am_id))

    res.render("index", { title: `Detail for ${type==='single' ? sglFiltered[0].music_title : mfas_filtered[0].music_title}`, active: 'from_all', page: type==='single' ? 'single_detail' : 'music_from_album_detail', details: type==='single' ? sglFiltered : mfas_filtered })
})

app.get("/90s/:type/:nty_id", async (req, res) => {
    const { nty_id, type }  = req.params;

    const _90s_music = await get90s_from_db();
    console.log("start 90",_90s_music, "end 90")
    const mfas_filtered = _90s_music.filter(music => music.mfa_id !==undefined).filter(music => music.mfa_id === Number(nty_id));
    const sglFiltered = _90s_music.filter(music => music.singles_id !== undefined).filter(music => music.singles_id === Number(nty_id))

    res.render("index", { title: `Detail for`, active: '90s', page: type==='single' ? 'single_detail' : 'music_from_album_detail', details: type==='single' ? sglFiltered : mfas_filtered })
})

app.post('/delete_album/:album_id', async (req, res) => {
    const { album_id } = req.params;
    await deleteAlbumRecord(Number(album_id));
    res.redirect('/albums');
})

app.post('/delete_single/:single_id', async (req, res) => {
    const { single_id } = req.params;
    await deleteSingleRecord(Number(single_id));
    res.redirect('/singles');
})

app.post('/delete_music_from_album/:mfa_id', async (req, res) => {
    const { mfa_id } = req.params;
    await deleteMusicFromAlbumRecord(Number(mfa_id));
    res.redirect('/music_from_albums/select_album');
})

app.use((err, req, res, next) => {
    res.send(err.message)
})


app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);

})