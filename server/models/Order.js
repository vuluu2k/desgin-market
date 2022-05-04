const mongoose = require('mongoose')
const {Schema} = mongoose

const OrderSchema = new Schema({
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        company:{
            type:String
        },
        nation:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        codeZip:{
            type:String
        },
        city:{
            type:String,
            required:true
        },
        numberPhone:{
            type:String,
            length:10,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        note:{
            type:String
        },
        pay:{
            type:String,
            enum:['payOnline','payOffline']
        },
        check:{
            type:Boolean,
            default:false
        },
        cart:{
            type:Array,
            required:true
        }

    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Order',OrderSchema)
