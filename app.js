require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

const generatePassword = () =>{
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']
    password_letters = ["X", "X", "X", "X"]
        for (let index = 0; index < password_letters.length; index++) {
            random_index = Math.floor(Math.random() * letters.length);
            password_letters[index]= letters[random_index];
        }
    password_numbers = ["X", "X", "X", "X"]
        for (let index = 0; index < password_numbers.length; index++) {
            random_index = Math.floor(Math.random() * numbers.length);
            password_numbers[index]= numbers[random_index];
        }
    password_symbols = ["X", "X", "X", "X"]
        for (let index = 0; index < password_symbols.length; index++) {
            random_index = Math.floor(Math.random() * symbols.length);
            password_symbols[index]= symbols[random_index];
        }
    password_list = password_letters.join('') + password_numbers.join('') + password_symbols.join('');
    password_list = password_list.split('').sort(() => {return 0.5-Math.random()}).join('');
    return password_list;
}

app.post("/", (req,res) => {
    randomPassword = generatePassword();
    t_email = req.body.email
    res.render("home", {
        password: randomPassword,
        email: t_email
    })
})

app.get("/", (req, res) => {
    res.render("home", {
        password: null,
        email: null
    })
})


let port = process.env.PORT;
if(port == null || port ==""){
    port = 3000;
}

app.listen(port, function(){
    console.log("App running successfully at localhost:"+port);
});