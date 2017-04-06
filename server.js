const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const todos = require('./api/todos');

const app = express();

let nextId = todos.length + 1;

app.set('port', (process.env.PORT || 3000));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
    const todo = {
        id: nextId++,
        title: req.body.title,
        completed: false
    };

    todos.push(todo);
    res.send(todo);
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);
    
    if (!todo) return res.sendStatus(404);
    
    todo.title = req.body.title || todo.title;
    res.json(todo);
});

app.patch('/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);
    
    if (!todo) return res.sendStatus(404);
    
    todo.completed = !todo.completed;
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    console.log(req.params.id);
    const index = todos.findIndex(todo => todo.id == req.params.id);
    
    if (index == -1) return res.sendStatus(404);
    
    todos.splice(index, 1);
    res.sendStatus(204);
});

// Данный мершрут никогда не сработает, т.к. есть прокси-сервер
// webpack-dev-server, отдающий статику
app.get('*', (req, res) => {
    fs.readFile(`${__dirname}/public/index.html`), (err, html) => {
        if (err) throw err;
        
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
});


app.listen(app.get('port'), () => {
    console.log('server running at http://localhost:' + app.get('port'));
});