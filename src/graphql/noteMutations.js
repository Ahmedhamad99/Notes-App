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
import  {User}  from "../../DB/models/User/User.model.js";
import AppError from "../utils/AppError.js";
import NoteType from "./types/NoteType.js"


export const createNote = {
  type: NoteType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
  },
  resolve: async (_, { title, content }, context) => {
    if (!context.user) throw new AppError("Unauthorized",401);

    const note = await Note.create({
      title,
      content,
      ownerId: context.user.sub,
    });

    return note;
  },
};
// updatenote
export const updateNote = {
  type: NoteType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  resolve: async (_, { id, title, content }, context) => {
    if (!context.user) throw new AppError("Unauthorized",401);

    const note = await Note.findOneAndUpdate(
      { _id: id, ownerId: context.user.sub },
      { title, content },
      { new: true }
    );

    if (!note) throw new AppError("Note not found or not authorized", 404);
    return note;
  },
};


//deletenote
export const deleteNote = {
  type: GraphQLString,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_, { id }, context) => {
    if (!context.user) throw new AppError("Unauthorized", 401);

    const note = await Note.findOneAndDelete({
      _id: id,
      ownerId: context.user.sub,
    });

    if (!note) throw new AppError("Note not found or not authorized", 404);
    return "Note deleted successfully";
  },
};