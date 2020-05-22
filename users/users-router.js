const express = require("express");
const Users = require("./users-model");

const router = express.Router();

router.get("/", (req, res) => {
    Users.getUsers()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json( error);
    })
})

router.get("/:id", (req, res) => {
    const {id} = req.params;

    Users.findById(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ message: error });
    })
})

router.post("/", (req, res) => {
    const user = req.body;

    Users.addUser(user)
    .then(response => {
        console.log(response);
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Users.findById(id)
    .then(response => {
        // console.log(response[0]);
        return Users.delUser(id)
        .then(() => {
            return res.status(200).json([response[0]])
        })
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Users.editUser(id, changes)
    .then(response => {
        // console.log(response, id);
        Users.findById(id)
        .then(response => {
            res.status(200).json(response);
        })
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    })
})

module.exports = router;