const db = require('../data/db-config')

function getAllUsers() { return db('users') }

function findBy(filter) {
    return db("users").where(filter);
}

function findById(id) {
    return db("users").where("user_id", id).first();
}

async function insertUser(user) {
    const [newUserObject] = await db('users')
        .insert(user, [
            'user_id', 
            'username', 
            'password'])
    return newUserObject
}

module.exports ={
    getAllUsers,
    findBy,
    findById,
    insertUser
}