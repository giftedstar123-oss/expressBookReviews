const axios = require('axios');
const express = require('express');
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
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get('http://localhost:5000/');
    const bookData = response.data;
    if (!bookData[isbn]) {
      return res.status(404).json({
        message: "Book not found"
      });
    }
    res.json(bookData[isbn]);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book"
    });
  }
});
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const response = await axios.get('http://localhost:5000/');
    const bookData = response.data;
    const result = {};
    Object.keys(bookData).forEach((isbn) => {
      if (bookData[isbn].author === author) {
        result[isbn] = bookData[isbn];
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});
// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const response = await axios.get('http://localhost:5000/');
    const bookData = response.data;
    const result = {};
    Object.keys(bookData).forEach((isbn) => {
      if (bookData[isbn].title === title) {
        result[isbn] = bookData[isbn];
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});
// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.json(books[isbn].reviews);
});
module.exports.general = public_users;
