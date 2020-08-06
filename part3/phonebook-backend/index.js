const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let people = [
  {
    id: 1,
    name: "bruh",
    number: "124345",
  },
];
morgan.token("data", (req, res) => req.data);
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.data = JSON.stringify(req.body);
  next();
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/", (req, res) => {
  res.send("<h1>Hello chicken!</h1>");
});

app.post("/persons", (request, response) => {
  const { name, number } = request.body;
  //check name or number is missing and respond with error if true
  if (!name || !number) {
    return response.status(400).json({
      error: "missing attribute",
    });
  } else if (
    //check if number already in phonebook
    people.map((person) => person.number).includes(number)
  ) {
    return response.status(400).json({
      error: "number already in phonebook",
    });
  } else {
    //take the request body, add an id and append it to people

    const person = { id: Math.floor(Math.random() * 10000), ...request.body };
    people = [...people, person];
    response.json(person);
  }
});

app.get("/persons", (req, res) => {
  res.json(people);
});

app.get("/api/info", (req, res) => {
  const d = new Date();
  res.send(
    `<div>Phonebook has ${
      people.length
    } people </div> <div> ${d.toLocaleString()}</div>`
  );
});

app.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);
  if (!!person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
