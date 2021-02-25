//Packages
require("dotenv").config()
const express = require("express")
const app = express()
const ejs = require("ejs")
const path = require("path")
const expressLayout = require("express-ejs-layouts")
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("express-flash")
const MongoDbStore = require("connect-mongo")(session)
const passport = require("passport")
//Database Connection
const url = "mongodb://localhost/zeeniesbakeshop"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true});
const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", function() {
  console.log("Connected")
});
//Session Config
app.use(session({
    secret : process.env.C_S,
    resave : true,
    saveUninitialized : true,
    store : new MongoDbStore({
        mongooseConnection : conn,
        collection : "sessions"
    }),
    cookie : { maxAge : 1000 * 60 * 60 * 24}
}))
// Passport Config
const passportInit = require("./app/http/config/passport")
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
//Flash Use
app.use(flash())
//JSON
app.use(express.json())
//URL Encoded
app.use(express.urlencoded({ extended : false}))
//Global Middleware
app.use((req, res, next) =>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
//Layouts
app.use(expressLayout)
app.set("views", path.join(__dirname, "resources/views"))
app.set("view engine", "ejs")
//Routes
require("./routes/web")(app)
//Assets
app.use(express.static("public"))
app.listen(PORT, () => {
    console.log(`listening ${PORT}`)
})