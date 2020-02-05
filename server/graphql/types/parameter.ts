import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Parameters from 'models/parameters.model';
import QuestionAnswerParameterVote from 'models/questionAnswerParameterVote';
import QuestionAnswer from 'models/questionAnswer.model';

export const typeDefs = gql`
  type Parameter {
    id: Int
    name: String
    parent: Parameter
  }

  extend type Query {
    parameters: [Parameter]
  }

  extend type Mutation {
    createParameter(data: ParameterInput): Parameter
    updateParameter(id: Int, data: ParameterInput): Parameter
    createOrUpdateParameterVote(data: ParameterVoteInput): Question
  }

  input ParameterInput {
    name: String
    categoryIds: [Int]
  }

  type ParameterVote {
    parameter: Parameter
    user: User
    vote: Int
  }

  input ParameterVoteInput {
    questionAnswerId: Int
    parameterId: Int
    vote: Int
  }
`;

export const resolvers = {
  Parameter: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return parameter.name;
    },
    parent: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return { id: parameter.parentId };
    }
  },

  Query: {
    parameters: async () => {
      const parameters = await Parameters.query().orderBy('name');
      return parameters.map((parameter) => ({ id: parameter.parameterId }));
    }
  },

  Mutation: {
    createParameter: async (root, { data }) => {
      const parameter = await Parameters.query().insertAndFetch({ name: data.name });
      return { id: parameter.parameterId };
    },
    updateParameter: async (root, { id, data }) => {
      const parameter = await Parameters.query().updateAndFetchById(id, data);
      return { id: parameter.parameterId };
    },
    createOrUpdateParameterVote: async (root, { data }, ctx: Context) => {
      const { parameterId, questionAnswerId, vote } = data;
      const questionAnswer = await QuestionAnswer.query().findOne({ questionAnswerId });
      await QuestionAnswerParameterVote.query().insertAndFetch({
        questionAnswerId,
        parameterId,
        vote,
        userId: ctx.user.userId
      });
      ctx.questionsLoader.clear(questionAnswer.questionId);
      return { id: questionAnswer.questionId };
    }
  }
};
