import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService {
  async getComments(id){
    const res = await api.get(`api/events/${id}/comments`)
    logger.log(res.data)
  }
  async createComment(id, body){
    const res = await api.post(`api/events/${id}/comments`, body)
    logger.log(res.data)
  }
  async deleteComment(eventId, commentId){
    await api.delete(`api/events/${eventId}/comments/${commentId}`)
    logger('Deleted comment')
  }
}
export const commentsService = new CommentsService()