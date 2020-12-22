const mongoose = require("mongoose");

// type User {
//   username: String!
//   favoriteGenre: String!
//   id: ID!
// }

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", schema);
