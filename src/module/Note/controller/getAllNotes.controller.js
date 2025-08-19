import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import Note from '../../../../DB/models/Note/Note.model.js';


const getAllNotes = asyncHandler(async (req,res,next)=>{
            
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  
  const totalNotes = await Note.countDocuments({ ownerId: req.user.sub });

  // pagination
  const notes = await Note.find({ ownerId: req.user.sub })
    .populate("ownerId","email profilePic")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    page,
    limit,
    totalNotes,
    totalPages: Math.ceil(totalNotes / limit),
    count: notes.length,
    notes,
  });

})

export default getAllNotes;