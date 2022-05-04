const mongoose = require('mongoose');
const {Schema} = mongoose;

const SilderSchema =new Schema({
        imgIdPublic:{
            type:String,
            required:true,
        },
        imgUrl:{
            type:String,
            required:true,
        },
        kind:{
            type:String,
            enum:['header','footer'],
            require:true,
        }  
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Silder',SilderSchema);