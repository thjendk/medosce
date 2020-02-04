import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import ExamSets from 'models/examSets.model';
import Stations from 'models/stations.model';

export const typeDefs = gql`
  type ExamSet {
    id: Int
    season: String
    year: Int
    stations: [Station]
  }

  extend type Query {
    examSets: [ExamSet]
  }

  extend type Mutation {
    createExamSet(data: ExamSetInput): ExamSet
  }

  input ExamSetInput {
    season: String
    year: String
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
    },
    stations: async ({ id }, _, ctx: Context) => {
      const stations = await Stations.query().where({ examSetId: id });
      return stations.map((station) => ({ id: station.stationId }));
    }
  },

  Query: {
    examSets: async () => {
      const examSets = await ExamSets.query();
      return examSets.map((examSet) => ({ id: examSet.examSetId }));
    }
  },

  Mutation: {
    createExamSet: async (root, { data }, ctx: Context) => {
      if (ctx.user?.roleId !== (1 as any)) throw new Error('Not permitted');
      const examSet = await ExamSets.query().insertAndFetch(data);
      return { id: examSet.examSetId };
    }
  }
};
