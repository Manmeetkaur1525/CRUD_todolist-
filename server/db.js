const Client = require('pg').Pool;

const client = new Client({
    host: "localhost",
    user:"postgres",
    port:5432,
    password:"stay1525",
    database:"todoapp"
});

module.exports = client;