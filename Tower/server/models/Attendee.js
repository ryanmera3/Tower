import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AttendeeSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true },
    accountId: { type: ObjectId, required: true },
    account: { type: Object, required: true, ref: 'Profile' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
AttendeeSchema.index({ creatorId: 1, eventId: 1 }, { unique: true })
AttendeeSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Creator',
  justOne: true
})

AttendeeSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event'
})
