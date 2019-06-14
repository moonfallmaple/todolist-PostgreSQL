const express = require('express');
const app = express();
const { Pool, Client } = require("pg");
const bodyParser= require('body-parser');



// DB connect
const client = new Client({
    user: "sunrisejade",
    host: "localhost",
    database: "todolists",
    password: "YOUR PASSWORD",
    port: 5432
  });
  
    client.connect();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// listen server
app.listen(3000);

// set up template engine

app.set("view engine","ejs");

// static files
app.use(express.static('public'));

// file controllers

    app.get("/", (req, res) => {

        client
            .query("select * from todos")
            .then(result => res.render("todo", { data: result.rows}))
            .catch(err => console.error(err));
    });

    app.post("/", (req,res) => {

        client
            .query(
                "insert into todos (item) values($1)",
                [req.body.item]
            )
            .then(res.redirect("/"))
            .catch(err => console.error(err));
            console.log('Add log from server side:', req.body)
        });

    app.delete("/:item", (req,res) => {

        client
            .query(
                "delete from todos where item = $1", 
                [req.params.item.replace(/\-/g, " ")]
            )
            .then(res.send(200))
            .catch(err => console.error(err));
            console.log('Delete log from server side:', req.params)
        
    });
    


