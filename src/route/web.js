import express from "express";
import getHomepage from "../controller/homeController"
import about from "../controller/about"
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', getHomepage)
    router.get('/about', about)
    return app.use('/', router);
    // return app.use('/abc', router); => default url: localhost:3000/abc
}
export default initWebRoute;