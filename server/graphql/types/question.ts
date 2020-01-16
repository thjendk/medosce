import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import QuestionParameters from 'models/questionParametersModel';
import Questions from 'models/questionsModel';

export const typeDefs = gql`
  type Question {
    id: String
    questionNumber: Int
    text: String
    parameters: [Parameter]
  }

  extend type Parameter {
    value: String
    point: Float
  }

  extend type Mutation {
    createQuestion(data: QuestionInput): Station
  }

  input QuestionInput {
    stationId: String
    text: String
    questionNumber: Int
  }
`;

export const resolvers = {
  Question: {
    id: ({ id }) => id,
    questionNumber: async ({ id }, _, ctx: Context) => {
      const question = await ctx.questionsLoader.load(id);
      return question.questionNumber;
    },
    text: async ({ id }, _, ctx: Context) => {
      const question = await ctx.questionsLoader.load(id);
      return question.text;
    },
    parameters: async ({ id }, _, ctx: Context) => {
      const parameters = await QuestionParameters.query().where({ questionId: id });
      return parameters.map((parameter) => ({
        id: parameter.parameterId,
        value: parameter.value,
        point: parameter.point
      }));
    }
  },

  Mutation: {
    createQuestion: async (root, { data }) => {
      const question = await Questions.query().insertAndFetch(data);
      return { id: question.stationId };
    }
  }
};
