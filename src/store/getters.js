import * as types from './types'

export default {
  // destPage
  [types.GET_PAGE_TO]: state => {
    return state.pageTo
  },
  // pageFrom
  [types.GET_PAGE_FROM]: state => {
    console.log(state.pageFrom);
    return state.pageFrom
  },
  // pageFrom
  [types.GET_ACTIVE_TICKER]: state => {
    return state.activeTicker
  },
  [types.GET_FUNDS]: state => {
    return state.funds
  },
  [types.GET_PORTFOLIO]: state => {
    return state.portfolio
  },

  //Favorite.vue
  [types.GET_FAVORITE_STOCKS]: state => {
    const favoriteStocks = state.favoriteStocks.map(companyName => {
      const filteredCompanies = state.companies.filter(company => {
          return company[1] === companyName
      })
      return filteredCompanies[0]
    })
    return favoriteStocks
  },
  // Stocks
  [types.GET_QUERY_STOCKS]: state => {
    return state.queryStock
  },
  // Comments
  [types.GET_COMMENTS_BY_TICKER_ID]: state => {
    return state.comments
  },
  // Page -  News
  [types.GET_COMPANY_PARAM_BY_TICKER_ID]: state => {
    return params => {

      let company;

            if(params.pageFrom === 'stocks') {
              company = state.queryStock.map(company => company[1].toLowerCase() === params.ticker.toLowerCase()
              ? company
              : false)
            }
            else if (params.pageFrom === 'favorite') {
                                                      // 'FB'                            // 'fb'
              const ticker = state.favoriteStocks.map(ticker => ticker.toLowerCase() === params.ticker.toLowerCase()
              ? ticker
              : false)

                if(ticker[0]) {
                  company = state.companies.map(company => company[1] === ticker[0]
                ? company
                : false)
                }

            } else if (params.pageFrom === 'portfolio') {
              const ticker = state.portfolio.map(ticker => ticker.toLowerCase() === params.ticker.toLowerCase()
              ? ticker
              : false)

                if(ticker[0]) {
                  company = state.companies.map(company => company[1] === ticker[0]
                ? company
                : false)
                }
            }
            return company
    }
  },
//   [types.GET_COMPANY_BY_TICKER_ID]: state => {
//     return params => {
//     // params = {ticker: "fb", pageFrom: "stocks"}
//     let company;
//     let ticker;
//
//       // stocks
//     if(params.pageFrom === 'stocks') {
//       company = state.queryStock.map(company => company[1].toLowerCase() === params.ticker.toLowerCase()
//       ? company
//       : false)
//
//       // favorite
//     } else if (params.pageFrom === 'favorite') {
//       ticker = state.favoriteStocks.map(ticker => ticker === params.ticker
//       ? ticker
//       : false)
//       if(ticker[0]) {
//         company = state.companies.map(company => company[1] === ticker[0]
//       ? company
//       : false)
//       }
//
//       // portfolio
//     } else if (params.pageFrom === 'portfolio') {
//         const ticker = state.portfolio.map(ticker => ticker === params.ticker
//         ? ticker
//         : false)
//         if (ticker[0]) {
//           company = state.companies.map(company => company[1] === ticker[0]
//           ? company
//           : false)
//         }
//       }
//
//       return company
//   }
// }

};
