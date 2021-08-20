const db = require('../../data/dbConfig');

function find() {
    return db('users').select('id', 'username')
}

function findById(id) {
    return db('users').select('username').where('id', id).first()
}

function findBy(filter) {
    return db('users').select('id', 'username', 'password').where(filter)
}

async function add (user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = {
    add,
    findById,
    findBy,
    find
}