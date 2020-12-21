const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { validateSchema } = require("graphql");
const mongoose = require("mongoose");
const { v1: uuid } = require("uuid");
const Author = require("./models/author");
const Book = require("./models/book");

const password = "g5sFaeVKeS7P0ARl";

const MONGODB_URI = `mongodb://bob:${password}@cluster0-shard-00-00.lwaad.mongodb.net:27017,cluster0-shard-00-01.lwaad.mongodb.net:27017,cluster0-shard-00-02.lwaad.mongodb.net:27017/library?ssl=true&replicaSet=atlas-x5tr1g-shard-0&authSource=admin&retryWrites=true&w=majority`;

console.log("connecting to", MONGODB_URI);

const tryAllAuthors = async () => {
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
    //tryAllAuthors();
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`;

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
  },
  Mutation: {
    addBook: async (root, args) => {
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
        //fix author
        return await book.populate("author").execPopulate();
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },
    editAuthor: async (root, args) => {
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
      {
        favoriteGenre, username;
      }
    },
    // login (root, args) => {

    // }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
