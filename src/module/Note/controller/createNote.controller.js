import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import Note from '../../../../DB/models/Note/Note.model.js';


const createOneNote = asyncHandler(async(req,res,next)=>{

     const {title,content} = req.body;
     if(!title|| !content){
      return next(new AppError('Please provide title and content',400));
     }
     
     const note = new Note({
         title,
         content,
         ownerId:req.user.sub
     })
     await note.save()
     res.status(201).json({ message: "Note created successfully", note });
     
  })

export default  createOneNote;