import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import QuestionParameters from 'models/questionParameters.model';
import Questions from 'models/questions.model';
import QuestionsQuestionType from 'models/questionsQuestionType.model';

export const typeDefs = gql`
  type Question {
    id: String
    questionNumber: Int
    text: String
    station: Station
    parameters: [QuestionParameter]
    questionTypes: [QuestionType]
  }

  type QuestionParameter {
    id: String
    value: String
    point: Float
    parameter: Parameter
  }

  extend type Query {
    questions: [Question]
  }

  extend type Mutation {
    createQuestion(data: QuestionInput): Question
    createQuestionParameter(data: QuestionParameterInput): Question
    deleteQuestionParameter(id: String): Question
  }

  input QuestionInput {
    stationId: String
    text: String
    questionNumber: Int
  }

  input QuestionParameterInput {
    questionId: String
    parameterId: String
    value: String
    point: Float
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
    station: async ({ id }, _, ctx: Context) => {
      const question = await ctx.questionsLoader.load(id);
      return { id: question.stationId };
    },
    parameters: async ({ id }, _, ctx: Context) => {
      const parameters = await QuestionParameters.query().where({ questionId: id });
      return parameters.map((questionParameter) => ({
        id: questionParameter.questionParameterId,
        value: questionParameter.value,
        point: questionParameter.point,
        parameter: { id: questionParameter.parameterId }
      }));
    },
    questionTypes: async ({ id }) => {
      const joins = await QuestionsQuestionType.query().where({ questionId: id });
      return joins.map((join) => ({ id: join.questionTypeId }));
    }
  },

  Query: {
    questions: async () => {
      const questions = await Questions.query();
      return questions.map((question) => ({ id: question.questionId }));
    }
  },

  Mutation: {
    createQuestion: async (root, { data }) => {
      const question = await Questions.query().insertAndFetch(data);
      return { id: question.questionId };
    },
    createQuestionParameter: async (root, { data }) => {
      const questionParameter = await QuestionParameters.query().insertAndFetch(data);
      return { id: questionParameter.questionId };
    },
    deleteQuestionParameter: async (root, { id }) => {
      const questionParameter = await QuestionParameters.query().findById(id);
      await questionParameter.$query().delete();
      return { id: questionParameter.questionId };
    }
  }
};
