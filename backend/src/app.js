const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const plantRoutes = require("./routes/plant.routes"); 

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes); 

app.get("/", (req, res) => {
  res.send("Plantory API is running...");
});

module.exports = app;