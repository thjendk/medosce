import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import QuestionAnswer from 'models/questionAnswer.model';
import Questions from 'models/questions.model';
import QuestionAnswerParameterVote from 'models/questionAnswerParameterVote';

export const typeDefs = gql`
  type Question {
    id: Int
    questionNumber: Int
    text: String
    station: Station
    answers: [QuestionAnswer]
  }

  type QuestionAnswer {
    id: Int
    value: String
    point: Float
    votes: [ParameterVote]
    parameters: [Parameter]
  }

  extend type Query {
    questions: [Question]
  }

  extend type Mutation {
    createQuestion(data: QuestionInput): Question
    updateQuestion(id: Int, data: QuestionInput): Question
    createQuestionAnswer(data: QuestionAnswerInput): Question
    deleteQuestionAnswer(id: Int): Question
  }

  input QuestionInput {
    stationId: Int
    text: String
    questionNumber: Int
    questionTypeIds: [Int]
  }

  input QuestionAnswerInput {
    questionId: Int
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
    answers: async ({ id }, _, ctx: Context) => {
      const answers = await QuestionAnswer.query().where({ questionId: id });
      return answers.map((answer) => ({ id: answer.questionAnswerId }));
    }
  },

  QuestionAnswer: {
    id: ({ id }) => id,
    value: async ({ id }, _, ctx: Context) => {
      const questionAnswer = await ctx.questionAnswerLoader.load(id);
      return questionAnswer.value;
    },
    point: async ({ id }, _, ctx: Context) => {
      const questionAnswer = await ctx.questionAnswerLoader.load(id);
      return questionAnswer.point;
    },
    votes: async ({ id }, _, ctx: Context) => {
      const votes = await QuestionAnswerParameterVote.query().where({ questionAnswerId: id });
      return votes.map((vote) => ({
        parameter: { id: vote.parameterId },
        user: { id: vote.userId },
        vote: vote.vote
      }));
    },
    parameters: async ({ id }, _, ctx: Context) => {
      const votes = await QuestionAnswerParameterVote.query()
        .where({ questionAnswerId: id })
        .groupBy('parameterId')
        .sum('vote as sum')
        .having('sum', '>', '-1')
        .orderBy('sum', 'desc')
        .select('parameterId');
      return votes.map((vote) => ({ id: vote.parameterId }));
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
    updateQuestion: async (root, { id, data }) => {
      const question = await Questions.query().updateAndFetchById(id, data);
      return { id: question.questionId };
    },
    createQuestionAnswer: async (root, { data }) => {
      const questionAnswer = await QuestionAnswer.query().insertAndFetch(data);
      return { id: questionAnswer.questionId };
    },
    deleteQuestionAnswer: async (root, { id }) => {
      const questionAnswer = await QuestionAnswer.query().findById(id);
      await questionAnswer.$query().delete();
      return { id: questionAnswer.questionId };
    }
  }
};
