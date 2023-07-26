//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
require("dotenv").config();


const app = express();
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

})

app.post("/login", function(req,res) {

})

app.listen(3000, function() {
    console.log("Sever is running; listening to port 3000")
})