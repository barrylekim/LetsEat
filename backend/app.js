const express = require("express");
// var router = express.Router();
// var request = require('request');
var pg = require("pg");
var client = new pg.Client("postgres://sideproject:nwhacks2019@localhost:5432/LetsEat");
client.connect();


let users = `CREATE TABLE IF NOT EXISTS users(uID VARCHAR(10) NOT NULL PRIMARY KEY, uname VARCHAR(100) UNIQUE)`;
let restrictions = `CREATE TABLE IF NOT EXISTS restrictions(reID VARCHAR(10) NOT NULL PRIMARY KEY, reType VARCHAR(500))`;
let outing = `CREATE TABLE IF NOT EXISTS outing(oID VARCHAR(10) NOT NULL PRIMARY KEY, oDate VARCHAR(100), oTime VARCHAR(100), oName VARCHAR(100), numOfUsers INTEGER)`;
let category = `CREATE TABLE IF NOT EXISTS category(cID VARCHAR(10) NOT NULL PRIMARY KEY, cType VARCHAR(500))`;
let restaurant = `CREATE TABLE IF NOT EXISTS restaurant(rID VARCHAR(10) NOT NULL PRIMARY KEY, rName VARCHAR(100), rAddress TEXT, rCity VARCHAR(500), lat FLOAT8, lon FLOAT8, rating NUMERIC(2,1), isOpen BOOLEAN, priceLevel NUMERIC(2,1), url TEXT, phone VARCHAR(100))`;
let time = `CREATE TABLE IF NOT EXISTS time(weekday VARCHAR(10) NOT NULL PRIMARY KEY)`;
let venue = `CREATE TABLE IF NOT EXISTS venue(vID VARCHAR(10) NOT NULL PRIMARY KEY, takeout BOOLEAN, parking BOOLEAN)`;
let has = `CREATE TABLE IF NOT EXISTS has(uID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(uID, reID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
let goesto = `CREATE TABLE IF NOT EXISTS goesto(uID VARCHAR(10), oID VARCHAR(10), PRIMARY KEY(uID, oID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (oID) REFERENCES outing ON DELETE CASCADE ON UPDATE CASCADE)`;
let enjoys = `CREATE TABLE IF NOT EXISTS enjoys(uID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(uID, cID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES category ON DELETE CASCADE ON UPDATE CASCADE)`;
let accomodates = `CREATE TABLE IF NOT EXISTS accomodates(reID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(reID, rID), FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
let likes = `CREATE TABLE IF NOT EXISTS likes(uID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(uID, rID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
let cooks = `CREATE TABLE IF NOT EXISTS cooks(cID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(cID, rID), FOREIGN KEY (cID) REFERENCES category ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
let during = `CREATE TABLE IF NOT EXISTS during(rID VARCHAR(10), weekday VARCHAR(10), open VARCHAR(15), close VARCHAR(15),PRIMARY KEY(rID, weekday), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (weekday) REFERENCES time ON DELETE CASCADE ON UPDATE CASCADE)`;
let ison = `CREATE TABLE IF NOT EXISTS ison(vID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(vID, rID), FOREIGN KEY (vID) REFERENCES venue ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
let prefers = `CREATE TABLE IF NOT EXISTS prefers(oID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(oID, rID), FOREIGN KEY (oID) REFERENCES outing ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;






client.query(users);
client.query(restrictions);
client.query(outing);
client.query(category);
client.query(restaurant);
client.query(time);
client.query(venue);
client.query(has);
client.query(goesto); 
client.query(enjoys);
client.query(accomodates);
client.query(likes);
client.query(cooks);
client.query(during);
client.query(ison);
client.query(prefers);
