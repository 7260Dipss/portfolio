var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
    host:"bsjppxkejuxujek0lhzt-mysql.services.clever-cloud.com",
    user:"u6haj7dxr8rxzxgy",
    password:"NYBFYstnAk6Z0mG7z65K",
    database:"bsjppxkejuxujek0lhzt"
})
var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
