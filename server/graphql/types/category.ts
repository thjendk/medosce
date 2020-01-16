import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Parameters from 'models/parametersModel';
import Categories from 'models/categoriesModel';

export const typeDefs = gql`
  type Category {
    id: ID
    name: String
    iconName: String
    parameters: [Parameter]
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
      const parameters = await Parameters.query()
        .where({ categoryId: id })
        .orderBy('name');
      return parameters.map((parameter) => ({ id: parameter.parameterId }));
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
