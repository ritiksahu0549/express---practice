const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/",(req,res) =>{
    res.send("welcome home page");
});

app.get("/products",(req,res) =>{
    const products =[
        {id: 1 ,name: "Mobile", price: 10000},
        {id: 2 ,name: "laptop", price: 40000},
    ];res.json(products);
});

app.get("/about",(req,res) =>{
    res.send("this is about page");
});

app.listen(port ,() =>{
    console.log(`server is running at http://localhost:${port}`);
});
