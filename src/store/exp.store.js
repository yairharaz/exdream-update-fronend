import { expService } from '../services/exp.service.js'
import { orderService } from '../services/order.service.js'


export const expStore = {
  state: {
    exps: null,
    filterBy: {limit:8 ,skip:0},
    expsCount: null
  },
  getters: {
    exps(state) {
      return state.exps
    },
    expsCount(state){
      return state.expsCount
    },
    filterBy(state){
      return state.filterBy
    }
  },
  mutations: {
    addExp(state, { exp }) {
      state.exps.push(exp);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setExps(state, { exps }) {
      state.exps = exps
    },
    setExpsCount(state , {expsCount}){
      state.expsCount = expsCount
    }
  },
  actions: {
    async loadExps({ state, commit }) {
      try {
        const res = await expService.getExps(state.filterBy);
        commit({ type: "setExps", exps: res.exps });
        commit({ type: "setExpsCount", expsCount: res.expsCount });
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
      if (!exp._id) exp.date = Date.now();
      const currExp = await expService.saveExp(exp)
      return currExp
    },

  }

}









