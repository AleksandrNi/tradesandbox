import * as types from './types'

export default {
  // destPage
  [types.ACTION_PAGE_TO]: (context, payload) => {
    context.commit(types.MUTATE_PAGE_TO, payload)
  },
  // pageFrom
  [types.ACTION_PAGE_FROM]: (context, payload) => {
    context.commit(types.MUTATE_PAGE_FROM, payload)
  },
  // set active ticker
  [types.ACTION_SET_ACTIVE_TICKER]: (context, payload) => {
    context.commit(types.MUTATE_SET_ACTIVE_TICKER, payload)
  },
  [types.ACTION_FUNDS]: (context, payload) => {
    context.commit(types.MUTATE_FUNDS, payload)
  },
  [types.ACTION_SEND_QUERY]: async (context, payload) => {
    // https://api.iextrading.com/1.0/stock/market/batch?symbols=fb&types=quote,news,chart&range=1m&last=5
    const response = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${payload}&types=quote,news,chart&range=1m&last=5`, {
      method:'GET',
      headers:{ 'content-type': 'application/json'},
      body: JSON.stringify()
    })
    const responseBoby = await response.json()
    // [{}, ticker]
    context.commit(types.MUTATE_SEND_QUERY, [responseBoby, payload.toUpperCase()])
  },
  [types.ACTION_ADD_TICKER_TO_FAVORITE]: async (context, payload) => {
    context.commit(types.MUTATE_ADD_TICKER_TO_FAVORITE, payload)
  },
  [types.ACTION_REMOVE_COMPANY_FROM_STOCKS]: async (context, payload) => {
    context.commit(types.MUTATE_REMOVE_COMPANY_FROM_STOCKS, payload)
  },
  [types.ACTION_REMOVE_COMPANY_FROM_FAVORITE]: async (context, payload) => {
    context.commit(types.MUTATE_REMOVE_COMPANY_FROM_FAVORITE, payload)
  },
  [types.ACTION_COMMENT_SEND_COMMENT]: async (context, payload) => {
    context.commit(types.MUTATE_COMMENT_SEND_COMMENT, payload)
  },

  // BUY TICKER
  [types.ACTION_BUY_TICKER]: async (context, payload) => {
    context.commit(types.MUTATE_BUY_TICKER, payload)
  },

}
