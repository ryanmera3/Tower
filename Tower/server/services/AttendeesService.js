import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { eventsService } from './EventsService'

class AttendeesService {
  async createAttendee(attendeeData) {
    const events = await eventsService.getEventById(attendeeData.eventId)
    const found = await dbContext.Attendees.findOne({ eventId: attendeeData.eventId, accountId: attendeeData.accountId })
    if (events.capacity < 1) {
      throw new BadRequest('No more capacity')
    }
    if (found) {
      throw new BadRequest('You already have a ticket')
    }
    await events.capacity--
    await events.save()
    const newAttendee = await dbContext.Attendees.create(attendeeData)
    return newAttendee.populate('event')
  }

  async getMyAttendance(userId) {
    const res = await dbContext.Attendees.find({ accountId: userId }).populate('event')
    console.log(res)
    return res
  }

  async getEventAttendees(eventId) {
    const res = await dbContext.Attendees.find({ eventId }).populate('event')
    return res
  }

  async deleteAttendee(user, attendee) {
    const person = await dbContext.Attendees.findById(attendee)
    const event = await eventsService.getEventById(person.eventId)
    const res = await dbContext.Attendees.findById(attendee)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    if (res.accountId.toString() !== user) {
      throw new Forbidden('You cannot do that')
    }
    event.capacity++
    event.save()
    await dbContext.Attendees.findByIdAndDelete(attendee)
  }
}

export const attendeesService = new AttendeesService()
