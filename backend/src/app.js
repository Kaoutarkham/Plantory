const express = require("express");
const path = require("path");
const plantRoutes = require("./routes/plant.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/postRoutes"); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes//
app.use("/api/plants", plantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes); 

// Root route//
app.use("/", (req, res) => {
  res.send("Plantory API is running...");
});

module.exports = app;
