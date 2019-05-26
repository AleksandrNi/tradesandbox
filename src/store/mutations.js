import * as types from './types'
import {pathMethod} from '../methods/PathMethod'
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
    const indexExists = state.queryStock.findIndex((company, index) => company[1] === payload[1])
    indexExists !== -1 ? state.queryStock[indexExists] =  payload : state.queryStock.push(payload)
  },
  // HOME
  // MUTATE_SHOW_HIDE_CHART on the main page
  [types.MUTATE_SHOW_HIDE_CHART]: (state, payload) => {
    // payload = ticker
    const indexExists = state.chartShowTickers.findIndex(ticker => ticker === payload)
    indexExists !== -1
    ? state.chartShowTickers = [
      ...state.chartShowTickers.slice(0, indexExists),
      ...state.chartShowTickers.slice(indexExists + 1)
    ]
    : state.chartShowTickers.push(payload)
  },


  // Favorite
  // GET FAVORITE COMPANIES
  [types.MUTATE_GET_FAVORITE_COMPANIES]: (state, payload) => {
    // [ ['tiker1','ticker2'], ['','aapl'] ]
    // [[companiesArrayPortfolio, userDeals, tickersPortfolio], [companiesArrayFavorite, tickersFavorite]]
    state.portfolio = [...payload[0][0]]
    console.log(state.portfolio[0]);
    state.userDeals = [...payload[0][1]]
    state.portfolioTickers = [...payload[0][2]]

    state.favoriteStocks = [...payload[1][0]]
    console.log(state.favoriteStocks[0]);
    state.favoriteStocksTickers = [...payload[1][1]]
  },

  [types.MUTATE_ADD_TICKER_TO_FAVORITE]: (state, payload) => {
    if(payload[0] === 'ticker_exists') {
      return
    }

    state.favoriteStocks.push(payload)
    state.favoriteStocksTickers.push(payload[1]);
  },
  // remove company [stocks, favorite] from db
  [types.MUTATE_REMOVE_COMPANY_FROM_DB]: (state, payload) => {
    console.log(payload);
    // ["ticker_removed_from_favorite", "stocks", 'fb']
    if(Array.isArray(payload) && payload[0] === 'ticker_removed_from_favorite' && payload[1] === 'stocks'
    || Array.isArray(payload) && payload[0] === "ticker_removed_from_favorite" && payload[1] === 'favorite') {
      const tickerIndex = state.favoriteStocksTickers.findIndex(ticker => ticker === payload[2])

      if(!tickerIndex === -1) return
      state.favoriteStocksTickers = [
        ...state.favoriteStocksTickers.slice(0,tickerIndex),
        ...state.favoriteStocksTickers.slice(tickerIndex + 1)
      ]
      state.favoriteStocks = [
        ...state.favoriteStocks.slice(0,tickerIndex),
        ...state.favoriteStocks.slice(tickerIndex + 1)
      ]
    } else if(Array.isArray(payload) && payload[0] === "ticker_should_be_removed_from_stocks" && payload[1] === 'stocks') {
      console.log(state.queryStock);
      const tickerIndex = state.queryStock.findIndex(companyArray => companyArray[1] === payload[2])
      if(tickerIndex === -1) return
      console.log(tickerIndex);
      state.queryStock = [...state.queryStock.slice(0, tickerIndex), ...state.queryStock.slice(tickerIndex + 1)]
      console.log(state.queryStock);
    }
  },
  // Comments
  [types.MUTATE_COMMENT_SEND_COMMENT]: (state, payload) => {
    // [[{},ticker]]
    console.log(payload);
    state.comments.push(payload)
  },
  [types.MUTATE_COMMENTS_GET_COMMENTS_BY_TICKER]: (state, payload) => {
    // [[{},ticker],[{},ticker]]
    state.comments = payload
  },
  [types.MUTATE_BUY_TICKER]: (state, payload) => {

    // user trying sell more papers than he has
    if (!payload) {
      alert('You cant sell more papers than you have')
      console.log(payload);
      return
      // favorite => portfolio
    } else if (Array.isArray(payload) && payload[3] === 'change' && payload[2] === 'favorite') {
      console.log(payload);
      const tickerIndex = state.favoriteStocksTickers.findIndex(ticker => ticker === payload[1])
      const company = state.favoriteStocks[tickerIndex]
      // add company to portfolio
      state.portfolioTickers.push(payload[1])
      state.portfolio.push(company)
      state.userDeals.push(payload[0]);

      // remove company to favorite
      state.favoriteStocksTickers = [...state.favoriteStocksTickers.slice(0, tickerIndex),
      ...state.favoriteStocksTickers.slice(tickerIndex + 1)]

      state.favoriteStocks = [...state.favoriteStocks.slice(0, tickerIndex),
      ...state.favoriteStocks.slice(tickerIndex + 1)]

      // buy | sell ticker in portfolio, qtty > 0
    } else if (Array.isArray(payload) && payload[3] === 'stable' && payload[2] === 'portfolio') {
      const tickerIndex = state.portfolioTickers.findIndex(ticker => ticker === payload[1])
      state.userDeals[tickerIndex] = payload[0]

      // user ve bought paper first time
    } else if (Array.isArray(payload) && payload[3] === 'change' && payload[2] === 'portfolio') {
      console.log(payload);
      const tickerIndex = state.portfolioTickers.findIndex(ticker => ticker === payload[1])
      const company = state.portfolio[tickerIndex]
      // add company to portfolio
      state.favoriteStocksTickers.push(payload[1])
      state.favoriteStocks.push(company)

      // remove company to favorite
      state.portfolioTickers = [...state.portfolioTickers.slice(0, tickerIndex),
      ...state.portfolioTickers.slice(tickerIndex + 1)]

      state.portfolio = [...state.portfolio.slice(0, tickerIndex),
      ...state.portfolio.slice(tickerIndex + 1)]

      state.userDeals = [...state.userDeals.slice(0, tickerIndex),
      ...state.userDeals.slice(tickerIndex + 1)]
    }

  },
}
