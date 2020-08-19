const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./person");

morgan.token("something", (req) => req.data);
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use((req, res, next) => {
  req.something = JSON.stringify(req.body);
  next();
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :something"
  )
);

app.get("/persons", (req, res) => {
  Person.find({}).then((response) => {
    res.json(response);
  });
});
app.post("/persons", (request, response, next) => {
  const person = new Person(request.body);

  person
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
      //response.status(400).send(error);
    });
});

app.get("/info", (req, res) => {
  const d = new Date();
  Person.countDocuments({}).then((response) => {
    res.send(`Phonebook has ${response} people <br> ${d.toLocaleString()}`);
  });
});

app.get("/persons/:id", (req, res, next) => {
  Person.findOne({ _id: req.params.id })
    .then((response) => (response ? res.json(response) : res.status(404).end()))
    .catch((error) => next(error));
});

app.delete("/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/persons/:id", (req, res, next) => {
  Person.findOneAndReplace({ _id: req.params.id }, req.body)
    .then(() => res.status(200).end())
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send(error.message);
  }

  next(error);
};
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
