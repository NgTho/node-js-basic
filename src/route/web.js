import express from "express";
import {
    getHomepage,
    getDetail,
    createUser,
    deleteUser,
    getUser,
    updateUser
}
    from "../controller/homeController"
import about from "../controller/about"
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', getHomepage)
    router.get('/about', about)
    router.get('/detail/:userId', getDetail)
    router.post('/create', createUser)
    router.post('/delete', deleteUser)
    router.get('/edit/:id', getUser)
    router.post('/update', updateUser)
    return app.use('/', router);
    // return app.use('/abc', router); => default url: localhost:3000/abc
}
export default initWebRoute;