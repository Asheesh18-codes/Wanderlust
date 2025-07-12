const mongoose = require("mongoose");
const { max } = require("../schema");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    comment: String,
    rating:{
        type: Number,
        max: 5,
        min: 1,
    },
    created_at : {
        type: Date,
        default: Date.now(),
    }
});

module.exports  = mongoose.model("Review", typeSchema());
