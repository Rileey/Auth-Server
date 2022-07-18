import express from 'express';
import cors from 'cors';
import client from './database.js'
import userRoute from './route/user_route.js'

export const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    parameterLimit: 1000000,
    extended: false
}));

//route
app.use('/api', userRoute);



app.get('/', (req, res) => {
  return res.json({message: `We are Live!`})
})

client.connect()
app.listen(8000, () => {
    // console.log("Server is now listening in 8000")
})

console.log("Client connected")

