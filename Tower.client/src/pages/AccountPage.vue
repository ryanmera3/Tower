<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-md-12">My Events</div>
      <MyEvents />
    </div>
    <div class="row">
      <div class="col-md-12">Upcoming Events</div>
      <div><Event /></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { attendeesService } from "../services/AttendeesService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      await attendeesService.getMyAttendees()
    })
    return {
      async cancelAttendee() {
        await attendeesService.cancelAttendee()
      },
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.myEvents)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
