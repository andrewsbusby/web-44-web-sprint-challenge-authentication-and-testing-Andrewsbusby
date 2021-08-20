const db = require('../../data/dbConfig');

function findById(id) {
    return db('users').select('username').where('id', id).first()
}

async function add ({ username, password }) {
    const [id] = await db('users').insert
    return findById(id)
}

module.exports = {
    add,
    findById,
}