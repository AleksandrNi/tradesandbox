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
    // userDeals [{Ticker, qtty, price, priceTarget, priceTargetGrow, priceLow, priceLowGrow}]
    userDeals: [],
    // array of arrays [{}, ticker]
    portfolio: [],
    // array of tickers: ['fb','aapl', ...]
    portfolioTickers: [],
    // array of arrays [{}, ticker]
    // array of tickers: ['fb','aapl', ...]
    favoriteStocks: [],
    favoriteStocksTickers: [],
    // [{}, ticker]
    queryStock: [],
    // array of arrays [ [{date: '', comment: ''}, {date: '', comment: ''}], ticker] ]
    comments: [],

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
