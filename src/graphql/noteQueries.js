import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
   GraphQLNonNull
} from "graphql";
import  Note  from "../../DB/models/Note/Note.model.js";
import AppError from "../utils/AppError.js";
import NoteType from "./types/NoteType.js"
import UserType from "./types/UserType.js"




// Root Query
export  const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    notes: {
      type: new GraphQLList(NoteType),
      args: {
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        skip: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        let query = {};

        if (args.userId) query.ownerId = args.userId;
        if (args.title) query.title = { $regex: args.title, $options: "i" };

        return await Note.find(query)
          .skip(args.skip || 0)
          .limit(args.limit || 10)
          .sort({ createdAt: -1 });
      },
    },
     note: {
      type: NoteType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args, context) => {
        if (!context.user) throw new AppError ("Unauthorized", 401);
        return await Note.findOne({
          _id: args.id,
          ownerId: context.user.sub
        });
      }
    }
  },
 
  
});
