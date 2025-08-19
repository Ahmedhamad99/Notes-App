import express from "express";

import createOneNote from "./controller/createNote.controller.js"
import getNoteByid from "./controller/getNoteById.controller.js"
import getAllNotes from "./controller/getAllNotes.controller.js"
import DeleteOneNote from "./controller/deleteOneNote.controller.js"
import updateOneById from "./controller/updateOneById.controller.js"
const router = express.Router();

router.route("/").post(createOneNote).get(getAllNotes);

router.route("/:id")
       .get(getNoteByid)
       .delete(DeleteOneNote)
       .patch(updateOneById)


export default router;
