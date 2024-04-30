const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { Client } = require("pg")
const externalConnectionString = process.env.RENDER_EXTERNAL_POSTGRESQL_URL

// Create a PostgreSQL client
const client = new Client({
  connectionString: externalConnectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
})
// Register a new instructor account
router.post("/register", async (req, res, next) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [req.body.username, req.body.password]
    )

    // Create a token with the instructor id
    const token = jwt.sign({ id: users.id }, process.env.JWT_SECRET)

    res.status(201).send({ token })
  } catch (error) {
    next(error)
  }
})

// Login to an existing instructor account
router.post("/login", async (req, res, next) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [req.body.username, req.body.password]
    )

    if (!users) {
      return res.status(401).send("Invalid login credentials.")
    }
    const token = jwt.sign({ id: users.id }, process.env.JWT_SECRET)

    res.send({ token })
  } catch (error) {
    next(error)
  }
})

module.exports = router
