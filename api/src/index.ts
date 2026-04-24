import express from "express";
import cors from "cors";
import { client, db } from "./db/connection";
import noticiasRouter from "./routes/noticias";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString("pt-BR")}] ${req.method} ${req.url}`);
  next();
});

// Cria a tabela automaticamente se não existir
async function init() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS noticias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      autor TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Rotas
  app.use("/noticias", noticiasRouter);

  // Health check
  app.get("/", (_req, res) => {
    res.json({ status: "ok", mensagem: "API de Notícias funcionando 🗞️" });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

init().catch(console.error);
