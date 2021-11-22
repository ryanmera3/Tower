import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class AttendeesService {
  async attendEvent(body){
    const res = await api.post('api/attendees/', body)
    logger.log(res.data)
    AppState.attendees.unshift(res.data)

  }
  async getAttendees(id){
    const res = await api.get(`api/events/` + id + '/attendees')
    logger.log(res.data)
    AppState.attendees = res.data

  }
  async getMyAttendees(){
    const res = await api.get(`account/attendees`)
    logger.log(res.data)
    AppState.attendees = res.data

  }
  async cancelAttend(id){
    const res = await api.delete(`api/attendees/` + id)
    logger.log(res.data)
    AppState.myEvents = AppState.myEvents.filter(r => r.id !== id)
  }
}
export const attendeesService = new AttendeesService()