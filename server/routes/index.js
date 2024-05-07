var express = require("express");
var OpenAI = require("openai");
var router = express.Router();

const openai = new OpenAI();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:5173",
    "https://thankful-ground-031ea5703.5.azurestaticapps.net/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/chatgtp", async (req, res) => {
  const prompt = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `text = ${req.body.text}; language = ${req.body.language}; text difficulty = ${req.body.style}; text length = ${req.body.length};`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  res.send(prompt.choices[0].message.content);
});

module.exports = router;
