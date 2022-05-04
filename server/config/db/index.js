require('dotenv').config();
const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.d05ob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true,
            }
        )
        console.log('Connect to DB success');
    }catch(e){
        console.log('Fail connect to db',e.message);
        process.exit(1);
    }
}
module.exports={connect};