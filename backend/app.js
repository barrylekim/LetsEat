const express = require("express");
var router = express.Router();
// var request = require('request');
var pg = require("pg");
var client = new pg.Client(process.env.CONNECTIONSTR);
client.connect();




var helper = require('./router/helpers')
helper.createTables()



// //Tables: 
// let users = `CREATE TABLE IF NOT EXISTS users(uID VARCHAR(10) NOT NULL PRIMARY KEY, uName VARCHAR(100) UNIQUE)`;
// let restrictions = `CREATE TABLE IF NOT EXISTS restrictions(reID VARCHAR(10) NOT NULL PRIMARY KEY, reType VARCHAR(500))`;
// let outing = `CREATE TABLE IF NOT EXISTS outing(oID VARCHAR(10) NOT NULL PRIMARY KEY, oName VARCHAR(100), numOfUsers INTEGER)`; //oDate VARCHAR(100), oTime VARCHAR(100)
// let cuisine = `CREATE TABLE IF NOT EXISTS cuisine(cID VARCHAR(10) NOT NULL PRIMARY KEY, cType VARCHAR(500))`;
// let restaurant = `CREATE TABLE IF NOT EXISTS restaurant(rID VARCHAR(10) NOT NULL PRIMARY KEY, rName VARCHAR(100), rAddress TEXT, rCity VARCHAR(500), lat FLOAT8, lon FLOAT8, rating NUMERIC(2,1), isOpen BOOLEAN, priceLevel NUMERIC(2,1), url TEXT, phone VARCHAR(100))`;

// //Relationships:
// let goesto = `CREATE TABLE IF NOT EXISTS goesto(uID VARCHAR(10), oID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(uID, oID, cID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (oID) REFERENCES outing ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES cuisine ON DELETE CASCADE ON UPDATE CASCADE)`;
// let has = `CREATE TABLE IF NOT EXISTS has(uID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(uID, reID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
// let accomodates = `CREATE TABLE IF NOT EXISTS accomodates(rID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(rID, reID), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
// let cooks = `CREATE TABLE IF NOT EXISTS cooks(rID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(rID, cID), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES cuisine ON DELETE CASCADE ON UPDATE CASCADE)`;


// client.query(users);
// client.query(restrictions);
// client.query(outing);
// client.query(cuisine);
// client.query(restaurant);
// client.query(has);
// client.query(goesto);
// client.query(accomodates);
// client.query(cooks);



// // router.post("/addUser", (req, res) => {
// //     let name = req.body.name;
// //     let addToUserTable = `INSERT INTO users(uID, uname) values ($1, $2)`;
// //     let newuserID = generateID();
// //     client.query(addToUserTable, [newuserID, name], (err1, result1) => {
// //         if (err1) {
// //             res.status(500).json({err: err1});
// //         } else {
// //             res.status(200).json({user: name, id: newuserID});
// //         }
// //     })
// // })

// let restriction1 = `INSERT INTO restrictions(reID, reType) values ($1, $2)`;
// let var1= 'ID1234'
// let var2= 'Crustaceans'
// client.query(restriction1,[var1, var2])



//Expansion in the future
// let time = `CREATE TABLE IF NOT EXISTS time(weekday VARCHAR(10) NOT NULL PRIMARY KEY)`;
// let venue = `CREATE TABLE IF NOT EXISTS venue(vID VARCHAR(10) NOT NULL PRIMARY KEY, takeout BOOLEAN, parking BOOLEAN)`;
// let enjoys = `CREATE TABLE IF NOT EXISTS enjoys(uID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(uID, cID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES category ON DELETE CASCADE ON UPDATE CASCADE)`;
// let likes = `CREATE TABLE IF NOT EXISTS likes(uID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(uID, rID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
// let during = `CREATE TABLE IF NOT EXISTS during(rID VARCHAR(10), weekday VARCHAR(10), open VARCHAR(15), close VARCHAR(15),PRIMARY KEY(rID, weekday), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (weekday) REFERENCES time ON DELETE CASCADE ON UPDATE CASCADE)`;
// let ison = `CREATE TABLE IF NOT EXISTS ison(vID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(vID, rID), FOREIGN KEY (vID) REFERENCES venue ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
// let prefers = `CREATE TABLE IF NOT EXISTS prefers(oID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(oID, rID), FOREIGN KEY (oID) REFERENCES outing ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;

// client.query(time);
// client.query(venue);
// client.query(enjoys);
// client.query(likes);
// client.query(during);
// client.query(ison);
// client.query(prefers);

// let setWeekday1 = `INSERT INTO time(weekday) values ('Monday') `;
// let setWeekday2 = `INSERT INTO time(weekday) values ('Tuesday') `;
// let setWeekday3 = `INSERT INTO time(weekday) values ('Wednesday') `;
// let setWeekday4 = `INSERT INTO time(weekday) values ('Thursday') `;
// let setWeekday5 = `INSERT INTO time(weekday) values ('Friday') `;
// let setWeekday6 = `INSERT INTO time(weekday) values ('Saturday') `;
// let setWeekday7 = `INSERT INTO time(weekday) values ('Sunday') `;


// client.query(setWeekday1);
// client.query(setWeekday2);
// client.query(setWeekday3);
// client.query(setWeekday4);
// client.query(setWeekday5);
// client.query(setWeekday6);
// client.query(setWeekday7);