<template>
  <div class="editEvent">
    <form @submit.prevent="editEvent">
      <button
        type="button"
        class="btn btn-outline-warning ms-2"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Edit Event <i class="mdi mdi-pencil"></i>
      </button>
      <div
        class="modal fade"
        id="editModal"
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
                  v-model="editable.name"
                  placeholder="name"
                  class="col-md-12 my-1"
                  required:true
                />
                <input
                  type="text"
                  v-model="editable.description"
                  placeholder="description"
                  class="col-md-12 my-1"
                  required:true
                />
                <input
                  type="text"
                  v-model="editable.coverImg"
                  placeholder="coverImg"
                  class="col-md-12 my-1"
                  required:true
                />
                <input
                  type="text"
                  v-model="editable.location"
                  placeholder="location"
                  class="col-md-12 my-1"
                  required:true
                />
                <input
                  type="number"
                  v-model="editable.capacity"
                  placeholder="capacity"
                  class="col-md-12 my-1"
                  required:true
                />
                <input
                  type="date"
                  v-model="editable.startDate"
                  placeholder="startDate"
                  class="col-md-12 my-1"
                  required:true
                />
                <div id="v-model-select">
                  <select v-model="editable.type">
                    <option disabled value="">Select event type</option>
                    <option value="concert">concert</option>
                    <option value="convention">convention</option>
                    <option value="sport">sport</option>
                    <option value="digital">digital</option>
                  </select>
                  <span class="text-dark">Selected: {{ editable.type }}</span>
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
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { computed, reactive, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { Event } from "../models/Event"
import Pop from "../utils/Pop"
export default {
  props: {
    activeEv: {
      type: Event,
      default: () => new Event({})
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.activeEv }
    })
    return {
      editable,
      async editEvent() {
        try {
          await eventsService.editEvent(route.params.id, editable.value)
          const modalElem = document.getElementById('editModal')
          Modal.getOrCreateInstance(modalElem).toggle()
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      events: computed(() => AppState.events),
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>