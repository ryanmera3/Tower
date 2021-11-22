import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
  async getEvents(query = ''){
    const res = await api.get(`api/events?type=${query}`)
    logger.log(res.data)
    AppState.events = res.data
  }
  async createEvent(body){
    const res = await api.post('api/events', body)
    logger.log(res.data)
    AppState.events.unshift(res.data)
  }
  async removeEvent(id){
    const res = await api.delete('api/events' + id)
    logger.log(res.data)
    AppState.events = AppState.events.filter(e => e.id !== id)
  }
  async setActive(id){
    const active = AppState.events.find(p=>p.id === id)
    logger.log('Active', active)
    AppState.activeEvent = active
  }
}
export const eventsService = new EventsService()