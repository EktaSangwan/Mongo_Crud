const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');
var http = require('http').Server(app);
const db = require('./db');
const collection = "todo";

var publicPath = path.resolve(__dirname, 'www');

app.use(express.static(publicPath));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: publicPath });
});


app.get('/getTodos', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err)
            console.log(err);
        else {
            console.log(documents);
            res.json(documents);
        }
    })
});

app.put('/:id', (req, res) => {

    const todoID = req.params.id;
    const userInput = req.body;
    db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(todoID) }, { $set: { todo: userInput.todo } }, { returnOriginal: false }, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);

    });
});

app.post('/postTodos', (req, res) => {
    const userInput = req.body;
    let id = req.body["_id"] ? req.body["_id"] : new Date().getTime();
    let query = {
        _id: id
    };
    console.log(req);
    console.log(userInput);
    db.getDB().collection(collection).updateOne(query,
        { $set: {
            "todo":userInput.todo
        } }, 
        { upsert: true },
         function (err, doc) {
            console.log(err);
        });
});


app.delete('/:id', (req, res) => {
    const todoID = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});



db.connect((err) => {
    if (err) {
        console.log('unable to connect to database' + err + '.');
        process.exit(1);
    }
    else {
        app.listen(3000, () => {
            console.log('connected to database,listening to port 3000');
        });
    }

})