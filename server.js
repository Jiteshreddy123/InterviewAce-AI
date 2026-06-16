const express = require("express");
const dotenv = require("dotenv");
const { marked } = require("marked");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ask", async (req, res) => {

    try {

        const { question, role ,difficulty} = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
           contents: `
You are an expert ${role} interviewer.

Provide:

1. Recruiter Ready Answer
2. Key Interview Points
3. Follow Up Questions

Question:
${question}
Difficulty Level:
${difficulty}
`
        });

       res.json({
        answer: marked(response.text)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            answer: "Something went wrong."
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});