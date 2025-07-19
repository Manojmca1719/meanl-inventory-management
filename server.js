const express = require('express');
const mongoose = require('mongoose');
/** 
 * Cross-Origin Resource Sharing (CORS) is used in Node.js 
 * to allow web applications from different origins (domains) to interact with a Node.js 
 * backend API or server resources. 
 * */ 
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

/**
 * When a client sends data to an Express server in the form of a JSON (JavaScript Object Notation) payload (commonly in POST or PUT requests), this data is initially a raw string in the request body.
express.json() acts as a middleware that intercepts these requests.
It checks for requests with a Content-Type header set to application/json.
If the header matches, the middleware parses the raw JSON string into a JavaScript object. 

2. Populates req.body
Once the JSON data is parsed, express.json() attaches it to the req.body property of the request object.
This makes the JSON data easily accessible to your route handlers and other middleware functions in your application. 

3. Simplifies API development
In modern web development, particularly with RESTful APIs, JSON is the standard format for data exchange between clients and servers.
express.json() simplifies the process of receiving and working with JSON data, eliminating the need to manually parse the raw request body.
 */
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("MongoDB Connected"))
.catch(err=>console.error(err));

// routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})