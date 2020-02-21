import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/schema';
import jwt from 'jsonwebtoken';
import Express from 'express';
import User from 'models/user.model';
import { userLoader } from 'graphql/dataloaders/userLoaders';
import { stationLoader } from 'graphql/dataloaders/stationLoaders';
import { roleLoader } from 'graphql/dataloaders/roleLoaders';
import { questionsLoader, questionAnswerLoader } from 'graphql/dataloaders/questionLoaders';
import { parametersLoader } from 'graphql/dataloaders/parameterLoaders';
import { examSetLoader } from 'graphql/dataloaders/examSetLoaders';
const secret = process.env.SECRET || '';

const getUserFromCookie = (req: Express.Request) => {
  const token = req.cookies?.user;

  if (token) {
    try {
      return jwt.verify(token, secret) as User;
    } catch (error) {
      return null;
    }
  }

  // If no user is logged in, user is null
  return null;
};

const generateContext = (req: Express.Request, res: Express.Response) => ({
  userLoader: userLoader(),
  stationLoader: stationLoader(),
  roleLoader: roleLoader(),
  questionsLoader: questionsLoader(),
  questionAnswerLoader: questionAnswerLoader(),
  parametersLoader: parametersLoader(),
  examSetLoader: examSetLoader(),
  user: getUserFromCookie(req),
  res,
  req
});

export type Context = ReturnType<typeof generateContext>;

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => generateContext(req, res)
});
