const axios = require('axios');
const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  users.push({
    username: username,
    password: password
  });

  res.status(201).json({
    message: "User successfully registered"
  });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving book" });
    });
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving books" });
    });
});
  res.json(result);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;

  axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving books" });
    });
});

  res.json(result);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.json(books[isbn].reviews);
});

module.exports.general = public_users;
