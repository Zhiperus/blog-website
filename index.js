import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const userBlogs = [];
const navContent = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render('card.ejs', {content: "Hello", navContent: navContent});
})

app.post("/create", (req, res)=>{
    res.render('submission.ejs', {navContent: navContent});
})

app.post("/submit", (req, res)=>{
    if(req.body.title && req.body.content){
        userBlogs.push({title: req.body.title, content: req.body.content});
        navContent.push(`<button type="submit" formaction="/blog/${userBlogs.length-1}" class="blog montserrat-text">${req.body.title}</button>`);
        console.log(userBlogs)
    }
    res.redirect("/");
})

app.get("/blog/:id", (req, res)=>{
    res.render('card.ejs', {blog: userBlogs[req.params.id], navContent:navContent })
})

app.listen(port, ()=>{
    console.log("Listening to port 3000...");
})