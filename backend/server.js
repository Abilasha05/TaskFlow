const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API is Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});