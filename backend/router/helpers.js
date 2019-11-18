var pg = require("pg");
var client = new pg.Client("postgres://sideproject:nwhacks2019@localhost:5432/LetsEat");
client.connect();

module.exports = {
    createTables: function () {
        //Tables: 
        let users = `CREATE TABLE IF NOT EXISTS users(uID VARCHAR(10) NOT NULL PRIMARY KEY, uName VARCHAR(100) UNIQUE)`;
        let restrictions = `CREATE TABLE IF NOT EXISTS restrictions(reID VARCHAR(10) NOT NULL PRIMARY KEY, reType VARCHAR(500))`;
        let outing = `CREATE TABLE IF NOT EXISTS outing(oID VARCHAR(10) NOT NULL PRIMARY KEY, oName VARCHAR(100), numOfUsers INTEGER)`; //oDate VARCHAR(100), oTime VARCHAR(100)
        let cuisine = `CREATE TABLE IF NOT EXISTS cuisine(cID VARCHAR(10) NOT NULL PRIMARY KEY, cType VARCHAR(500))`;
        let restaurant = `CREATE TABLE IF NOT EXISTS restaurant(rID VARCHAR(10) NOT NULL PRIMARY KEY, rName VARCHAR(100), rAddress TEXT, rCity VARCHAR(500), lat FLOAT8, lon FLOAT8, rating NUMERIC(2,1), isOpen BOOLEAN, priceLevel NUMERIC(2,1), url TEXT, phone VARCHAR(100))`;

        //Relationships:
        let goesto = `CREATE TABLE IF NOT EXISTS goesto(uID VARCHAR(10), oID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(uID, oID, cID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (oID) REFERENCES outing ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES cuisine ON DELETE CASCADE ON UPDATE CASCADE)`;
        let has = `CREATE TABLE IF NOT EXISTS has(uID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(uID, reID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
        let accomodates = `CREATE TABLE IF NOT EXISTS accomodates(rID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(rID, reID), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
        let cooks = `CREATE TABLE IF NOT EXISTS cooks(rID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(rID, cID), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES cuisine ON DELETE CASCADE ON UPDATE CASCADE)`;
        
        let arr = [users, restrictions, outing, cuisine, restaurant, goesto, has, accomodates, cooks]

        arr.forEach((query) => {
            client.query(query)
        }) 
    }
}