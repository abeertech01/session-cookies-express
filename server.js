const express = require("express")
const session = require("express-session")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 4050
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
)
app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "session",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    },
  })
)

// save a name as a cookie
app.post("/new", async (req, res) => {
  try {
    const name = req.body.name
    req.session.name = name
    res.send({ message: "saves" }).status(201)
  } catch (error) {
    console.log(error)
  }
})

app.get("/name", async (req, res) => {
  try {
    console.log(req.session.name)
    res.send({ message: req.session.name })
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
