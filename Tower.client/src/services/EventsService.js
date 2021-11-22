import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
  async getEvents(){
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }
  async setActive(id){
    const active = AppState.events.find(p=>p.id === id)
    logger.log('Active', active)
    AppState.activeEvent = active
  }
}
export const eventsService = new EventsService()