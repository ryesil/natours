const express = require('express');
const app=express();
const port=3000;

//we can do all http request using the same url.
app.get('/',(req,res)=>{
//res.status(200).send('Hello from the server side!');
//instead of sending a string we can send a json object
res
.status(200)
.json({response:'Hello from the server side!',app:'Natours', firstName:'Ramazan', lastName:"yesil"})
})

//add new data
app.post('/',(req,res)=>{
    res.status(200).json({response:"You can post to URL"})
})

//major update
app.patch('/',(req,res)=>{
    res.end("You can patch to this endPoint")
})

//minor update
app.put('/',(req,res)=>{
    res.end("You can patch to this endPoint")
})
app.put('/',(req,res)=>{
    res.status(200).json({
        response:"You can put to this endPoint"
    })
})
app.listen(port,()=>{
    console.log(`App is running on port ${port}...`)
});



