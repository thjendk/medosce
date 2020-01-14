import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  type Category {
    id: ID
    name: String
  }
`;

export const resolvers = {
  Category: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const category = await ctx.categoryLoader.load(id);
      return category.name;
    }
  }
};
