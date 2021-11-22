<template>
  <div class="EventDetails">
    <div class="card container bg-secondary mb-5">
      <div class="card-body row">
        <div class="col-md-4">
          <img src="http://placehold.it/350x350" alt="" class="my-4" />
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-7 mt-4 d-flex flex-column">
          <div class="row mb-3 text-white">
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
            <div class="col-md-12 h-50 align-items-end d-flex">
              <div class="row w-100">
                <div class="col-md-6 d-flex">
                  <h5 class="text-dark">{{ activeEvent.capacity }}</h5>
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
    <div class="container">
      <div class="row">
        <div class="col-md-12">See who's attending</div>
      </div>
      <div class="row card bg-secondary">
        <div class="col-md-12 card-body"></div>
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
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>
