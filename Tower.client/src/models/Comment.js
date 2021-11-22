export class Comment {
  constructor(data){
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.body = data.body
  }
}