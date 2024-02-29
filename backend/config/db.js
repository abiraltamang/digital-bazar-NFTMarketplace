import mysql from 'mysql';
import config from './config.js';

const con = mysql.createConnection(config.database);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

export default con;
