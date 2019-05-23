import * as types from './types'
import {GetDataServise} from '../getDataService'

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
    // payload : 'fb'
    const company = await GetDataServise.getCompany(payload)
    context.commit(types.MUTATE_SEND_QUERY, [company, payload.toLowerCase()])
  },
  // Favorite

  [types.ACTION_GET_FAVORITE_COMPANIES]: async (context) => {
    //  empty payload, get all companies user subscribed
    const favoriteCompaniesArray = await GetDataServise.getFavoriteCompanies()
    // return array of portfolio and favorite companies [ [[{},ticker][{},ticker]], [[{},ticker][{},ticker]] ]
    context.commit(types.MUTATE_GET_FAVORITE_COMPANIES, favoriteCompaniesArray)
  },

  [types.ACTION_ADD_TICKER_TO_FAVORITE]: async (context, payload) => {
    // add ticker to favorite
    // payload: [{}, ticker]
    const newFavoriteCompany = await GetDataServise.addCompanyToFavorite(payload[1])

    context.commit(types.MUTATE_ADD_TICKER_TO_FAVORITE, newFavoriteCompany)

  },

  // remove company [stocks, favorite, ticker] from db
  [types.ACTION_REMOVE_COMPANY_FROM_DB]: async (context, payload) => {
    if(payload.pressedButton === 'delete_outline' && payload.pageFrom === 'stocks') {
      context.commit(types.MUTATE_REMOVE_COMPANY_FROM_DB, ['ticker_should_be_removed_from_stocks', payload.pageFrom, payload.ticker])
    } else {
      const resultArray = await GetDataServise.removeCompanyFromDB(payload)
      context.commit(types.MUTATE_REMOVE_COMPANY_FROM_DB, resultArray)
    }

  },
  // Comments
  [types.ACTION_COMMENT_SEND_COMMENT]: async (context, payload) => {
    await GetDataServise.createComment(payload)
    .then(res => context.commit(types.MUTATE_COMMENT_SEND_COMMENT, res))
    .catch(err => console.log(err))
  },
  [types.ACTION_COMMENTS_GET_COMMENTS_BY_TICKER]: async (context, ticker) => {
    await GetDataServise.getComments(ticker)
    .then(res => context.commit(types.MUTATE_COMMENTS_GET_COMMENTS_BY_TICKER, res))
    .catch(err => console.log(err))
  },

  // BUY TICKER
  [types.ACTION_TICKER_DEALS]: async (context, payload) => {
    console.log(payload);
    const boughtTicker = await GetDataServise.tickerDeals(payload)
    context.commit(types.MUTATE_BUY_TICKER, boughtTicker)
  },

}
