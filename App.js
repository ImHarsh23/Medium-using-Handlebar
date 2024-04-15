const express = require('express');
const path = require("path");
const hbs = require('hbs');

const app = express();
const Port = 3000;


app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

const controller = require("./Controller/controller.js");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

let flag = false;
const limit = 10;
let current_count = 0; 
  

app.get("/",async (req, res)=>{

    if(!flag){
        current_count = 10;
    }
    else{
        flag = false;
    }

    //1. Fetching TRENDING POST 
    let data = await controller.getTrendingData();
    //decreasing title length to 10 and add ... 
    data = data.map((element)=>{
        if(element.title.length > 50){
            element.title = element.title.slice(0,60) + "...";
        }
        return element;
    })

    //2. FETCHING TAGS
    const tags = await controller.getTagData();
    const tagData = Object.entries(tags).map(([key, value])=>({key, value}));

    //3.FETCHING ARTICLES
    const posts = await controller.getArticleData();

    for(let single of posts){

        //Setting ms to month date year string
        const time_in_ms = single.post.firstPublishedAt;
        const date = new Date(time_in_ms);
        single.post.firstPublishedAt = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`; 

        //Random readTime
        single.post.readingTime = Math.round(single.post.readingTime);

        //Adding ... to large string
        if(single.post.title.length > 50){
            single.post.title = single.post.title.slice(0,50) + "...";
        }
    }

    //sending hbs file to server after creating on server
    res.render("index",{
        data,
        tagData,
        posts:[...posts.slice(0, current_count)]
    });
})

app.get("/add", (req, res)=>{
    current_count += limit;
    flag = true;

    if(current_count <=50 ) res.redirect("/");
    else res.send("No more content");
})


app.listen(Port, ()=>{
    console.log("Server running at", Port);
})