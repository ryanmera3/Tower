import mongoose from 'mongoose'
import { EventSchema } from '../models/Event'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { AttendeeSchema } from '../models/Attendee'
import { CommentSchema } from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Events = mongoose.model('Event', EventSchema, 'events')

  Attendees = mongoose.model('Attendee', AttendeeSchema, 'attendees')

  Comments = mongoose.model('Comment', CommentSchema, 'comments')
}

export const dbContext = new DbContext()
