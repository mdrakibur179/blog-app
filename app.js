const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let posts = [];

const homeStartingContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const aboutContent =
  "Lorem Ipsum is simply dummy txt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ";

const contactContents = "Lorem Ipsum is simply industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "

app.get("/", (req, res) => {
    res.render('home', {homeStartingContent: homeStartingContent, posts: posts});
});

app.get("/about", (req, res) => {
    res.render('about', {aboutContents: aboutContent});
});

app.get("/contact", (req, res) => {
    res.render('contact', {contactContents: contactContents})
});

app.get("/compose", (req, res) => {
    res.render('compose');
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postDesc
    }
    posts.push(post);

    res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);

        if(storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            })
        } 
    });

    
});




app.listen(3000, () => {
  console.log("The server is running on localhost:3000");
});