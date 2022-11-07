import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { UserType } from './schemaModels';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    currentUser: {
      type: UserType,
      args: {
        userId: { type: GraphQLID }
      },
      async resolve(parent, args, context) {}
    }
  })
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({})
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType
});
