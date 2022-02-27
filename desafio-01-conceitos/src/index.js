const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const isUser = users.some(user => user.username === request.headers.username)

  if (isUser) return next()

  response.status(404).json({ error: "User not found" })
}


function createUser(payload) {
  return {
    id: uuidv4(),
    name: payload.name,
    username: payload.username,
    todos: []
  }
}

function findUser(key = "id", value) {
  return users.find(user => user[key] === value)
}

app.post('/users', (request, response) => {
  const newUser = createUser(request.body)
  users.push(newUser)

  response.status(201).json(newUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const user = findUser("username", request.headers.username)

  response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;