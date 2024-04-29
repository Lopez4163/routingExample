const express = require("express")
const usersRouter = express.Router()
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../db")

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.send(users)
  } catch (e) {
    next(e.message)
  }
})

usersRouter.get("/:id", async (req, res, next) => {
  try {
    id = req.params.id
    const user = await getUserById(id)
    res.send(user)
  } catch (e) {
    next(e.message)
  }
})

usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const { username } = req.body
    const user = await updateUser(id, username)
    console.log(user)
    res.send(user)
  } catch (e) {
    next(e.message)
  }
})
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const deletion = await deleteUser(id)
    res.send(deletion)
  } catch (e) {
    next(e.message)
  }
})

// usersRouter.post("/create", async (req, res, next) => {
//   try {
//     const { username, password } = req.body
//     const user = await createUser(username, password)
//     res.send(user)
//   } catch (e) {
//     next(e.message)
//   }
// })

module.exports = usersRouter
