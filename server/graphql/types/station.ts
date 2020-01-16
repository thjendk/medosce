import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Questions from 'models/questionsModel';
import Stations from 'models/stationsModel';

export const typeDefs = gql`
  type Station {
    id: String
    intro: String
    globalScore: Int
    stationNumber: Int
    examSet: ExamSet
    questions: [Question]
  }

  extend type Query {
    stations(filter: StationFilterInput): [Station]
  }

  input StationFilterInput {
    examSetId: Int
  }

  extend type Mutation {
    createStation(data: StationInput): Station
  }

  input StationInput {
    intro: String
    globalScore: Int
    stationNumber: Int
    examSetId: String
  }
`;

export const resolvers = {
  Station: {
    id: ({ id }) => id,
    intro: async ({ id }, _, ctx: Context) => {
      const station = await ctx.stationLoader.load(id);
      return station.intro;
    },
    globalScore: async ({ id }, _, ctx: Context) => {
      const station = await ctx.stationLoader.load(id);
      return station.globalScore;
    },
    stationNumber: async ({ id }, _, ctx: Context) => {
      const station = await ctx.stationLoader.load(id);
      return station.stationNumber;
    },
    examSet: async ({ id }, _, ctx: Context) => {
      const station = await ctx.stationLoader.load(id);
      return { id: station.examSetId };
    },
    questions: async ({ id }, _, ctx: Context) => {
      const questions = await Questions.query().where({ stationId: id });
      return questions.map((question) => ({ id: question.questionId }));
    }
  },

  Query: {
    stations: async () => {
      const stations = await Stations.query();
      return stations.map((station) => ({ id: station.stationId }));
    }
  },

  Mutation: async (root, { data }) => {
    const station = await Stations.query().insertAndFetch(data);
    return { id: station.stationId };
  }
};
