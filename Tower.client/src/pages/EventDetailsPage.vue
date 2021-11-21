<template>
  <div class="EventDetails">
    <div class="card container bg-secondary">
      <div class="card-body row">
        <div class="col-md-4">
          <img src="http://placehold.it/400x400" alt="" />
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { AppState } from "../AppState"
export default {
  name: 'eventdetails',
  setup() {
    onMounted(async () => {
      activeEvent
    })
    return {
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>
