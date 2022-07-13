import express from 'express';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    parameterLimit: 1000000,
    extended: false
}));

app.get('/', (req, res) => {
  return res.json({message: `We are Live!`})
})


app.listen(8000, () => {
    console.log("Server is now listening in 8000")
})

