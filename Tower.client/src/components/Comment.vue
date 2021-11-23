<template>
  <div class="col-md-12">
    <div class="row m-0 mb-3 w-100" v-for="c in comments" :key="c.id">
      <div class="col-md-2 bg-secondary d-flex">
        <img
          class="rounded-pill w-75 d-flex justify-content-center"
          :src="c.creator.picture"
          alt=""
          :title="c.creator.name"
        />
      </div>
      <div class="col-md-10 d-flex bg-white rounded justify-content-between">
        <div class="d-flex flex-column">
          <h5 class="d-flex flex-row">
            {{ c.creator.name }}
          </h5>
          <p>
            {{ c.body }}
          </p>
        </div>
        <button
          class="btn btn-outline-danger align-self-end d-flex mb-2"
          @click="deleteComment(c)"
        >
          Delete Comment
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { onMounted } from "@vue/runtime-core"
import { commentsService } from "../services/CommentsService"
export default {
  setup() {
    onMounted(async () => {
      await commentsService.getComments(route.params.id)
    })
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      async deleteComment(c) {
        await commentsService.deleteComment(c.id)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>