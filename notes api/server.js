const express = require("express");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
app.use(express.json());

app.use("/api/notes",notesRoutes);

    app.listen(3000,()=>{
        console.log("surver runnning at http://localhost:3000");
    });
