import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getEvents(query = {}) {
    const res = await dbContext.Events.find(query)
    console.log(res)
    return res
  }

  async getEventById(id) {
    const found = await dbContext.Events.findById(id)
    if (!found) {
      throw new BadRequest('invalid ID')
    }
    return found
  }

  async createEvent(eventData) {
    const newEvent = await dbContext.Events.create(eventData)
    return newEvent
  }

  async editEvent(id, body) {
    const found = await this.getEventById(id)

    if (!found) {
      throw new BadRequest('Invalid ID')
    }
    if (found.isCanceled) {
      throw new BadRequest('This event has been cancelled')
    }
    if (found.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You cannot edit this')
    }
    delete body.isCanceled
    const updatedEvent = await dbContext.Events.findByIdAndUpdate(id, body, { new: true })
    return updatedEvent
  }

  async deleteEvent(body, userInfo) {
    const found = await this.getEventById(body.id)
    if (found.creatorId.toString() !== userInfo.id) {
      throw new Forbidden('You do not have permission to delete this')
    }
    if (found.isCanceled) {
      throw new BadRequest('This event has been cancelled')
    }
    await dbContext.Events.findByIdAndUpdate(body.id, { isCanceled: true })
  }
}

export const eventsService = new EventsService()
