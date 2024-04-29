const { Client } = require("pg")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const client = new Client({
  user: "beer_w4r7_user", // Username
  host: "dpg-coo2tfv79t8c73b554dg-a.oregon-postgres.render.com", // Hostname
  database: "beer_w4r7", // Database name
  password: "fIgy4lHt1zZJL6JLpC3Whp9SgOVtTyYz", // Password
  port: 5432, // Port
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
})

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => {
    console.log("Connected to the database")
  })
  .catch(err => {
    console.error("Error connecting to the database:", err)
  })

//beer queries
const getAllBeers = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM beers
      ;
    `)
    return rows
  } catch (e) {
    console.error("Error fetching beers:", e.message)
    throw e
  }
}
const getBeerById = async id => {
  try {
    const { rows } = await client.query(
      `
    SELECT * FROM beers WHERE id = $1;
    `,
      [id]
    )
    return rows
  } catch (e) {
    throw new Error("Error fetching beer by id:", e.message)
  }
}

const createBeer = async (name, type, cost, isavailable) => {
  try {
    const {
      rows: [beers],
    } = await client.query(
      `INSERT INTO beers (name, type, cost, isavailable)
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [name, type, cost, isavailable]
    )
    return beers
  } catch (e) {
    throw new Error(`Error creating beer: ${e.message}`)
  }
}

const updateBeer = async (id, name, type, cost, isavailable) => {
  try {
    const {
      rows: [beers],
    } = await client.query(
      `UPDATE beers
      SET name = $2, type = $3, cost = $4, isavailable = $5
      WHERE id =$1
       RETURNING *;`,
      [id, name, type, cost, isavailable]
    )
    return beers
  } catch (e) {
    throw new Error(`Error creating beer: ${e.message}`)
  }
}

const deleteBeer = async id => {
  try {
    const {
      rows: [beers],
    } = await client.query(
      `
      DELETE FROM beers WHERE id = $1;
      `,
      [id]
    )
  } catch (e) {
    throw new Error(`Error deleting beer: ${e.message}`)
  }
}

//User queries
const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM users;`)
    return rows
  } catch (err) {
    console.log(err.message)
    throw err
  }
}
const getUserById = async () => {
  try {
    const { rows } = await client.query(
      `
    SELECT * FROM users WHERE id = $1;
    `,
      [id]
    )
    return rows
  } catch (e) {
    throw new Error("Error fetching user by id:", e.message)
  }
}

const createUser = async (username, password) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING *;`,
      [username, password]
    )
    return users
  } catch (err) {
    console.log(err.message)
  }
}

const updateUser = async (id, username) => {
  console.log(id, username)
  try {
    const {
      rows: [users],
    } = await client.query(
      `UPDATE users
      SET username = $2
      WHERE id =$1
       RETURNING *;`,
      [id, username]
    )
    console.log(users)
    return users
  } catch (e) {
    throw new Error(`Error creating user: ${e.message}`)
  }
}

const deleteUser = async id => {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
      DELETE FROM users WHERE id = $1;
      `,
      [id]
    )
  } catch (e) {
    throw new Error(`Error deleting user: ${e.message}`)
  }
}

const loginUser = async (email, password) => {
  try {
    const user = await user.findOne({ email })
    if (!user) {
      throw new Error("User not found")
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new Error("Invalid password")
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    return token
  } catch (error) {
    throw new Error(`Login error: ${error.message}`)
  }
}

module.exports = {
  client,
  getAllBeers,
  getBeerById,
  createBeer,
  updateBeer,
  deleteBeer,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  deleteBeer,
  loginUser,
}
