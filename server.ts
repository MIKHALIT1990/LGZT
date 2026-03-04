import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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

  // AI Support Logic
  const systemInstruction = `
    Вы — виртуальный помощник компании LGZT RUSSIA. 
    Ваша задача — отвечать на вопросы клиентов о мини-фронтальных погрузчиках LGZT.
    
    Информация о технике:
    - LG918 Deluxe: 1 850 000 руб. (YN25, 45 л.с., грузоподъемность 1000 кг, высота выгрузки 3м)
    - LG928 Deluxe: 2 050 000 руб. (YN27, 48 л.с., грузоподъемность 1500 кг, высота выгрузки 3.5м)
    - LG918 Standart (Базовая): 1 500 000 руб. (Без гидравлики, кондея, печки, высота 2.4м)
    
    Преимущества LGZT:
    - Обзорность на 40% выше чем у мини-погрузчиков с бортовым поворотом.
    - Расход шин в 6-8 раз ниже.
    - Клиренс 390 мм.
    - Не портит газон при развороте.
    
    Дилеры:
    - ТС Ресурс (Тюмень)
    - Технова (Петрозаводск)
    
    Гарантия: 1 год или 1500 м/ч.
    
    Отвечайте вежливо, кратко и профессионально. 
    ИСПОЛЬЗУЙТЕ ПЕРЕНОСЫ СТРОК (Enter) и списки для того, чтобы текст было удобно читать. 
    Не пишите всё одним сплошным блоком.
    Если вопрос не касается техники LGZT, вежливо скажите, что вы специализируетесь только на продукции LGZT.
  `;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", async (data) => {
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
        timestamp: userMsg.timestamp
      });

      // If Webhook (Make.com) returned an answer, use it. Otherwise, fall back to Gemini.
      if (webhookResponse && webhookResponse.answer) {
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          text: webhookResponse.answer,
          sender: "support",
          timestamp: new Date().toISOString(),
        };
        
        setTimeout(() => {
          io.emit("message", aiMsg);
        }, 500);
        return; // Stop here if we got an answer from Make.com
      }

      // Fallback: AI Response via Gemini
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: [{ role: "user", parts: [{ text: data.text }] }],
          config: {
            systemInstruction,
          },
        });

        const aiText = response.text || "Извините, я не смог обработать ваш запрос. Пожалуйста, свяжитесь с нами по телефону 8 800 555 35 35.";
        
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          text: aiText,
          sender: "support",
          timestamp: new Date().toISOString(),
        };

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
        }, 1000); // Simulate typing delay
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
