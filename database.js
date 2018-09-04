var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lucky888",
  database: "movielist"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(`DROP TABLE movielist`, function (err, result) {
    if (err) throw err;
    console.log("Table dropped");
  });

  var sql = `CREATE TABLE movielist (
    title VARCHAR(255) UNIQUE,
    watched BOOLEAN, 
    popularity VARCHAR(255), 
    PRIMARY KEY(title))`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = con;