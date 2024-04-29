require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080
const apiRouter = require("./api")
const authRouter = require("./auth")

//Middleware
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const morgan = require("morgan")
app.use(morgan("dev"))

app.use((req, res, next) => {
  console.log("<____Body Logger START____>")
  console.log(req.body)
  console.log("<_____Body Logger END_____>")
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Server Start
app.use("/api", apiRouter)
app.use("/auth", require("./auth"))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log("listening on PORT:" + process.env.PORT)
})

// client.connect()

//console log enders
// app.use((req, res, next) => {
//   console.log("<___BODY LOGGER START_____>")
//   console.log(req.body)
//   console.log("<___BODY LOGGER END_______>")
//   next()
// })

// app.post("/login", async (req, res, next) => {
//   try {
//     const { username, password } = req.body
//     const token = await get(username, password)
//     console.log(token)
//     res.send(token)
//   } catch (err) {
//     next(err)
//   }
// })
