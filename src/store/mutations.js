import * as types from './types'

export default {

  // destPage
  [types.MUTATE_PAGE_TO]: (state, payload) => {
    state.pageTo = payload
  },
  // pageFrom
  [types.MUTATE_PAGE_FROM]: (state, payload) => {
    state.pageFrom = payload
  },
  // setActiveTicker
  [types.MUTATE_SET_ACTIVE_TICKER]: (state, payload) => {
    state.activeTicker = payload
  },


  [types.MUTATE_SEND_QUERY]: (state, payload) => {
    // payload = [{}, ticker]
    const exists = state.queryStock.some(company => company[1] === payload[1])
    if (exists) return
    state.queryStock = [...state.queryStock, payload]
    console.log(state.queryStock[0][0]['FB']['news']);
  },

  [types.MUTATE_ADD_TICKER_TO_FAVORITE]: (state, payload) => {
    if(state.favoriteStocks.length){
      const exists = state.favoriteStocks.some(companyName => companyName === payload[1] )
      if (exists) return false
    }
    state.companies.push(payload)
    state.favoriteStocks.push(payload[1]);
  },

  [types.MUTATE_REMOVE_COMPANY_FROM_STOCKS]: (state, payload) => {
    const index = state.queryStock.findIndex(company => company[1] === payload)
    state.queryStock = [...state.queryStock.splice(0, index), ...state.queryStock.splice(index + 1) ]
  },

  [types.MUTATE_REMOVE_COMPANY_FROM_FAVORITE]: (state, payload) => {
    const indexStock = state.favoriteStocks.findIndex(ticker => ticker === payload[1])
    state.favoriteStocks = [...state.favoriteStocks.splice(0, indexStock), ...state.favoriteStocks.splice(indexStock + 1) ]

    const indexCompanies = state.companies.findIndex(company => company[1] === payload[1])
    state.companies = [...state.companies.splice(0, indexCompanies), ...state.companies.splice(indexCompanies + 1) ]
  },
  [types.MUTATE_COMMENT_SEND_COMMENT]: (state, payload) => {

    // if(state.comments.length) {
    //   const companyIndex = state.comments.findIndex((commentBlock, index) => {
    //     if (commentBlock[1] === payload) return index
    //   })
    //   console.log(companyIndex);
    //   if(companyIndex !== -1){
    //     // return state.company[companyIndex][0].push(payload[0])
    //   }
    // }
    // [[{},ticker],[{},ticker]]
    const companyBlock = [payload['comment'], payload['ticker']]
    state.comments.push(companyBlock)
  },
  [types.MUTATE_BUY_TICKER]: (state, payload) => {
    state.userDeals.push(payload)
        console.log(payload);
        console.log(state.userDeals);
  },
}
