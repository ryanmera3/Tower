<template>
  <div class="createEvent">
    <form @submit.prevent="createEvent">
      <button
        type="button"
        class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#eventModal"
      >
        Create Project
      </button>
      <div
        class="modal fade"
        id="eventModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body container">
              <div class="row">
                <input
                  type="text"
                  v-model="state.editable.name"
                  placeholder="name"
                  class="col-md-12 my-1"
                />
                <input
                  type="text"
                  v-model="state.editable.description"
                  placeholder="description"
                  class="col-md-12 my-1"
                />
                <input
                  type="text"
                  v-model="state.editable.coverImg"
                  placeholder="coverImg"
                  class="col-md-12 my-1"
                />
                <input
                  type="text"
                  v-model="state.editable.location"
                  placeholder="location"
                  class="col-md-12 my-1"
                />
                <input
                  type="number"
                  v-model="state.editable.capacity"
                  placeholder="capacity"
                  class="col-md-12 my-1"
                />
                <input
                  type="date"
                  v-model="state.editable.startDate"
                  placeholder="startDate"
                  class="col-md-12 my-1"
                />
                <div id="v-model-select">
                  <select v-model="state.editable.type">
                    <option disabled value="">Select event type</option>
                    <option value="concert">concert</option>
                    <option value="convention">convention</option>
                    <option value="sport">sport</option>
                    <option value="digital">digital</option>
                  </select>
                  <span class="text-dark"
                    >Selected: {{ state.editable.type }}</span
                  >
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { computed, reactive } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    const state = reactive({ editable: {} })
    const router = useRouter()
    return {
      state,
      async createEvent() {
        const res = await eventsService.createEvent(state.editable)
        const modalElem = document.getElementById('eventModal')
        Modal.getOrCreateInstance(modalElem).toggle()
        state.editable = {}
        await eventsService.setActive(res.id)
        await router.push({
          name: 'eventdetails',
          params: { id: res.id }
        })
      },
      events: computed(() => AppState.events),
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>