import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import Note from '../../../../DB/models/Note/Note.model.js';


const updateOneById = asyncHandler(async (req, res, next) => {
 
    const { id } = req.params;
    const { title, content} = req.body;
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!note) {
      return next(new AppError("Note not found", 404));
    }   
    res.status(200).json({ status: "success", message: "Note updated successfully", data: { note } })
   

})


export default updateOneById;