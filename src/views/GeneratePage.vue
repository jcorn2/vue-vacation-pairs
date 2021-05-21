<template>
  <div class="generate">
    <div class="header">
      <h1 class="title">Vacation Pairs</h1>
      <button @click="regenerate" :disabled="countdown > 0" class="regenerate-button">Regenerate Pairs</button>
    </div>
    <div v-if="countdown > 0" class="countdown">
      {{countdown}}
    </div>
    <div v-else class="pairs">
      <div v-for="group in $store.state.pairs" :key="group.day.day" class="pair">
        <span class="day-of-week">{{group.day.day}}</span>
        <PersonCard v-for="person in group.people" :key="person.name" :person="person"/>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from '@/components/PersonCard';

export default {
  components: {
    PersonCard
  },
  data() {
    return {
      countdown: 5,
      interval: null
    };
  },
  created() {
    this.$store.dispatch('generatePairs')
  },
  mounted() {
    this.startInterval();
  },
  methods: {
    regenerate() {
      this.$store.dispatch('regeneratePairs');
      this.startInterval();
    },
    startInterval() {
      this.countdown = 5;
      this.interval = setInterval(() => {
        this.countdown = this.countdown - 1;

        if (this.countdown <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
}
</script>

<style scoped>
.pairs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 0.5rem;
}

.pair {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.day-of-week {
  display: inline-block;
  min-width: 10rem;
  font-size: 1.5rem;
}

.regenerate-button {
  border: 0;
  background-color: rgb(0, 65, 185);
  color: #eee;
  border-radius: 0.3rem;
  cursor: pointer;
  grid-column: 3;
  max-width: 10rem;
  height: 2.5rem;
}

.regenerate-button:disabled {
  opacity: 70%;
}

.header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.title {
  grid-column: 2;
}

.countdown {
  font-size: 40rem;
}
</style>
