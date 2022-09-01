import express from "express"
import configViewEngine from "./configs/viewEngine"
const app = express()
const port = 5000
import path from "path"

/* app.get('/', (req, res) => {
    res.send('Hello World!')
}) */
configViewEngine(app);
app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})