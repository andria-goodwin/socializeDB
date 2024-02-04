// Imports
const { User } = require("../models");
const connection = require("../config/connection");

// Seed data
const users = [
  {
    username: "Finn",
    email: "finn@adventure.net"
  },
  {
    username: "Jake",
    email: "jake@adventure.net"
  },
  {
    username: "Peebles",
    email: "pb@adventure.net"
  },
  {
    username: "Marcie",
    email: "vampqueen@adventure.net"
  },
];

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing students
  await User.deleteMany({});

  // Adds seed data to database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});