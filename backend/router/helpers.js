var pg = require("pg");
var client = new pg.Client(process.env.CONNECTIONSTR);
client.connect();

// Helper functions will be used for POST commands
module.exports = {
    
    createTables: function () {
        //Tables: 
        let users = `CREATE TABLE IF NOT EXISTS users(uID VARCHAR(10) NOT NULL PRIMARY KEY, uName VARCHAR(100) UNIQUE)`;
        let restrictions = `CREATE TABLE IF NOT EXISTS restrictions(reID VARCHAR(10) NOT NULL PRIMARY KEY, reType VARCHAR(500))`;
        let outings = `CREATE TABLE IF NOT EXISTS outings(oID VARCHAR(10) NOT NULL PRIMARY KEY, oName VARCHAR(100), numOfUsers INTEGER)`; //oDate VARCHAR(100), oTime VARCHAR(100)
        let cuisines = `CREATE TABLE IF NOT EXISTS cuisines(cID VARCHAR(10) NOT NULL PRIMARY KEY, cType VARCHAR(500))`;
        let restaurants = `CREATE TABLE IF NOT EXISTS restaurants(rID VARCHAR(10) NOT NULL PRIMARY KEY, rName VARCHAR(100), rAddress TEXT, rCity VARCHAR(500), lat FLOAT8, lon FLOAT8, rating NUMERIC(2,1), isOpen BOOLEAN, priceLevel NUMERIC(2,1), url TEXT, phone VARCHAR(100))`;

        //Relationships:
        let goesto = `CREATE TABLE IF NOT EXISTS goesto(uID VARCHAR(10), oID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(uID, oID, cID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (oID) REFERENCES outings ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES cuisines ON DELETE CASCADE ON UPDATE CASCADE)`;
        let has = `CREATE TABLE IF NOT EXISTS has(uID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(uID, reID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
        let accomodates = `CREATE TABLE IF NOT EXISTS accomodates(rID VARCHAR(10), reID VARCHAR(10), PRIMARY KEY(rID, reID), FOREIGN KEY (rID) REFERENCES restaurants ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (reID) REFERENCES restrictions ON DELETE CASCADE ON UPDATE CASCADE)`;
        let cooks = `CREATE TABLE IF NOT EXISTS cooks(rID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(rID, cID), FOREIGN KEY (rID) REFERENCES restaurants ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES cuisines ON DELETE CASCADE ON UPDATE CASCADE)`;
        
        let arr = [users, restrictions, outings, cuisines, restaurants, goesto, has, accomodates, cooks]

        arr.forEach((query) => {
            client.query(query)
        }) 
    },

    getUserByID: async function(uID) {
        try {
            let findUser = `SELECT * FROM users WHERE uID = $1`;
            let user = await client.query(findUser, [uID]);
            return user;
        } catch (err) {
            throw err;
        }
    },

    getUserByName: async function(uName) {
        try {
            let findUser = `SELECT * FROM users WHERE uName = $1`;
            let user = await client.query(findUser, [uName]);
            return user;
        } catch (err) {
            throw err;
        }
    },

    getOutingByID: async function(oID) {
        try {
            let findOuting = `SELECT * FROM outings WHERE oID = $1`;
            let outing = await client.query(findOuting, [oID]);
            return outing;
        } catch (err) {
            throw err;
        }
    },

    getOutingByName: async function(oName) {
        try {
            let findOuting = `SELECT * FROM outings WHERE oName = $1`;
            let outing = await client.query(findOuting, [oName]);
            return outing;
        } catch (err) {
            throw err;
        }
    },
}

//Expansion in the future
// let time = `CREATE TABLE IF NOT EXISTS time(weekday VARCHAR(10) NOT NULL PRIMARY KEY)`;
// let venue = `CREATE TABLE IF NOT EXISTS venue(vID VARCHAR(10) NOT NULL PRIMARY KEY, takeout BOOLEAN, parking BOOLEAN)`;
// let enjoys = `CREATE TABLE IF NOT EXISTS enjoys(uID VARCHAR(10), cID VARCHAR(10), PRIMARY KEY(uID, cID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (cID) REFERENCES category ON DELETE CASCADE ON UPDATE CASCADE)`;
// let likes = `CREATE TABLE IF NOT EXISTS likes(uID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(uID, rID), FOREIGN KEY (uID) REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
// let during = `CREATE TABLE IF NOT EXISTS during(rID VARCHAR(10), weekday VARCHAR(10), open VARCHAR(15), close VARCHAR(15),PRIMARY KEY(rID, weekday), FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (weekday) REFERENCES time ON DELETE CASCADE ON UPDATE CASCADE)`;
// let ison = `CREATE TABLE IF NOT EXISTS ison(vID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(vID, rID), FOREIGN KEY (vID) REFERENCES venue ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
// let prefers = `CREATE TABLE IF NOT EXISTS prefers(oID VARCHAR(10), rID VARCHAR(10), PRIMARY KEY(oID, rID), FOREIGN KEY (oID) REFERENCES outing ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (rID) REFERENCES restaurant ON DELETE CASCADE ON UPDATE CASCADE)`;
