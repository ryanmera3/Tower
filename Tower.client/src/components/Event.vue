<template>
  <div
    class="event col-md-3 my-2 d-flex flex-column"
    v-for="e in events"
    :key="e.id"
  >
    <div class="card h-100 border-5 bg-secondary">
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
      eventsService.getEvents()
    })
    return {
      push(id) {
        router.push({
          name: "eventdetails",
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
  -webkit-text-stroke: 1px black;
}
</style>