import express from "express";
import OpenAI from "openai";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(express.json());
app.use(cors());

app.post("/api/story", async (req, res) => {
  try {
    const { userInput } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userInput }],
      model: "gpt-3.5-turbo",
    });

    // console.log("input successfull: ", userInput);

    const response = completion.choices[0].message.content;

    // const response = "This is a succesful test response";

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
