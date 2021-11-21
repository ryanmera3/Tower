import { eventsService } from '../services/EventsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:id', this.getEventById)
      .get('/:id/attendees', this.getEventAttendees)
      .get('/:id/comments', this.getCommentsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id', this.editEvent)
      .post('', this.createEvent)
      .delete('/:id', this.deleteEvent)
  }

  async getEvents(req, res, next) {
    try {
      const query = req.body
      const result = await eventsService.getEvents(query)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const result = await eventsService.getEventById(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      const comments = await commentsService.getCommentByEvent(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const newEvent = await eventsService.createEvent(req.body)
      newEvent.creator = req.userInfo
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEventAttendees(req, res, next) {
    try {
      const result = await attendeesService.getEventAttendees(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const eventId = req.params.id
      const editedEvent = await eventsService.editEvent(eventId, req.body)
      return res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async deleteEvent(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const cancelledEvent = await eventsService.deleteEvent(req.body, req.userInfo)
      return res.send(cancelledEvent)
    } catch (error) {
      next(error)
    }
  }
}
