import { GraphQLSchema, GraphQLObjectType } from "graphql";

import { createNote, updateNote, deleteNote } from "./noteMutations.js";

import {RootQuery} from "./noteQueries.js"



const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createNote,
    updateNote,
    deleteNote,
  },
});


export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
