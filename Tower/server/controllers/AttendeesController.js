import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAttendee)
      .delete('/:id', this.deleteAttendee)
  }

  async createAttendee(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.account = req.userInfo
      const newAttendee = await attendeesService.createAttendee(req.body)
      return res.send(newAttendee)
    } catch (error) {
      next(error)
    }
  }

  async deleteAttendee(req, res, next) {
    try {
      const userId = req.userInfo.id
      const attendeeId = req.params.id
      await attendeesService.deleteAttendee(userId, attendeeId)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
