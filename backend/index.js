const express = require("express");
const router = require("./router");
const dotenv = require("dotenv"); //new
const mongoose = require("mongoose");//new
dotenv.config();//new
const PORT = 8000;
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(router);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(PORT, async () => {
       console.log(`server up on port ${PORT}`);
}); 