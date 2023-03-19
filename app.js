const express = require('express');
const router = require('./src/routes/index');
const connectDB = require('./src/models/index');

// Initialising Express server 
const app = express();
const port = 9899;

// Initialising db connection - check index.js in models
connectDB();

// Accepting JSON and www-form-urlencoded formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialising Cors policy and accepting all headers and requests from all origins
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
  
//base route
app.get('/', async(req,res)=>{
    res.send('Hello world')
})

//writing routes in different file
app.use('/',router)

app.listen(port, () => {
  console.log(`Your core service is running at http://localhost:${port}`);
});
