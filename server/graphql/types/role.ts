import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  type Role {
    id: ID
    name: String
  }
`;

export const resolvers = {
  Role: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const role = await ctx.roleLoader.load(id);
      return role.name;
    }
  }
};
