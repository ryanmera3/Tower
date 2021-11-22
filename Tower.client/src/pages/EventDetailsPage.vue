<template>
  <div class="EventDetails">
    <div class="card container bg-secondary mb-5">
      <div class="card-body row">
        <div class="col-md-4">
          <img src="http://placehold.it/350x350" alt="" class="my-4" />
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
                <div class="col-md-6 d-flex align-items-end">
                  <h5
                    :class="[
                      activeEvent.capacity === 0 ? 'text-danger' : 'text-dark',
                    ]"
                  >
                    {{ activeEvent.capacity }}
                  </h5>
                  <h6 class="mx-2">SPOTS LEFT</h6>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                  <button class="btn btn-outline-warning">
                    Attend <i class="mdi mdi-human"> </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row mb-2">
        <div class="col-md-12 ps-0">See who's attending</div>
      </div>
      <div class="row card bg-secondary">
        <div class="col-md-12 card-body"></div>
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
        <div class="col-md-12 pb-3 d-flex justify-content-center">
          <input
            type="text"
            class="w-100 rounded border-0"
            placeholder="Tell the people..."
          />
        </div>
        <div class="col-md-12 text-end mb-2">
          <button class="btn btn-outline-success">post comment</button>
        </div>
        <Comment />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { useRoute } from "vue-router"
export default {
  name: 'EventDetails',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      await eventsService.getEvents()
      await eventsService.setActive(route.params.id)
    })
    return {
      events: computed(() => AppState.events),
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.w-95 {
  width: 95%;
}
</style>