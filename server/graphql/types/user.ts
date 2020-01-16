import { gql } from 'apollo-server-express';
import User from '../../models/userModel';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    role: Role
  }

  extend type Query {
    user: User
    login(data: UserInput): String
    logout: String
  }

  extend type Mutation {
    createUser(data: UserInput): String
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
  }
`;

export const resolvers = {
  User: {
    id: ({ id }) => id,
    username: async ({ id }, _, ctx: Context) => {
      const user = await ctx.userLoader.load(id);
      return user.username;
    },
    email: async ({ id }, _, ctx: Context) => {
      const user = await ctx.userLoader.load(id);
      return user.email;
    },
    role: async ({ id }, _, ctx: Context) => {
      const user = await ctx.userLoader.load(id);
      return { id: user.roleId };
    }
  },

  Query: {
    user: async (obj, args, ctx: Context, info) => {
      if (!ctx.user) return null;

      const user = await User.query().findById(ctx.user.userId);
      return { id: user?.userId };
    },
    login: async (obj, { data }, ctx: Context, info) => {
      const user = await User.query().findOne({ username: data.username });
      const isValid = await user.verify(data.password);

      if (isValid) {
        const token = user.signToken();
        ctx.res.cookie('user', token);
        return 'Signed in';
      } else {
        throw new Error('Incorrect username or password');
      }
    },
    logout: (root, args, ctx: Context) => {
      ctx.res.cookie('user', {}, { expires: new Date(0) });
      return 'Logged out';
    }
  },

  Mutation: {
    createUser: async (obj, { data }, ctx: Context, info) => {
      const newUser = await User.query().insertAndFetch(data);

      const token = newUser.signToken();
      ctx.res.cookie('user', token);
      return 'Created user and signed in';
    }
  }
};
