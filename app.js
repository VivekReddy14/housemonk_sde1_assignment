const express = require('express');
// const router = require('./routes/index')

// Initialising Express server 
const app = express();
const port = 9899;

app.use(express.json());
  
app.get('/', async(req,res)=>{
    res.send('Hello world')
})

// app.use('/',router)

app.listen(port, () => {
  console.log(`Your core service is running at http://localhost:${port}`);
});
