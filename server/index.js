const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');
db.connect();
const route = require('./routes');
const port=process.env.PORT||5000;

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({
    limit:'50mb',
    extended:true
}))
app.use(cors())


route(app);


app.listen(port, ()=>console.log(`server run in http://localhost:${port}`))