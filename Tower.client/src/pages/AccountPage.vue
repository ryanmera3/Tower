<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-md-12">My Events</div>
      <Event />
    </div>
    <div class="row">
      <div class="col-md-12">Upcoming Events</div>
      <div><Event /></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
