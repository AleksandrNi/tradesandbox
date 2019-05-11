import Vue from 'vue'
import Vuex from 'vuex'

// import counter from './modules/counter'
// import * as actions from './actions'
// import * as getters from './getters'
// import * as mutations from './mutations'

import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    exists: false,
    funds: 10000,
    // array of tickers: ['fb','aapl', ...]
    portfolio: [],
    // array of tickers: ['fb','aapl', ...]
    favoriteStocks: [],
    // array of arrays [{}, ticker]
    companies: [],
    // [{}, ticker]
    queryStock: [],
    // array of arrays [ [{date: '', comment: ''}, {date: '', comment: ''}], ticker] ]
    comments: [],
    // userDeals [{Ticker, qtty, price, priceTarget, priceTargetGrow, priceLow, priceLowGrow}]
    userDeals: [],

    // pathMethods
    pageTo: '',
    pageFrom: '',
    activeTicker: '',

  },
  getters,
  actions,
  mutations,
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    // counter
  }
})
