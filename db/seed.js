const { client } = require("./index")
const { createBeer, createUser } = require("./index")
//DROP TABLES
const dropTables = async () => {
  try {
    console.log("STARTING TO DROP TABLES...")
    // await client.query("DROP TABLE IF EXISTS users_beers")
    await client.query("DROP TABLE IF EXISTS users")
    await client.query("DROP TABLE IF EXISTS beers")
  } catch (err) {
    console.log(err.message)
  }
}

// CREATE TABLES
const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE beers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      cost INTEGER NOT NULL,
      isavailable BOOLEAN NOT NULL
    );
  `)

    await client.query(`
    CREATE TABLE users (
      Id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );

  `)
  } catch (err) {
    console.log(err.message)
  }
}

const rebuildDB = async () => {
  try {
    await dropTables()
    console.log("DROPPED TABLES COMPLETED")
    await createTables()
    console.log("CREATED TABLES COMPLETED")
    await createBeer("Shiner", "Dark", 7, true)
    await createBeer("Corona", "Light", 5, true)
    console.log("CREATED BEERS")
    await createUser("nico43", "12345")
    console.log("CREATED USER")
    client.end()
  } catch (err) {
    console.log(err.message)
  }
}

rebuildDB()
