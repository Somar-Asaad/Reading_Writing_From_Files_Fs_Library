 const fs = require("fs"); //shortcut for file system to write and read from files
const path = require("path"); //package it will help us get a path that works on all devices

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/current-time", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.get("/", function (req, res) {
  res.send(
    "<form action='/stored-data' method='POST'><label>Your Name</label><input type='text' name='username'><button>submit</button></form>"
  );
});

app.post("/stored-data", function (req, res) {
  const username = req.body.username;
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);

  const existingUsers = JSON.parse(fileData);

  existingUsers.push(username);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1>data stored!</h1>");
});

app.get("/new", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);

  const existingUsers = JSON.parse(fileData);

  let responseBody = "<ul>";
  for (user of existingUsers) {
    responseBody += "<li>" + user + "</li>";
  }
  responseBody += "</ul>";
  res.send(responseBody);
});

app.listen(3000);

// const http = require("http");

// function handleRequest(request, response) {
//   if (request.url === "/current-time") {
//     response.statusCode = 200;
//     response.end('<h1>' + new Date().toISOString() + '</h1>');
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>Hello World</h1>");
//   }
// }

// const server = http.createServer(handleRequest);

// server.listen(3000);
