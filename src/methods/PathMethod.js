import * as types from '../store/types'

const pathMethodParams = {
  pageTo: '',
  pageFrom:'',
  ticker: '',
}

export function pathMethod({pageTo, pageFrom, ticker} = pathMethodParams) {
  // FROM
  if (pageFrom) {
    this.$store.dispatch(types.ACTION_PAGE_FROM, pageFrom)
  }

  // TO
  if (pageTo) {
    this.$store.dispatch(types.ACTION_PAGE_TO, pageTo)
    const storePathTo = this.$store.state.pageTo
    this.$router.push({name:storePathTo, params: { ticker: ticker } })
  }

  // TICKER
  if (ticker) this.$store.dispatch(types.ACTION_SET_ACTIVE_TICKER, ticker)

}
