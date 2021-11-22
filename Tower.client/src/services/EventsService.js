import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
  async getEvents(query = ''){
    const res = await api.get(`api/events?type=${query}`)
    logger.log(res.data)
    AppState.events = res.data
  }
  async getAllEvents(){
    const res = await api.get(`api/events`)
    logger.log(res.data)
    AppState.events = res.data
  }
  async createEvent(body){
    const res = await api.post('api/events', body)
    AppState.events.unshift(res.data)
  }
  async removeEvent(id){
    const res = await api.delete('api/events/' + id , )
    logger.log(res.data)
    const found = AppState.events.findIndex(e => e.id === id)
    AppState.events.splice(found, 1, res.data)

  }

  async editEvent(id,body){
    const res = await api.put('api/events/' + id, body)
    logger.log(res.data)
    const found = new Event(res.data)
    AppState.activeEvent = res.data
    const index = AppState.events.findIndex(c => c.id === found.id)
    if (index === -1) {
      AppState.events.push(found)
      return
    }
    AppState.events.splice(index, 1, found)
  }
  async setActive(id){
    const active = AppState.events.find(p=>p.id === id)
    logger.log('Active', active)
    AppState.activeEvent = active
  }
}
export const eventsService = new EventsService()