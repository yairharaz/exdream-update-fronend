import { expService } from '../services/exp.service.js'
import { orderService } from '../services/order.service.js'

export const expStore = {
  state: {
    exps: [],
      filterBy: {}
  },
  getters: {
    exps(state) {
      return state.exps
    }
  },
  mutations: {
    updateExp(state, { currExp }) {
      const idx = state.exps.findIndex((experience) => experience._id === currExp._id);
      state.exps.splice(idx, 1, currExp);
    },
    addExp(state, { exp }) {
      state.exps.push(exp);
    },
    setFilter(state, { filterBy }){
      state.filterBy = filterBy;
    },
    setExps(state, { exps }){
      state.exps = exps
    }
  },
  actions: {
    async loadExps({ state ,commit }) {
      try {
        const exps = await expService.getExps(state.filterBy)
        commit({type: "setExps" , exps})
      } catch (err) {
        console.log('ERR: ', err)
      }
    },
    async removeExp({ commit }, { id }) {
      await expService.remove(id)
    },
    async booking({ state }, { booked, exp, user }) {
      await expService.addParticipant(booked, exp, user);
      await orderService.addOrder(booked, exp, user);
    },
    async saveExp({ commit }, { exp }) {
      const type = (exp._id) ? 'updateExp' : 'addExp';
      if (!exp._id) exp.date = Date.now();
      const currExp = await expService.saveExp(exp)
      commit({ type, currExp })
      return currExp
    }
  }

}







