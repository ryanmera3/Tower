import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AttendeeSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true },
    accountId: { type: ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
AttendeeSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Creator',
  justOne: true
})
