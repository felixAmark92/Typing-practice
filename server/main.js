import OpenAI from "openai";
import { MongoClient } from "mongodb";
import express from "express";
import bodyParser from "body-parser";

//OpenAi
const openai = new OpenAI();

// //MongoDb
// const uri = "mongodb://localhost:27017";

// const client = new MongoClient(uri);

// const database = client.db("typing-practice");
// const quotes = database.collection("quotes");

//Server
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("/", async (req, res) => {
//   const result = await quotes.aggregate([{ $sample: { size: 1 } }]).toArray();
//   console.log(result);

//   res.send(result[0]);
// });

app.post("/chatgtp", async (req, res) => {
  const prompt = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `text = ${req.body.text}; language = ${req.body.language}; text difficulty = ${req.body.style}; text length = ${req.body.length};`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(prompt.choices[0]);

  res.send(prompt.choices[0].message.content);
});

// app.post("/", async (req, res) => {
//   console.log(req.body);
//   await quotes.insertOne(req.body);
//   res.send("OK");
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
