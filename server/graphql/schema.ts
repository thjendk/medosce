import { gql } from 'apollo-server-express';
import { typeDefs as User, resolvers as userResolvers } from './types/user';
import { typeDefs as Category, resolvers as categoryResolvers } from './types/category';
import { typeDefs as Parameter, resolvers as parameterResolvers } from './types/parameter';
import { typeDefs as Question, resolvers as questionResolvers } from './types/question';
import { typeDefs as ExamSet, resolvers as examSetResolvers } from './types/examSet';
import { typeDefs as Station, resolvers as stationResolvers } from './types/station';
import { typeDefs as Role, resolvers as roleResolvers } from './types/role';
import { typeDefs as QuestionType, resolvers as questionTypeResolvers } from './types/questionType';

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  Query,
  User,
  Category,
  Parameter,
  Question,
  ExamSet,
  Station,
  Role,
  QuestionType
];
export const resolvers = [
  userResolvers,
  categoryResolvers,
  parameterResolvers,
  questionResolvers,
  examSetResolvers,
  stationResolvers,
  roleResolvers,
  questionTypeResolvers
];
