import { Router, Request, Response } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/connection";
import { noticias } from "../db/schema";

const router = Router();

// GET /noticias — lista todas
router.get("/", async (_req: Request, res: Response) => {
  try {
    const todas = await db
      .select()
      .from(noticias)
      .orderBy(desc(noticias.createdAt));
    res.json(todas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar notícias" });
  }
});

// GET /noticias/:id — busca por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

    const result = await db
      .select()
      .from(noticias)
      .where(eq(noticias.id, id));

    const noticia = result[0];
    if (!noticia) return res.status(404).json({ erro: "Notícia não encontrada" });

    res.json(noticia);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar notícia" });
  }
});

// POST /noticias — cria nova
router.post("/", async (req: Request, res: Response) => {
  try {
    const { titulo, conteudo, autor } = req.body;

    if (!titulo || !conteudo || !autor) {
      return res.status(400).json({ erro: "titulo, conteudo e autor são obrigatórios" });
    }

    const result = await db
      .insert(noticias)
      .values({ titulo, conteudo, autor })
      .returning();

    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar notícia" });
  }
});

// PUT /noticias/:id — atualiza
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

    const { titulo, conteudo, autor } = req.body;

    if (!titulo && !conteudo && !autor) {
      return res.status(400).json({ erro: "Informe ao menos um campo para atualizar" });
    }

    const agora = new Date().toISOString().replace("T", " ").slice(0, 19);

    const result = await db
      .update(noticias)
      .set({
        ...(titulo && { titulo }),
        ...(conteudo && { conteudo }),
        ...(autor && { autor }),
        updatedAt: agora,
      })
      .where(eq(noticias.id, id))
      .returning();

    if (!result[0]) return res.status(404).json({ erro: "Notícia não encontrada" });

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar notícia" });
  }
});

// DELETE /noticias/:id — remove
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

    const result = await db
      .delete(noticias)
      .where(eq(noticias.id, id))
      .returning();

    if (!result[0]) return res.status(404).json({ erro: "Notícia não encontrada" });

    res.json({ mensagem: "Notícia removida com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover notícia" });
  }
});

export default router;
