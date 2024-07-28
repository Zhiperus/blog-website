import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const userBlogs = new Map();
const navContent = [];
var blogCount = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render('card.ejs', {navContent: navContent});
})

app.get("/blog/:id", (req, res)=>{
    res.render('card.ejs', {id: req.params.id, blog: userBlogs.get(parseInt(req.params.id)), navContent:navContent })
})

app.post("/create", (req, res)=>{
    res.render('submission.ejs', {navContent: navContent});
})

app.post("/submit", (req, res)=>{
    if(req.body.title && req.body.content){
        blogCount++;
        userBlogs.set(blogCount, {title: req.body.title, content: req.body.content});
        navContent.push({id: blogCount, nav: `<button type="submit" formaction="/blog/${blogCount}" class="blog montserrat-text">${req.body.title}</button>`});
    }
    res.redirect("/");
})

// Edit Method
app.post("/edit/blog/:id", (req, res) => {
    res.render("edit.ejs", {id: parseInt(req.params.id), blog: userBlogs.get(parseInt(req.params.id)), navContent: navContent });
})

app.post("/edit/blog/finish/:id", (req, res) => {
    userBlogs.set(parseInt(req.params.id), {title: req.body.title, content: req.body.content});
    res.redirect("/");
})

// Delete Method
app.post("/blog/:id", (req, res) => {
    userBlogs.delete(parseInt(req.params.id));
    for(var i = 0; i < navContent.length; i++){
        if(navContent[i].id == req.params.id){
            if(i == 0){
                navContent.splice(i, i + 1);
            }
            navContent.splice(i, i);
            blogCount--;
        }
    }
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log("Listening to port 3000...");
})