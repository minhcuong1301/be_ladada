import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import routers from "./routers/index.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))//request,response
const PORT = process.env.PORT || 5050;
//ket noi db
mongoose.connect(process.env.ATLAS_URI,{autoIndex:true})
    .then(() => console.log('Connected!'))
    .catch(
      e=>console.log(e)
    );
// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
  // Global error handling
app.use((err, _req, res, next) => {
    winston.loggers.get('system').error('ERROR', err);
    res.status(500).send(err);
  })
app.get('/')  
routers(app);