const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { validateSchema } = require("graphql");
const mongoose = require("mongoose");
const { v1: uuid } = require("uuid");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const typeDefs = require("./schema");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "NINO_NAKANO_BEST_GIRL";

const password = "g5sFaeVKeS7P0ARl";

const MONGODB_URI = `mongodb://bob:${password}@cluster0-shard-00-00.lwaad.mongodb.net:27017,cluster0-shard-00-01.lwaad.mongodb.net:27017,cluster0-shard-00-02.lwaad.mongodb.net:27017/library?ssl=true&replicaSet=atlas-x5tr1g-shard-0&authSource=admin&retryWrites=true&w=majority`;

//console.log("connecting to", MONGODB_URI);

const tryMongoDb = async () => {
  // try and populate the author subfield

  someData = await Book.find({}).populate("author");
  console.log(someData);
};

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    //tryMongoDb();
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: (root, args) =>
      args.genres
        ? //fix casing
          Book.find({ genres: { $in: args.genres } }).populate("author")
        : Book.find({}).populate("author"),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.validUser) throw new AuthenticationError("user not valid");
      try {
        let author = await Author.findOne({ name: args.author });
        let authorId = null;
        if (author === null) {
          const author = new Author({ name: args.author });
          const res = await author.save();
          authorId = res._id;
        } else {
          authorId = author._id;
        }
        const toSave = { ...args, author: authorId };
        const book = new Book(toSave);
        await book.save();
        return await book.populate("author").execPopulate();
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.validUser) throw new AuthenticationError("user not valid");
      try {
        const author = await Author.findOne({ name: args.name });
        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },
    createUser: async (root, args) => {
      try {
        user = new User(args);
        await user.save();
        return user;
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (user == null) throw new UserInputError("user does not exist");
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
