import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Parameters from 'models/parameters.model';
import ParametersCategories from 'models/parametersCategories.model';

export const typeDefs = gql`
  type Parameter {
    id: String
    name: String
    categories: [Category]
  }

  extend type Query {
    parameters: [Parameter]
  }

  extend type Mutation {
    createParameter(data: ParameterInput): Parameter
    updateParameter(id: String, data: ParameterInput): Parameter
  }

  input ParameterInput {
    name: String
    categoryIds: [String]
  }
`;

export const resolvers = {
  Parameter: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return parameter.name;
    },
    categories: async ({ id }) => {
      const categories = await ParametersCategories.query().where({ parameterId: id });
      return categories.map((category) => ({ id: category.categoryId }));
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
      const parameter = await Parameters.query().findById(id);
      if (!parameter) throw new Error('Parameter not found');
      const joins = data.categoryIds.map((categoryId) => ({ parameterId: id, categoryId }));
      await ParametersCategories.query().insertGraph(joins);
      delete data.categoryIds;
      const updatedParameter = await parameter.$query().updateAndFetch(data);
      return { id: updatedParameter.parameterId };
    }
  }
};
