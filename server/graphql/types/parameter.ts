import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Parameters from 'models/parameters.model';
import QuestionAnswerParameterVote from 'models/questionAnswerParameterVote';
import QuestionAnswer from 'models/questionAnswer.model';
import ParameterSuggestion from 'models/parameterSuggestion.model';

export const typeDefs = gql`
  type Parameter {
    id: Int
    name: String
    parent: Parameter
    isForcedSubMenu: Boolean
  }

  extend type Query {
    parameters: [Parameter]
    parameterCount: Int
  }

  extend type Mutation {
    createParameter(data: ParameterInput): Parameter
    updateParameter(id: Int, data: ParameterInput): Parameter
    createOrUpdateParameterVote(data: ParameterVoteInput): Question
    suggestParameter(data: ParameterInput): String
  }

  input ParameterInput {
    name: String
    parentId: Int
    isForcedSubMenu: Boolean
  }

  type ParameterVote {
    questionAnswer: QuestionAnswer
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
    },
    isForcedSubMenu: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return !!parameter.isForcedSubMenu;
    }
  },

  Query: {
    parameters: async () => {
      const parameters = await Parameters.query().orderBy('name');
      return parameters.map((parameter) => ({ id: parameter.parameterId }));
    },
    parameterCount: async () => {
      const count: any = await Parameters.query()
        .count()
        .first();
      return count['count(*)'];
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
      const userId = ctx.user.userId;
      const exists = await QuestionAnswerParameterVote.query().findOne({
        questionAnswerId,
        parameterId,
        userId
      });

      if (exists) {
        await exists.$query().update({
          vote
        });
      } else {
        await QuestionAnswerParameterVote.query().insert({
          questionAnswerId,
          parameterId,
          vote,
          userId
        });
      }

      const questionAnswer = await QuestionAnswer.query().findOne({ questionAnswerId });
      return { id: questionAnswer.questionId };
    },
    suggestParameter: async (root, { data }, ctx: Context) => {
      if (ctx.user.roleId === 1) {
        await Parameters.query().insert({
          name: data.name,
          parentId: data.parentId,
          isForcedSubMenu: data.isForcedSubMenu ? 1 : 0
        });
      } else {
        await ParameterSuggestion.query().insert({
          name: data.name,
          parentId: data.parentId,
          userId: ctx.user.userId,
          isForcedSubMenu: data.isForcedSubMenu ? 1 : 0
        });
      }

      return 'Parameter has been suggested';
    }
  }
};
