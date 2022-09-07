import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoute from "./route/web"
import initApiRoute from "./route/api"

require('dotenv').config();
var morgan = require("morgan");
var fs = require('fs');
var path = require('path');


const app = express()
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(req.header);
    next(); //chạy tiếp sau khi middleware
})

/* middleware logging */

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
//app.use(morgan("combined"));
//app.use(morgan('combined', { stream: accessLogStream }));

/* cấu hình gửi data lên server */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* cấu hình ViewEngine */
configViewEngine(app);

/* cấu hình router */
initWebRoute(app);
initApiRoute(app);

/* middleware trang 404 */
app.use((req, res) => {
    return res.render("404.ejs")
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
