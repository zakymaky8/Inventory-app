const express = require("express") ;
const path = require("path");
const app = express();
const { indexRouter } = require("./routes/indexRoute");
const { singleRouter } = require("./routes/singleRoute");
const { allMusicRouter } = require("./routes/allMusicRoute");
const { albumsRouter } = require("./routes/albumsRoute");
const { _90sRouter } = require("./routes/90sRoute");

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


app.use((err, req, res, next) => {
    res.send(err.message)
})


app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);

})