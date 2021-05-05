import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    roster: [],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    pairs: []
  },
  mutations: {
    addPerson (state, person) {
      console.log(person)
      state.roster.push(person)
    },
    shuffleRoster(state) {
      for(let i = state.roster.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = state.roster[i]
        state.roster[i] = state.roster[j]
        state.roster[j] = temp
      }
    },
    shuffleDays(state) {
      for(let i = state.days.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = state.days[i]
        state.days[i] = state.days[j]
        state.days[j] = temp
      }
    },
    divideInto2Pairs(state, num2Pairs) {
      for (let i = 0; i < num2Pairs; i++) {
        const people = state.roster.splice(0, 2);
        const day = state.days[i];
        const group = {people, day};

        state.pairs.push(group);
      }

    },
    divideInto3Pairs(state, num3Pairs, num2Pairs) {
      for (let i = 0; i < num3Pairs; i++) {
        const people = state.roster.splice(0, 3);
        const day = state.days[i + num2Pairs];
        const group = {people, day};

        state.pairs.push(group);
      }
      console.log(state.pairs);

    }
  },
  actions: {
    generatePairs({commit, state}) {
      commit('shuffleRoster');
      commit('shuffleDays');

      const numThreeGroups = state.roster.length % 5;
      const numTwoGroups = 5 - numThreeGroups;

      commit('divideInto2Pairs', numTwoGroups);
      commit('divideInto3Pairs', numThreeGroups);

      console.log(state.pairs);
    }
  }
})

export default store;