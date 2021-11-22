import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class AttendeesService {
  async attendEvent(){
    const res = await api.post('api/attendees/')
    logger.log(res.data)
    AppState.attendees.unshift(res.data)

  }
  async getAttendees(id){
    const res = await api.get(`api/events/` + id + '/attendees')
    logger.log(res.data)
    AppState.attendees = res.data

  }
}
export const attendeesService = new AttendeesService()