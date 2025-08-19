import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import Note from '../../../../DB/models/Note/Note.model.js';


const DeleteOneNote = asyncHandler(async (req, res, next)=>{
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    
    res.status(201).json({
      success: true,
      message: "Note deleted successfully",
    });
  
   
})

export default DeleteOneNote;