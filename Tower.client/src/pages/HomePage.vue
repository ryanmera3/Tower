<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 my-2">
        <div class="row justify-content-center">
          <div class="col-md-11 card card-bg my-2 height-stuff d-flex">
            <h5
              class="
                card-body
                text-white
                d-flex
                flex-column
                justify-content-center
                line-height
                text-out
              "
            >
              Get ahead of the scalpers. Reserve your seat now with real events
              for real people
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        row
        text-center
        bg-secondary
        justify-content-center
        mx-auto
        text-white
      "
    >
      <div class="col-md-2 selectable py-2" @click="getAllEvents">All</div>
      <div class="col-md-2 selectable py-2" @click="getEvents('concert')">
        Concert
      </div>
      <div class="col-md-2 selectable py-2" @click="getEvents('conventions')">
        Conventions
      </div>
      <div class="col-md-2 selectable py-2" @click="getEvents('exhibit')">
        Exhibits
      </div>
      <div class="col-md-2 selectable py-2" @click="getEvents('sport')">
        Sports
      </div>
      <div class="col-md-2 selectable py-2" @click="getEvents('digital')">
        Digital
      </div>
    </div>
    <div class="row my-2 mx-auto">
      <Event />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup() {
    const router = useRouter()
    return {
      async getAllEvents() {
        try {
          await eventsService.getAllEvents()
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      async getEvents(query = {}) {
        try {
          await eventsService.getEvents(query)
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      name: 'Home',
      push(id) {
        router.push({
          name: "eventdetails",
          params: { id: id }
        })
      },
      user: computed(() => AppState.user),
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.w-90 {
  width: 90%;
}
.line-height {
  line-height: 30px;
}
.height-stuff {
  height: 15em;
}
.text-out {
  -webkit-text-stroke: 0.75px black;
}
.card-bg {
  background: url("../assets/img/tower-card.png");
  object-fit: contain;
  background-position: center;
}
</style>
