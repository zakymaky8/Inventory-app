const express = require("express") ;
const path = require("path");
const app = express();
const { indexRouter } = require("./routes/indexRoute")
require("dotenv").config();



app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"))

app.use("/", indexRouter);


app.use((err, req, res, next) => {
    //  some err handling code
})


app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);

})