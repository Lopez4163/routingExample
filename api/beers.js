const express = require("express")
const beerRouter = express.Router()
const {
  getAllBeers,
  getBeerById,
  createBeer,
  updateBeer,
  deleteBeer,
} = require("../db/index")

//Middleware
// app.use(express.raw({ type: "application/json" }))

//Beer routes
beerRouter.get("/", async (req, res, next) => {
  try {
    const beers = await getAllBeers()
    res.send(beers)
  } catch (e) {
    next(e.message)
  }
})
beerRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const beer = await getBeerById(id)
    res.send(beer)
  } catch (e) {
    next(e.message)
  }
})
beerRouter.post("/create", async (req, res, next) => {
  try {
    const { name, type, cost, isavailable } = req.body
    const beer = await createBeer(name, type, cost, isavailable)
    res.send(beer)
  } catch (e) {
    next(e.message)
  }
})
beerRouter.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const { name, type, cost, isavailable } = req.body
    const beer = await updateBeer(id, name, type, cost, isavailable)
    res.send(beer)
  } catch (e) {
    next(e.message)
  }
})
beerRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const deletion = await deleteBeer(id)
    res.send(deletion)
  } catch (e) {
    next(e.message)
  }
})

module.exports = beerRouter

//middleware
// app.use(express.json())
// app.use(express.urlencoded({ extened: true }))
