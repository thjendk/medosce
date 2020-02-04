import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Categories from 'models/categories.model';
import CategoriesQuestionType from 'models/categoriesQuestionType.model';
import ParametersCategories from 'models/parametersCategories.model';

export const typeDefs = gql`
  type Category {
    id: Int
    name: String
    iconName: String
    parameters: [Parameter]
    questionTypes: [QuestionType]
  }

  extend type Query {
    categories: [Category]
  }

  extend type Mutation {
    createCategory(data: CategoryInput): Category
  }

  input CategoryInput {
    name: String
    iconName: String
  }
`;

export const resolvers = {
  Category: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const category = await ctx.categoryLoader.load(id);
      return category.name;
    },
    iconName: async ({ id }, _, ctx: Context) => {
      const category = await ctx.categoryLoader.load(id);
      return category.iconName;
    },
    parameters: async ({ id }, _, ctx: Context) => {
      const parameters = await ParametersCategories.query().where({ categoryId: id });
      return parameters.map((parameter) => ({ id: parameter.parameterId }));
    },
    questionTypes: async ({ id }, _, ctx: Context) => {
      const joins = await CategoriesQuestionType.query().where({ categoryId: id });
      return joins.map((join) => ({ id: join.questionTypeId }));
    }
  },

  Query: {
    categories: async () => {
      const categories = await Categories.query().orderBy('name');
      return categories.map((category) => ({ id: category.categoryId }));
    }
  },

  Mutation: {
    createCategory: async (root, { data }) => {
      const category = await Categories.query().insertAndFetch(data);
      return { id: category.categoryId };
    }
  }
};
