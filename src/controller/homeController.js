import connection from '../configs/connDB'
let getHomepage = async (req, res) => {
    const [row] = await connection.query('SELECT * FROM `user`');
    return res.render('index.ejs', { dataUser: row })
}
let getDetail = async (req, res) => {
    //console.log(req.params);
    let id = req.params.userId
    let [user] = await connection.query(`SELECT * FROM user where id=?`, [id])
    return res.render("detail.ejs", { detailUser: user[0] })
}

let createUser = async (req, res) => {
    //console.log(req.body);
    let { firstName, lastName, email, address } = req.body;
    await connection.query('INSERT INTO user (firstName,lastName,email,address) VALUES (?,?,?,?)', [firstName, lastName, email, address]);
    return res.redirect('/');
}
let deleteUser = async (req, res) => {
    let { id } = req.body
    await connection.query('DELETE FROM user WHERE id=?', [id]);
    return res.redirect('/');
}
let getUser = async (req, res) => {
    let id = req.params.id
    let [user] = await connection.query('SELECT * FROM user WHERE id=?', [id]);
    return res.render('update.ejs', { dataUser: user[0] });
}
let updateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;
    await connection.query('UPDATE user SET firstName=?,lastName=?,email=?,address=? WHERE id=?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
}
export { getHomepage, getDetail, createUser, deleteUser, getUser, updateUser };