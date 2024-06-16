const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id));`;
connection.query(createTable);

app.get('/', (req, res) => {
    const insertName = `INSERT INTO people(name) VALUES('Full Cycle Rocks!');`;
    connection.query(insertName, (err, results) => {
        if (err) throw err;
        connection.query('SELECT * FROM people', (err, results) => {
            if (err) throw err;
            let response = '<h1>Full Cycle Rocks!</h1>';
            response += '<ul>';
            results.forEach(person => {
                response += `<li>${person.name}</li>`;
            });
            response += '</ul>';
            res.send(response);
        });
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});