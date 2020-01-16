import { gql } from 'apollo-server-express';
import { Context } from 'config/apolloServer';
import Parameters from 'models/parametersModel';

export const typeDefs = gql`
  type Parameter {
    id: String
    name: String
  }

  extend type Query {
    parameters: [Parameter]
  }

  extend type Mutation {
    createParameter(data: ParameterInput): Parameter
  }

  input ParameterInput {
    name: String
    categoryId: String
  }
`;

export const resolvers = {
  Parameter: {
    id: ({ id }) => id,
    name: async ({ id }, _, ctx: Context) => {
      const parameter = await ctx.parametersLoader.load(id);
      return parameter.name;
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
      const parameter = await Parameters.query().insertAndFetch(data);
      return { id: parameter.parameterId };
    }
  }
};
