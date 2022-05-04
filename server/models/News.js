const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    titleNew: {
        type: String,
        required: true
    },
    contentNew: {
        type: String,
        required: true
    },
    imageNewUrl: {
        type: String
    },
    imageNewId: {
        type: String
    },
    costCar:{
        type:Number,
            required:true,
    },logoSize:{
        type: String
    },logoType:{
        type: String
    },
            
}, {
    timestamps: true,
})
module.exports = mongoose.model('news', NewsSchema);