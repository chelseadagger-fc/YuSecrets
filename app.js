//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
require("dotenv").config();


const app = express();
const saltRounds = 10;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ////////////////////////////////////

main().catch(err => console.log(err));

async function main() {
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
}

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});



const User = new mongoose.model("User", userSchema);

// ////////////////////////////////////

app.get("/", function(req,res) {
    res.render("home");
});
app.get("/login", function(req,res) {
    res.render("login");
});
app.get("/register", function(req,res) {
    res.render("register");
});

app.post("/register", function(req,res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
    
        newUser.save()
            .then(function() {
                res.render("secrets");
            })
            .catch(function() {
                console.log(error);
            })
        ;
    });


})

app.post("/login", function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username})
        .then((foundUser) => {
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if (result === true) {
                    result.render("secrets");
                } else {
                    console.log("Username/password mismatch.");
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })
})

app.listen(3000, function() {
    console.log("Sever is running; listening to port 3000")
})