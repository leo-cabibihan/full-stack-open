const mongoose = require("mongoose");

const url = `mongodb+srv://bob:${process.argv[2]}@cluster0.nlxiy.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number}`);
    mongoose.connection.close();
  });
}
