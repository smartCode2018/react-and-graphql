const postResolver = require("./posts");
const userResolver = require("./users");
const commentResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postResolver.Subscription,
  },
};
