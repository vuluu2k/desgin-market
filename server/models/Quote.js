const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const QuoteSchema = new Schema(
    {
        nameQuote:{
            type:String,
            required:true
        },
        phoneQuote:{
            type:String,
            required:true,
        },
        product:{
            type:Schema.Types.ObjectID,
            ref:'products'
        },
        
    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model('quotes',QuoteSchema);