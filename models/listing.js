const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title : {
        type:String,
        required : true,
    },
    description : {
        type:String,
        required : true,
    },
    image: {
        filename: {
            type: String,
            default: "default.jpg",
        },
        url: {
            type: String,
            default: "https://www.vecteezy.com/photo/13485781-luxury-sunset-over-infinity-pool-in-a-summer-beachfront-hotel-resort-at-beautiful-tropical-landscape-tranquil-beach-holiday-vacation-background-amazing-island-sunset-beach-view-palms-swimming-pool",
            }
        },
    price: {
        type:Number,
        required : true,
    },
    location: {
        type:String,
        required : true,
    },
    country: {
        type:String,
        required : true,
    },
});

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing;