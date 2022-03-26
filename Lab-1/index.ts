
const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  res.send('Hello World')  
})  

app.get('/add/:num1/:num2', (req, res) => { 
     let num1  = parseInt(req.params.num1)
     let num2  = parseInt(req.params.num2)
     
     console.log("connection was made")
    res.send(num1+" + "+num2+" = "+(num1+num2))
     
})
app.get('/minus/:num1/:num2', (req, res) => { 
    let num1  = parseInt(req.params.num1)
    let num2  = parseInt(req.params.num2)
    
    console.log("connection was made")
   res.send(num1+" + "+num2+" = "+(num1-num2))
    
})
app.get('/multiply/:num1/:num2', (req, res) => { 
    let num1  = parseInt(req.params.num1)
    let num2  = parseInt(req.params.num2)
    
    console.log("connection was made")
   res.send(num1+" + "+num2+" = "+(num1*num2))
    
})
app.get('/division/:num1/:num2', (req, res) => { 
    let num1  = parseInt(req.params.num1)
    let num2  = parseInt(req.params.num2)
    
    console.log("connection was made")
   res.send(num1+" + "+num2+" = "+(num1/num2))
    
})
app.listen(3000)
