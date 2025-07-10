const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("../Full Stack Wanderlust Project/models/listing.js")
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(express.urlencoded({extended:true})); // for data parsing
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.set("views",path.join(__dirname,"views"));

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

//New & Create Route
app.get("/listings/new",(req,res)=>{
    res.render("Newform.ejs")
})

app.post("/listings",async (req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    const place = new Listing({
        title : title,
        description : description,
        image:image,
        price:price,
        location:location,
        country:country,
    })
    place.save()
        .then(res => console.log("Updated"))
        .catch(err => console.log(err))
    res.redirect("/listings")
})


//Show Route, we used it after new and create because new takes it's value as id
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id)
    res.render("show.ejs",{listing})
})

//updtae: Edit
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id)
    res.render("edit.ejs",{listing})
})
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listingData = req.body.listing;
    Listing.findByIdAndUpdate(id, listingData, { runValidators: true, new: true })
        .then((res) => {console.log("Received ID:", req.params.id);})
        .catch((err)=> {console.log(err)})
    res.redirect(`/listings/${id}`);
});
//Delete
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings");
});

//listening
app.listen(port,()=>{
    console.log("Listening")
});