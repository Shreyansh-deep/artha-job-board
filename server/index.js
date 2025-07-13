require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const importLogsRoute = require("./routes/importLogs");
const cors = require("cors")

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
app.use("/api/import-logs", importLogsRoute);

// Root
app.get("/", (req, res) => {
  res.send("Job Importer Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
