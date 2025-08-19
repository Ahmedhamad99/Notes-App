import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import  UserType  from "./UserType.js";
import { User } from "../../../DB/models/User/User.model.js";

const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    owner: {
      type: UserType,
      resolve: async (parent) => {
        return await User.findById(parent.ownerId);
      },
    },
    createdAt: { type: GraphQLString },
  }),
});

export default NoteType;