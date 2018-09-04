const express = require('express');
const bodyParser = require('body-parser')
const db = require('./database.js')

const app = express(); 
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', express.static(__dirname + '/client/dist'));

app.post('/movies', (req, res) => {
  let allmovies = req.body.mydata;
  for (let i = 0; i < allmovies.length; i++){
    let sql = `REPLACE INTO movielist (title, watched, popularity) VALUES 
    ('${allmovies[i].title}', ${allmovies[i].watched}, '${allmovies[i].popularity}')`
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("added item to db");
    })
  }
  res.status(201).end("Request to add to database received by server")
})

app.listen(3000, () => console.log('Listening on port 3000'))