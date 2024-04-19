import express from "express"
import bodyParser from "body-parser"
import { chat } from "./utils/coze.js"

const app = express()
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Welcome to ai api")
})

app.post("/v1/chat/completions", async (req, res) => {
  chat(req, res)
})

app.post("/chat/completions", async (req, res) => {
  chat(req, res)
})

function writeModels(res) {
  res.status(200).json({
    object: "list",
    data: [
      {
        id: "chatgpt-4",
        object: "model",
        created: 1686935002,
        owned_by: "openai",
      },
    ],
  })
}

app.get("/models", async (_req, res) => writeModels(res))
app.get("/v1/models", async (_req, res) => writeModels(res))

app.listen(process.env.PORT || 3000)
