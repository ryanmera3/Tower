import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
  }

  async createAttendee(req, res, next) {
    try {
      console.log('test')
    } catch (error) {
      next(error)
    }
  }
}
