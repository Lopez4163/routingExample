const express = require("express")
const apiRouter = express.Router()

apiRouter.get("/", (req, res) => {
  console.log("test")
  res.send("This is the root for /api")
})
const usersRouter = require("./users")
apiRouter.use("/users", usersRouter)

const beerRouter = require("./beers")
apiRouter.use("/beers", beerRouter)

module.exports = apiRouter
