import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import ExamSets from 'models/examSetsModel';

export const typeDefs = gql`
  type ExamSet {
    id: ID
    season: String
    year: Int
  }

  extend type Query {
    examSets: [ExamSet]
  }

  extend type Mutation {
    createExamSet(data: ExamSetInput): ExamSet
  }

  input ExamSetInput {
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
  },

  Query: {
    examSets: async () => {
      const examSets = await ExamSets.query();
      return examSets.map((examSet) => ({ id: examSet.examSetId }));
    }
  },

  Mutation: {
    createExamSet: async (root, { data }) => {
      const examSet = await ExamSets.query().insertAndFetch(data);
      return { id: examSet.examSetId };
    }
  }
};
