import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    roster: [],
    days: [{day: 'Sunday', order: 0}, {day: 'Monday', order: 1}, {day: 'Tuesday', order: 2}, {day: 'Wednesday', order: 3}, {day: 'Thursday', order: 4}],
    pairs: [],
    gifs: []
  },
  mutations: {
    addPerson (state, name) {
      state.roster.push({name, avatar: state.gifs[state.roster.length + 1]})
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
        const people = state.roster.slice(i * 2, (i * 2) + 2);
        const day = state.days[i];
        const group = {people, day};

        state.pairs.push(group);
      }

    },
    divideInto3Pairs(state, {numThreeGroups, numTwoGroups}) {
      for (let i = 0; i < numThreeGroups; i++) {
        const people = state.roster.slice((numTwoGroups * 2) + (i*3), (numTwoGroups * 2) + (i*3) + 3);
        const day = state.days[i + numTwoGroups];
        const group = {people, day};

        state.pairs.push(group);
      }
    },
    sortPairs(state) {
      state.pairs.sort((a, b) => a.day.order - b.day.order);
    },
    clearPairs(state) {
      state.pairs = [];
    },
    setGifs(state, gifs) {
      state.gifs = gifs;
    }
  },
  actions: {
    generatePairs({commit, state}) {
      commit('clearPairs');
      commit('shuffleRoster');
      commit('shuffleRoster');
      commit('shuffleRoster');
      commit('shuffleDays');

      const numThreeGroups = state.roster.length % 5;
      const numTwoGroups = 5 - numThreeGroups;

      commit('divideInto2Pairs', numTwoGroups);
      commit('divideInto3Pairs', {numThreeGroups, numTwoGroups});

      commit('sortPairs');
    },
    regeneratePairs({commit, dispatch}) {
      commit('clearPairs');
      dispatch('generatePairs');
    },
    async fetchGifs({commit}) {
      const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.VUE_APP_GIPHY_API_KEY}&limit=50&rating=g`);
      const gifs = await response.json();
      
      commit('setGifs', gifs.data);
    }
  }
})

export default store;