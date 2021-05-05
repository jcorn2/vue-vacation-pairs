<template>
  <div class="generate">
    <h1>This is an about page</h1>
    <div v-for="group in $store.state.pairs" :key="group.day">
      <span v-for="name in group.people" :key="name">{{`${name} `}}</span>
      <span>{{group.day}}</span>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('generatePairs')
  }
}
</script>
