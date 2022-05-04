const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = new Schema(
    {
        nameAccount:{
            type: String,
            required: true
        },
        passwordAccount:{
            type: String,
            required:true
        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model('accounts',AccountSchema)