import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  type ExamSet {
    id: ID
    season: String
    year: Int
  }
`;

export const resolvers = {
  ExamSet: {
    id: ({ id }) => id,
    season: async ({ id }, _, ctx: Context) => {
      const examSet = await ctx.examSetLoader.load(id);
      return examSet.season;
    },
    year: async ({ id }, _, ctx: Context) => {
      const examSet = await ctx.examSetLoader.load(id);
      return examSet.year;
    }
  }
};
