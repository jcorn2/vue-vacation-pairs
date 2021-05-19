<template>
  <div class="vacation-pairs">
    <h1>Vacation Pairs Generator</h1>
    <div class="content">
      <div class="left-side">
        <h3>Enter Name</h3>
        <div class="name-input">
          <input type="text" placeholder="Enter name" v-model="inputValue">
          <button @click="addPerson">Submit</button>
        </div>
        <button class="go-to-pairs" @click="generatePairs">Generate Pairs</button>
      </div>
      <div>
        <h3>Roster</h3>
        <PersonCard v-for="person in $store.state.roster" :key="person.name" :person="person"/>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from '@/components/PersonCard';

export default {
  name: 'HelloWorld',
  components: {
    PersonCard
  },
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    addPerson() {
      this.$store.commit('addPerson', this.inputValue);
      this.inputValue = '';
    },
    generatePairs() {
      this.$router.push('generate');
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-around;
  padding: 2rem;
}

.content > div {
  flex-basis: 50%;
}

.go-to-pairs {
  margin-top: 2rem;
  padding: 1rem;
}
</style>
