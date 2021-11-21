import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
  async getEvents(){
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }
}
export const eventsService = new EventsService()