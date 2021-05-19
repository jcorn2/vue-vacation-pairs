<template>
  <div class="generate">
    <h1>This is an about page</h1>
    <div v-for="group in $store.state.pairs" :key="group.day.day">
      <span v-for="person in group.people" :key="person.name">{{`${person.name} `}}</span>
      <span>{{group.day.day}}</span>
    </div>
    <button @click="regenerate">Regenerate Pairs</button>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('generatePairs')
  },
  methods: {
    regenerate() {
      this.$store.dispatch('regeneratePairs');
    }
  }
}
</script>
