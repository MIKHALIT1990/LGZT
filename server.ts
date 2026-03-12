import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const DATA_FILE = path.join(process.cwd(), "data.json");

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return { machines: [], articles: [] };
  }
}

function writeData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
  }
}

const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/ro8l9w1v4rzdafe6ddv8rtkk3lkcesxo";

async function sendToWebhook(payload: any) {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json().catch(() => null);
      } else {
        const text = await response.text();
        return { answer: text }; // Treat plain text as the answer
      }
    }
  } catch (error) {
    console.error("Webhook error:", error);
  }
  return null;
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Feedback API
  app.post("/api/feedback", async (req, res) => {
    const { name, phone, message, source } = req.body;
    console.log("Feedback received:", { name, phone, message, source });
    
    // Send feedback to webhook as well
    await sendToWebhook({
      type: "feedback",
      name,
      phone,
      message,
      source: source || "feedback_form",
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, message: "Заявка принята! Мы свяжемся с вами в ближайшее время." });
  });

  // Machines API
  app.get("/api/machines", (req, res) => {
    const data = readData();
    res.json(data.machines);
  });

  app.post("/api/machines", (req, res) => {
    const data = readData();
    const newMachine = { ...req.body, id: req.body.slug };
    data.machines.push(newMachine);
    writeData(data);
    res.json(newMachine);
  });

  app.put("/api/machines/:id", (req, res) => {
    const data = readData();
    const index = data.machines.findIndex((m: any) => m.id === req.params.id);
    if (index !== -1) {
      data.machines[index] = { ...data.machines[index], ...req.body };
      writeData(data);
      res.json(data.machines[index]);
    } else {
      res.status(404).json({ error: "Machine not found" });
    }
  });

  app.delete("/api/machines/:id", (req, res) => {
    const data = readData();
    data.machines = data.machines.filter((m: any) => m.id !== req.params.id);
    writeData(data);
    res.json({ success: true });
  });

  // Articles API
  app.get("/api/articles", (req, res) => {
    const data = readData();
    res.json(data.articles);
  });

  app.post("/api/articles", (req, res) => {
    const data = readData();
    const newArticle = { ...req.body, id: req.body.slug };
    data.articles.push(newArticle);
    writeData(data);
    res.json(newArticle);
  });

  app.put("/api/articles/:id", (req, res) => {
    const data = readData();
    const index = data.articles.findIndex((a: any) => a.id === req.params.id);
    if (index !== -1) {
      data.articles[index] = { ...data.articles[index], ...req.body };
      writeData(data);
      res.json(data.articles[index]);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  });

  app.delete("/api/articles/:id", (req, res) => {
    const data = readData();
    data.articles = data.articles.filter((a: any) => a.id !== req.params.id);
    writeData(data);
    res.json({ success: true });
  });

  // AI Support Logic
  const systemInstruction = `Вы — ИИ-консультант компании LGZT Russia, официального импортера мини-фронтальных погрузчиков LGZT.
    Ваша цель: Кратко и профессионально проконсультировать клиента и перевести его на звонок или визит.

    ТЕХНИЧЕСКИЕ ДАННЫЕ:
    - Модели: LG918 (1т), LG928 (1.5т), LG938 (2т).
    - Преимущества: Шарнирно-сочлененная рама (радиус разворота в 2 раза меньше, износ шин в 8 раз меньше чем у Bobcat), обзорность +40% за счет панорамной кабины.
    - Гарантия: 1 год или 1500 моточасов.
    - Лизинг: Аванс от 0%, решение за 1 день. Выгода до 1 млн руб.
    - В наличии: LG918 Deluxe, LG928 Deluxe. LG918 Standart — под заказ (без гидравлики и кондиционера).

    ПРАВИЛА ОТВЕТА:
    1. Отвечайте КРАТКО (не более 3-4 предложений).
    2. Используйте списки и переносы строк для читаемости.
    3. В конце каждого ответа предлагайте оставить телефон для точного расчета или приглашайте на тест-драйв.
    4. Если клиент спрашивает цену, называйте ориентир (от 1.5 млн) и предлагайте расчет лизинга.
    5. Если вопрос не касается техники LGZT, вежливо скажите, что вы специализируетесь только на продукции LGZT.
  `;

  const chatHistory = new Map<string, any[]>();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    chatHistory.set(socket.id, []);

    socket.on("message", async (data) => {
      const history = chatHistory.get(socket.id) || [];
      history.push({ role: "user", parts: [{ text: data.text }] });

      const userMsg = {
        id: Date.now().toString(),
        text: data.text,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      // Broadcast user message
      io.emit("message", userMsg);

      // Send user message to webhook and wait for potential response
      const webhookResponse = await sendToWebhook({
        type: "chat_user_message",
        text: data.text,
        socket_id: socket.id,
        timestamp: userMsg.timestamp,
        history: history.slice(-5)
      });

      // If Webhook (Make.com) returned an answer, use it. Otherwise, fall back to Gemini.
      if (webhookResponse && webhookResponse.answer) {
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          text: webhookResponse.answer,
          sender: "support",
          timestamp: new Date().toISOString(),
        };
        
        history.push({ role: "model", parts: [{ text: webhookResponse.answer }] });
        chatHistory.set(socket.id, history.slice(-10));

        setTimeout(() => {
          io.emit("message", aiMsg);
        }, 500);
        return;
      }

      // Fallback: AI Response via Gemini
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: history.slice(-10),
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const aiText = response.text || "Извините, я не смог обработать ваш запрос. Пожалуйста, свяжитесь с нами по телефону 8 800 555 35 35.";
        
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          text: aiText,
          sender: "support",
          timestamp: new Date().toISOString(),
        };

        history.push({ role: "model", parts: [{ text: aiText }] });
        chatHistory.set(socket.id, history.slice(-10));

        // Send AI response to webhook
        await sendToWebhook({
          type: "chat_ai_response",
          user_message: data.text,
          ai_response: aiText,
          socket_id: socket.id,
          timestamp: aiMsg.timestamp
        });

        setTimeout(() => {
          io.emit("message", aiMsg);
        }, 1000);
      } catch (error) {
        console.error("AI Error:", error);
        io.emit("message", {
          id: (Date.now() + 1).toString(),
          text: "Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже или позвоните нам.",
          sender: "support",
          timestamp: new Date().toISOString(),
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      chatHistory.delete(socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
