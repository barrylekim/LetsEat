var pg = require("pg");
var client = new pg.Client(process.env.CONNECTIONSTR);
client.connect();
let IDMap = {};

generateID = function () {
    let id = Math.floor((Math.random() * 1000000)).toString();
    while (IDMap[id]) {
        id = Math.floor((Math.random() * 1000000)).toString();
    }
    return id;
}

module.exports = {
    isTableEmpty: async function(tableName) {
        try {
            let emptycheck = ''
            if (tableName == 'users'){
                emptycheck = 'SELECT COUNT(*) FROM users'
            }
            if (tableName == 'outings'){
                emptycheck = 'SELECT COUNT(*) FROM outings'
            }
            if (tableName == 'cuisines'){
                emptycheck = 'SELECT COUNT(*) FROM cuisines'
            }
            if (tableName == 'restrictions'){
                emptycheck = 'SELECT COUNT(*) FROM restrictions'
            }
            if (tableName == 'restaurants'){
                emptycheck = 'SELECT COUNT(*) FROM restaurants'
            }
            let result = await client.query(emptycheck)
            result = parseInt(result.rows[0].count, 10)
            if (result == 0){
                return true
            }
            return false
        } catch (err) {
            throw err;
        }
    },

    addDummyUsers: async function () {
        try {
            if (await this.isTableEmpty('users')){
                let uNames = ['Barry', 'Calvin', 'Shirley', 'Elaine', 'Bob', 'Alvin', 'Ansel', 'Rebecca', 'Hermes']
                for (uName in uNames){
                    let uID = generateID();
                    let addUser = `INSERT INTO users(uID, uName) values($1, $2)`;
                    await client.query(addUser, [uID, uNames[uName]]);
                }
            }
            return;
        } catch (err) {
            throw err;
        }
    },

    addDummyOutings: async function () {
        try {
            if (await this.isTableEmpty('outings')){
                let oNames = ['Christmas', 'Thanksgiving dinner', 'Hangout']
                for (oName in oNames){
                    let oID = generateID();
                    let addOuting = `INSERT INTO outings(oID, oName, numOfUsers) values($1, $2, $3)`;
                    await client.query(addOuting, [oID, oNames[oName], oName]);
                }
            }
            return;
        } catch (err) {
            throw err;
        }
    },

    addDummyCuisines: async function () {
        try {
            if (await this.isTableEmpty('cuisines')){
                let cTypes = ['Chines', 'Japanese', 'Italian', 'Spanish', 'Korean']
                for (x in cTypes){
                    let cID = generateID();
                    let addCuisine = `INSERT INTO cuisines(cID, cType) values($1, $2)`;
                    await client.query(addCuisine, [cID, cTypes[x]]);
                }
            }
            return;
        } catch (err) {
            throw err;
        }
    },

    addDummyRestrictions: async function () {
        try {
            if (await this.isTableEmpty('restrictions')){
                let reTypes = ['Crustaceans', 'Vegan', 'Vegetarian', 'Shellfish', 'Red meat']
                for (x in reTypes){
                    let reID = generateID();
                    let addRestrictions = `INSERT INTO restrictions(reID, reType) values($1, $2)`;
                    await client.query(addRestrictions, [reID, reTypes[x]]);
                }
            }
            return;
        } catch (err) {
            throw err;
        }
    },

    addDummyRestaurants: async function () {
        try {
            if (await this.isTableEmpty('restaurants')){
                let rNames = ['Marutama', 'Burgoo', 'Earls', 'The Keg', 'Perugia', 'Exchange Cafe', 'Tim Hortons']
                for (x in rNames){
                    let rID = generateID();
                    let addCuisine = `INSERT INTO restaurants(rID, rName) values($1, $2)`;
                    await client.query(addCuisine, [rID, rNames[x]]);
                }
            }
            return;
        } catch (err) {
            throw err;
        }
    },
}