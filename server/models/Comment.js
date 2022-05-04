const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema(
    {
        nameComment:{
            type:String,
            required:true
        },
        emailComment:{
            type:String,
            required:true
        },
    
        contentComment:{
            type:String,
            required:true
        },
        product:{
            type:Schema.Types.ObjectID,
            ref:'products'
        },
        rate:{
            type:String,
           
        },
        isCheck:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model('comments',CommentSchema);