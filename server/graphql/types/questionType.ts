import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import CategoriesQuestionType from 'models/categoriesQuestionType.model';
import QuestionType from 'models/questionTypes.model';

export const typeDefs = gql`
  type QuestionType {
    id: Int
    name: String
    categories: [Category]
  }

  extend type Query {
    questionTypes: [QuestionType]
  }
`;

export const resolvers = {
  QuestionType: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const questionType = await ctx.questionTypeLoader.load(id);
      return questionType.name;
    },
    categories: async ({ id }) => {
      const categories = await CategoriesQuestionType.query().where({ questionTypeId: id });
      return categories.map((category) => ({ id: category.categoryId }));
    }
  },

  Query: {
    questionTypes: async () => {
      const questionTypes = await QuestionType.query();
      return questionTypes.map((questionType) => ({ id: questionType.questionTypeId }));
    }
  }
};
