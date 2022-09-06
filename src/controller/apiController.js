import connection from '../configs/connDB'
let getAllUser = async (req, res) => {
    const [row] = await connection.query('SELECT * FROM `user`');
    return res.status(200).json({
        message: 'ok',
        data: row
    })
}
let createUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing',
        })
    }
    await connection.query('INSERT INTO user (firstName,lastName,email,address) VALUES (?,?,?,?)', [firstName, lastName, email, address]);
    return res.status(200).json({
        message: 'ok',
    })
}
let updateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;
    if (!id || !firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing',
        })
    }
    await connection.query('UPDATE user SET firstName=?,lastName=?,email=?,address=? WHERE id=?', [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'ok',
    })
}
let deleteUser = async (req, res) => {
    let id = req.params.id
    if (!id) {
        return res.status(200).json({
            message: 'missing',
        })
    }
    await connection.query('DELETE FROM user WHERE id=?', [id]);
    return res.status(200).json({
        message: 'ok',
    })
}
export { getAllUser, createUser, updateUser, deleteUser }