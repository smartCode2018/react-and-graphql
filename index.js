const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const config = require("./config/key");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typedefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const connect = mongoose
  .connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  })
  .catch((err) => console.log(err));
