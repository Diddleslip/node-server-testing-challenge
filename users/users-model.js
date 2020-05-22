const db = require("../database/db-config");

module.exports = {
    getUsers,
    findById,
    addUser,
    delUser,
    editUser,
}

function getUsers() {
    return db("users")
}

function findById(id) {
    return db("users")
    .where({ id })
}

function addUser(user) {
    return db("users")
    .insert(user, "id")
    .then(id => {
        return findById(id[0])
    })
}

function delUser(id) {
    return db("users")
    .del()
    .where({ id })
}

function editUser(id, changes) {
    return db("users")
    .where({ id })
    .update(changes, "id")
}