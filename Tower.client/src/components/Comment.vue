<template>
  <div class="col-md-12">
    <div class="row m-0 mb-3 w-100">
      <div class="col-md-2 bg-secondary d-flex">
        <img
          class="rounded-pill w-75 d-flex justify-content-center"
          :src="account.picture"
          alt=""
        />
      </div>
      <div class="col-md-10 d-flex bg-white rounded">
        <div class="d-flex flex-column">
          <h5>{{ account.name }}</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      account: computed(() => AppState.account)

    }
  }
}
</script>


<style lang="scss" scoped>
</style>