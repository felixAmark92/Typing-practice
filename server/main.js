const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

const database = client.db("typing-practice");
const quotes = database.collection("quotes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res) => {
  const result = await quotes.findOne();
  console.log(result);

  res.send(result);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  await quotes.insertOne(req.body);
  res.send("OK");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
