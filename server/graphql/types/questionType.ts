import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import CategoriesQuestionType from 'models/categoriesQuestionType.model';

export const typeDefs = gql`
  type QuestionType {
    id: String
    name: String
    categories: [Category]
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
  }
};
