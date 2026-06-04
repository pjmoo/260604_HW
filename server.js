// 의존성
require("dotenv").config();
const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
const GroqAI = require("groq-sdk");

// 전역변수
const app = express();
const { GEMINI_API_KEY, GROQ_API_KEY, PORT = 3737 } = process.env;

// API 객체 초기화 (키가 있을 때만 활성화하여 크래시 방지)
let google;
if (GEMINI_API_KEY) {
  google = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
} else {
  console.warn("경고: GEMINI_API_KEY가 설정되지 않았습니다.");
}

let groq;
if (GROQ_API_KEY) {
  groq = new GroqAI({ apiKey: GROQ_API_KEY });
} else {
  console.warn("경고: GROQ_API_KEY가 설정되지 않았습니다.");
}

app.use(express.json());

// 루트 폴더를 정적 파일 서빙용으로 지정하여 index.html을 바로 열 수 있도록 함
app.use(express.static(path.join(__dirname)));

app.post("/chat", async (req, res) => {
  const { provider, model, ask } = req.body;
  console.log("provider:", provider);
  console.log("model:", model);
  console.log("ask:", ask);

  let result;
  console.log("[서버 요청 시작]");
  try {
    switch (provider) {
      case "google":
        if (!google) {
          throw new Error("Google Gemini API 키가 설정되지 않았습니다.");
        }
        console.log("google 제공자 요청");
        result = await useGoogle(model, ask);
        break;
      case "groq":
        if (!groq) {
          throw new Error("Groq API 키가 설정되지 않았습니다.");
        }
        console.log("groq 제공자 요청");
        result = await useGroq(model, ask);
        break;
      default:
        console.log("잘못된 Provider:", provider);
        return res.status(400).json({ error: "존재하지 않는 Provider입니다." });
    }
    console.log("[서버 요청 완료]");
    res.json({ result });
  } catch (error) {
    console.error("[서버 에러 발생]:", error.message);
    res.status(500).json({ error: error.message || "서버 내부 처리 중 오류가 발생했습니다." });
  }
});

async function useGoogle(model, ask) {
  const response = await google.models.generateContent({
    model,
    contents: ask,
  });
  return response.text;
}

async function useGroq(model, ask) {
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: ask }],
    model,
  });
  return response.choices[0].message.content;
}

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다. http://localhost:${PORT}`);
});
