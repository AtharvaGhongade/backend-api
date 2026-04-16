const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

app.get("/api", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT GETDATE() AS currentTime");
    res.json({
      message: "Backend connected to SQL DB!",
      data: result.recordset
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000);