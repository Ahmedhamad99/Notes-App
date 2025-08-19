import {User} from '../../../../DB/models/User/User.model.js';
import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import Note from '../../../../DB/models/Note/Note.model.js';

const getNoteById = asyncHandler(async(req,res,next)=>{

    const {id} = req.params;
    console.log(id)
    const note = await Note.findById({ _id: id, ownerId: req.user.sub }).populate("ownerId", "email");
    if(!note){
        return next(new AppError('Note not found',404));
    }

    res.status(200).json({
        status:'success',
        data:{
            note,
        }
    })

})


export default  getNoteById;