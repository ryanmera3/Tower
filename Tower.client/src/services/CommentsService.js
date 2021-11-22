import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService {
  async getComments(id){
    const res = await api.get(`api/events/${id}/comments`)
    logger.log(res.data)
    AppState.comments = res.data
  }
  async createComment(body){
    const res = await api.post(`api/comments`, body)
    logger.log(res.data)
    AppState.comments.unshift(res.data)
  }
  async deleteComment(id){
    await api.delete(`api/comments/` + id)
    logger('Deleted comment')
    AppState.comments = AppState.comments.filter(c=>c.id !== id)
  }
}
export const commentsService = new CommentsService()