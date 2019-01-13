// Mannually run this file
// Finish the data form from SQL to JSON and then send it to website

// SQL
var mysql = require('mysql');

// This should go into the environmental variable
var con = mysql.createConnection({
  host: 'localhost',
  user: 'user_name',
  password: 'pw',
  database: 'database_name'
});
// END SQL

var express = require('express');

var app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://my-site');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/post-count', function (req, res) {
  console.log(req.url);
  console.log(Math.random());
  con.query('SELECT COUNT(*) FROM database_name;', function (err, rows) {
    if (err) throw err;
    console.log(rows);
    console.log('-----END-----');
    res.end(JSON.stringify(rows));
  });
});

app.get('/postList', function (req, res) {
  console.log(req.url);
  console.log(Math.random());
  console.log('Page: '+ req.query.page);
  con.query('SELECT * FROM database_name.blog_list ORDER BY postID DESC LIMIT ' + ((req.query.page-1)*5) + ', 5;', function (err, rows) {
    if (err) throw err;
    console.log(rows);
    console.log('-----END-----');
    res.end(JSON.stringify(rows));
  });
});

app.get('/categoryList', function (req, res) {
  console.log(req.url);
  console.log(Math.random());
  con.query('SELECT * FROM database_name.category_list ORDER BY name;', function (err, rows) {
    if (err) throw err;
    console.log(rows);
    console.log('-----END-----');
    res.end(JSON.stringify(rows));
  });
});

app.get('/category', function (req, res) {
  console.log(req.url);
  console.log(Math.random());
  con.query('SELECT * FROM database_name.blog_list WHERE category="' + req.query.category + '" ORDER BY postID DESC;', function (err, rows) {
    if (err) throw err;
    console.log(rows);
    console.log('-----END-----');
    res.end(JSON.stringify(rows));
  });
});

var fs = require('fs');

app.get('/getPost', function (req, res) {
  console.log(req.url);
  console.log(Math.random());
  fs.readFile('../content_library/Blog_Post/'+req.query.postDate+'.html', function (err, contents) {
    if (err) throw err;
    console.log(contents);
    console.log('-----END-----');
    res.send(contents);
  });
});

app.listen(8081, function () {
  console.log('Listen to 8081');
});

// END Listen