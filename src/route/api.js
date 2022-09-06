import express from "express";
import {
    getAllUser,
    createUser,
    updateUser,
    deleteUser
} from "../controller/apiController"
import about from "../controller/about"
let router = express.Router();

const initApiRoute = (app) => {
    router.get('/users', getAllUser)
    router.post('/create-user', createUser)
    router.put('/update-user', updateUser)
    router.delete('/delete-user/:id', deleteUser)
    return app.use('/api/v1/', router);
    // return app.use('/abc', router); => default url: localhost:3000/abc
}
export default initApiRoute;