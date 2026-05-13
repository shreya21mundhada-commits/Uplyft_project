const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { GoogleGenerativeAI } =
    require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// GEMINI API

const genAI =
    new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model =
    genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    });


// CHAT API

app.post("/chat", async(req, res) => {

    try {

        const userMessage = req.body.message;

        const result =
            await model.generateContent(userMessage);

        const response =
            result.response.text();

        res.json({
            reply: response
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            reply: "Server Error"
        });

    }

});


// SERVER

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});