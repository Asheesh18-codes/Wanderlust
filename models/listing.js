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
            default: "https://images.unsplash.com/photo-1751710953703-7e1597676e08?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing;