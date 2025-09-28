import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.send("🚀 MEDBRIDGE API fonctionne !");
});

app.get("/users/:id/tasks", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT t.titre, ut.statut, ut.date_debut, ut.date_fin FROM user_tasks ut JOIN tasks t ON ut.task_id = t.id WHERE ut.user_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/qcm/:examen", async (req, res) => {
  try {
    const { examen } = req.params;
    const result = await pool.query(
      "SELECT * FROM qcm WHERE examen = $1 ORDER BY RANDOM() LIMIT 5",
      [examen]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ API en ligne : http://localhost:${port}`);
});