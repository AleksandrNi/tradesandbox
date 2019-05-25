import * as types from './types'

export default {
  // destPage
  [types.GET_PAGE_TO]: state => {
    return state.pageTo
  },
  // pageFrom
  [types.GET_PAGE_FROM]: state => {
    return state.pageFrom
  },
  // pageFrom
  [types.GET_ACTIVE_TICKER]: state => {
    return state.activeTicker
  },
  [types.GET_FUNDS]: state => {
    return state.funds
  },
  // Portfolio
  [types.GET_PORTFOLIO_TICKERS]: state => {
    return state.portfolioTickers
  },
  [types.GET_PORTFOLIO]: state => {
    return state.portfolio
  },
  [types.GET_PORTFOLIO_USER_DEALS]: state => {
    return state.userDeals
  },

  // HOME
  // GET_SHOW_HIDE_CHART
  [types.GET_SHOW_HIDE_CHART]: state => {
    return state.chartShowTickers
  },

  //Favorite
  [types.GET_FAVORITE_STOCKS]: state => {
    return state.favoriteStocks
  },
  //Favorite tickers
  [types.GET_FAVORITE_TICKERS_STOCKS]: state => {
    return state.favoriteStocksTickers
  },
  // Stocks
  [types.GET_QUERY_STOCKS]: state => {
    return state.queryStock
  },
  // Comments
  [types.GET_COMMENTS_GET_COMMENTS_BY_TICKER]: state => {
    return params => {
      const commentsByTicker = state.comments.map(comment => comment[1] === params ? comment : '')
      return commentsByTicker
    }
  },
  // Page
  [types.GET_COMPANY_PARAM_BY_TICKER_ID]: state => {
    return params => {

      let company;
        if(state.pageFrom === 'stocks') {
          const indexExists = state.queryStock.findIndex(company => company[1].toLowerCase() === params.ticker.toLowerCase())
          company = [state.queryStock[indexExists]]

        } else if (state.pageFrom === 'favorite') {
          const indexExists = state.favoriteStocksTickers.findIndex(ticker => ticker.toLowerCase() === params.ticker.toLowerCase())
          company = [state.favoriteStocks[indexExists]]

        } else if (state.pageFrom === 'portfolio') {
          const indexExists = state.portfolioTickers.findIndex(index => index.toLowerCase() === params.ticker.toLowerCase())
          company = [state.portfolio[indexExists]]

        }
        return company
    }
  },

};
