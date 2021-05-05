<template>
  <div class="home">
    <VacationPairs />
  </div>
</template>

<script>
// @ is an alias to /src
import VacationPairs from '@/components/VacationPairs.vue';

export default {
  name: 'Home',
  components: {
    VacationPairs
  }
}
</script>
