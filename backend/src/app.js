const express = require("express");
const cors = require("cors");
const prisma = require("./config/database");

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("backend is running");
});

async function testDb() {
  try {
    await prisma.$connect();
    console.log("Database connected ");
  } catch (err) {
    console.error("Database connection failed ", err);
  }
}
testDb();

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
