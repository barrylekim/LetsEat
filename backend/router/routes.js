const express = require("express");
var router = express.Router();
const helper = require("./helpers");
var pg = require("pg");
var client = new pg.Client(process.env.CONNECTIONSTR);
client.connect();
const IDMap = {};

generateID = function () {
    let id = Math.floor((Math.random() * 1000000)).toString();
    while (IDMap[id]) {
        id = Math.floor((Math.random() * 1000000)).toString();
    }
    return id;
}
/*
* Add a user (A user signs up).
* Update the Users tables
*/
router.post("/addUser", (req, res) => {
    let uName = req.body.name;
    console.log( "########################" + req)
    console.log("$$$$$$$$$$$$$$$$$$$$$$$" +req.Body)
    let addUser = `INSERT INTO users(uID, uName) values($1, $2)`;
    let uID = generateID();
    client.query(addUser, [uID, uName], (err, result) => {
        if (err) {
            console.log("### addUser Error: " + err);
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: `User ${uName} added to Users ` });
        }
    });
});

/*
* Get all users.
* Return an array of all user objects. (Each object contains user ID and user name)
*/
router.get("/getAllUsers", (req, res) => {
    let getAllUsers = `SELECT * FROM users`;
    client.query(getAllUsers, (err, result) => {
        if (err) {
            console.log("### getAllUsers Error: " + err);
        } else {
            res.send(result.rows);
        }
    });
});

/*
* Get user by ID.
* Return one object which contains user ID and user name.
*/
router.get("/getUserByID/:uid", (req, res) => {
    let getUserByID = `SELECT * FROM users WHERE uID = $1`;
    client.query(getUserByID, [req.params.uid],(err, result) => {
        if (err) {
            console.log("### getUserByID Error: " + err);
        } else {
            let user = result.rows[0]
            res.send(user);
        }
    });
});


/*
* Get user by name.
* Return one object which contains user ID and user name.
*/
router.get("/getUserByName/:uname", (req, res) => {
    let getUserByName = `SELECT * FROM users WHERE uName = $1`;
    client.query(getUserByName, [req.params.uname],(err, result) => {
        if (err) {
            console.log("### getUserByName Error: " + err);
        } else {
            let user = result.rows[0]
            res.send(user);
        }
    });
});

module.exports = router;