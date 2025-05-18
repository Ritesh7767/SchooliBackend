import mongoose from "mongoose"

interface commentInterface {

    comment: string,
    commentBy: mongoose.Schema.Types.ObjectId
}
const commentSchema = new mongoose.Schema<commentInterface>(
    {
        comment: {
            type: String,
            required: true
        },
        commentBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
)

const Comment = mongoose.model("Comment", commentSchema)

export default Comment