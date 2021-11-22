<template>
  <div
    class="event col-md-3 my-2 d-flex flex-column"
    v-for="a in attendees"
    :key="a.accountId"
  >
    <div class="card h-100 border-5 bg-secondary justify-content-end text-out">
      <div
        class="
          card-body
          d-flex
          flex-column
          justify-content-end
          text-white
          selectable
        "
        :style="{ backgroundImage: `url(${a.event[0].coverImg})` }"
      >
        <h5 class="fw-bold text-out">{{ a.event[0].name }}</h5>
        <h6 class="fw-bold text-out">{{ a.event[0].location }}</h6>
        <h6 class="fw-bold text-out">
          {{ new Date(a.event[0].startDate).toLocaleString() }}
        </h6>
        <h6 class="d-flex justify-content-end">
          <p
            class="d-flex my-0 text-white text-out"
            v-if="a.event[0].capacity >= 1"
          >
            {{ a.event[0].capacity }} spots left
          </p>
          <p class="d-flex my-0 text-danger" v-else>Sold out</p>
        </h6>
        <p class="bg-danger text-white" v-if="a.event[0].isCanceled">
          THIS EVENT IS CANCELED
        </p>
        <button class="btn btn-danger" @click="cancelAttend(a.id)">
          Cancel res
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { useRouter } from "vue-router"
import { attendeesService } from "../services/AttendeesService"
export default {
  setup() {
    const router = useRouter()
    onMounted(async () => {
      await attendeesService.getMyAttendees()
    })
    return {
      push(id) {
        eventsService.setActive(id)
        router.push({
          name: "EventDetails",
          params: { id: id }
        })
      },
      async cancelAttend(id) {
        await attendeesService.cancelAttend(id)
      },
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.myEvents)
    }
  }
}
</script>


<style lang="scss" scoped>
.event {
  height: 200px;
}
.text-out {
  -webkit-text-stroke: 0.5px black;
}
</style>