import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    htmlFontSize: 14,
  },
  mutations: {
    UPDATE_HTMLFONTSIZE(state, params) {
      state.htmlFontSize = params || 96
  }
  },
  actions: {},
  modules: {

  },
});
