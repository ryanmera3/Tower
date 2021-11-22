<template>
  <div
    class="event col-md-3 my-2 d-flex flex-column"
    v-for="e in events"
    :key="e.id"
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
        @click="push(e.id)"
        :style="{ backgroundImage: `url(${e.coverImg})` }"
      >
        <h5 class="fw-bold text-out">{{ e.name }}</h5>
        <h6 class="fw-bold text-out">{{ e.location }}</h6>
        <h6 class="fw-bold text-out">
          {{ new Date(e.startDate).toLocaleString() }}
        </h6>
        <h6 class="d-flex justify-content-end">
          <p class="d-flex my-0 text-white text-out" v-if="e.capacity >= 1">
            {{ e.capacity }} spots left
          </p>
          <p class="d-flex my-0 text-danger" v-else>Sold out</p>
        </h6>
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
export default {
  setup() {
    const router = useRouter()
    onMounted(async () => {
    })
    return {
      push(id) {
        eventsService.setActive(id)
        router.push({
          name: "EventDetails",
          params: { id: id }
        })
      },
      events: computed(() => AppState.events)
    }
  }
}
</script>


<style lang="scss" scoped>
.event {
  height: 200px;
}
.text-out {
  -webkit-text-stroke: 0.75px black;
}
</style>