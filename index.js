const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const config = require("./config/key");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typedefs");

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
