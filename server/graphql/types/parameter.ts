import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  type Parameter {
    id: String
    name: String
    category: Category
  }
`;

export const resolvers = {
  Parameter: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return parameter.name;
    },
    category: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return { id: parameter.categoryId };
    }
  }
};
