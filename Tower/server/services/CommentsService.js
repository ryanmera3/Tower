import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentsService {
  async getCommentByEvent(eventId) {
    const comment = await dbContext.Comments.find({ eventId }).populate('creator')
    return comment
  }

  async createComment(body) {
    const newComment = await dbContext.Comments.create(body)
    newComment.populate('creator', 'name picture')
    return newComment
  }

  async removeComment(commentId, userId) {
    const res = await dbContext.Comments.findById(commentId)
    if (res.creatorId.toString() !== userId) {
      throw new Forbidden('You do not have permission to delete this')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
