const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db')
mongoDB();
const cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable passing cookies from the client to the server
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: 'Content-Type,Authorization', // Add the necessary headers here
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.use('/api',require("./Routes/FoodAddData"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})