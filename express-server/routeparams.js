const express = require("express");
const app = express();
const port = 3000;

const students =[
    {id: 1 , name: "dholu", city: "ujjain"},
    {id: 1 , name: "bholu", city: "ujjain"},
    {id: 1 , name: "kaliya", city: "ujjain"},
    {id: 1 , name: "bheem", city: "ujjain"},
    {id: 1 , name: "raju", city: "ujjain"},
];

app.use((req,res,next) =>{
    console.log(`${req.method} request on ${req.url}`);
    next();
});

app.get("/students",(req,res )=>{
    const city = req.query.city ;

    if (city) {
        const filtered = students.filter((s) =>s.city.toLowerCase());
        res.json(filtered);
    }else{
        res.json(students);
    }
});

app.get("/students/:id",(req,res) =>{
    const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.listen(port,() =>{
    console.log(`survder is running http://localhost:${port}`);
});