const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("../Full Stack Wanderlust Project/models/listing.js")
const path = require('path');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true})); // for data parsing
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))

main()
    .then((res)=>{console.log("connected to DB")})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//indexRoute
app.get("/",(req,res)=>{
    res.redirect("/listings")
})
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({})
    res.render("index.ejs",{allListings})
});

//Show Route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id)
    res.render("show.ejs",{listing})
})

//New & Create Route
app.get("/listings/new",(req,res)=>{
    res.render("Newform.ejs")
})

//listening
app.listen(port,()=>{
    console.log("Listening")
});