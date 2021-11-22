<template>
  <div class="EventDetails">
    <div class="card container bg-secondary mb-5">
      <div class="card-body row">
        <div class="col-md-4">
          <img :src="activeEvent.coverImg" alt="" class="my-4 w-75" />
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-7 mt-4 d-flex flex-column">
          <div class="row mb-3 text-dark">
            <div class="col-md-6">
              <h4>{{ activeEvent.name }}</h4>
              <h5>{{ activeEvent.location }}</h5>
            </div>
            <div class="col-md-6 text-end">
              <h4>
                {{
                  new Date(activeEvent.startDate).toLocaleString().split(",")[0]
                }}
              </h4>
              <h5>
                Starting at
                {{
                  new Date(activeEvent.startDate).toLocaleString().split(",")[1]
                }}
              </h5>
            </div>
            <p class="col-md-12">{{ activeEvent.description }}</p>
            <div class="col-md-12 align-items-end d-flex">
              <div class="row w-100">
                <div
                  class="col-md-6 d-flex align-items-end"
                  v-if="!activeEvent.isCanceled"
                >
                  <h5
                    :class="[
                      activeEvent.capacity === 0 ? 'text-danger' : 'text-dark',
                    ]"
                  >
                    {{ activeEvent.capacity }}
                  </h5>
                  <h6 class="mx-2">SPOTS LEFT</h6>
                </div>
                <h1 class="bg-danger" v-else>Event is cancelled</h1>
                <div class="col-md-6 d-flex justify-content-end">
                  <button
                    class="btn btn-outline-warning"
                    @click="attendEvent"
                    v-if="activeEvent.capacity >= 1 && !activeEvent.isCanceled"
                  >
                    Attend <i class="mdi mdi-human"> </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row h-100">
            <div
              v-if="canSee(activeEvent)"
              class="col-md-12 d-flex align-items-end justify-content-end"
            >
              <EditEvent :event="event" />
              <button class="btn btn-danger ms-2" @click="deleteEvent">
                Cancel Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row mb-2">
        <div class="col-md-12 ps-0">See who's attending</div>
      </div>
      <div class="row bg-secondary">
        <div
          class="col-md-12 d-flex w-25"
          v-for="a in attendees"
          :key="a.accountId"
        >
          {{ a }}
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mb-2">
        <div class="col-md-12 text-secondary ps-0">What are people saying</div>
      </div>
      <div class="row card bg-secondary">
        <div class="col-md-12 card-body text-success text-end">
          Join the conversation
        </div>
        <form @submit.prevent="createComment">
          <div class="col-md-12 pb-3 d-flex justify-content-center">
            <input
              type="text"
              v-model="state.editable.body"
              class="w-100 rounded border-0"
              placeholder="Tell the people..."
            />
          </div>
          <div class="col-md-12 text-end mb-3">
            <button type="submit" class="btn btn-outline-success">
              post comment
            </button>
          </div>
        </form>
        <Comment />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { useRoute, useRouter } from "vue-router"
import { commentsService } from "../services/CommentsService"
import { attendeesService } from "../services/AttendeesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  name: 'EventDetails',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({ editable: {} })
    onMounted(async () => {
      await attendeesService.getAttendees(route.params.id)
      await eventsService.getAllEvents()
      await eventsService.setActive(route.params.id)
    })
    return {
      state,
      canSee(activeEvent) {
        return activeEvent.creatorId === AppState.account.id &&
          activeEvent.isCanceled !== true
      },
      push() {
        router.push({
          name: "Home",
        })
      },
      async createComment() {
        try {
          state.editable.eventId = route.params.id
          await commentsService.createComment(state.editable)
          state.editable = {}

        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }

      },
      async attendEvent() {
        try {
          await attendeesService.attendEvent()
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      async deleteEvent() {
        try {
          await eventsService.removeEvent(route.params.id)
          router.push({
            name: "Home"
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      events: computed(() => AppState.events),
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.attendees)
    }
  }
}
</script>

<style lang="scss" scoped>
.w-95 {
  width: 95%;
}
</style>