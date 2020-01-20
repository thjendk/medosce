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
      // Find parameter
      const parameter = await Parameters.query().findById(id);
      if (!parameter) throw new Error('Parameter not found');

      // Joins
      if (data.categoryIds) {
        await ParametersCategories.updateRelations(parameter.parameterId, data.categoryIds);
        delete data.categoryIds;
      }

      // Update parameter without joins
      await parameter
        .$query()
        .updateAndFetch(data)
        .skipUndefined();
      return { id: parameter.parameterId };
    }
  }
};
