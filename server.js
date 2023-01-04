import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import app from './app.js'

const port=process.env.PORT || 5001;

//database connection 
const connectionString=process.env.MONGO_URL
mongoose.connect(connectionString).then((res)=>{
    console.log("successfully connected to database");
}).catch((error)=>console.log(error.message));


app.get('/',(req,res)=>{
    res.send('hello');
})


app.listen(port,()=>{
    console.log("listining on port ",port);
})

