<template lang="html">
<v-flex class='text-xs-left ' >
  <div>
    <h5>Ticker Info</h5>
  </div>
    <v-data-table
      :headers="headers"
      :items="tickerParams"
      class="mytable"
      hide-actions
      hide-headers
      search

    >
      <template v-slot:items="props" >

        <td>{{ props.item ? props.item[0]['name'] : '' }}</td>
        <td class="text-xs-right">{{ props.item[0]['pocket'] }}</td>
        <td class="text-xs-right">{{ props.item[0]['current'] }}</td>
      </template>
    </v-data-table>

</v-flex>
</template>

<script>
import * as types from '../../store/types'

export default {
  props: ['ticker'],
  data () {
    return {
      tickerParams: [[{name:'', pocket:'', current: ''}]],
      headers: [
         {text: 'Name', align: 'left', sortable: false, value: 'name' },
         { text: 'Pocket values', value: 'pocket', align: 'right', sortable: false},
         { text: 'Current values', value: 'current', align: 'right', sortable: false},
       ],
    }
  },
  created () {
    if(!this.ticker) return
    const portfolioTickers = this.$store.getters[types.GET_PORTFOLIO]
    const tickerIndex = portfolioTickers.findIndex(obj => obj[1] === this.ticker)
    const userDealsArray = this.$store.getters[types.GET_PORTFOLIO_USER_DEALS]
    // userDeals
    const userDeals = userDealsArray[tickerIndex]

    // company Data
    const companies = this.$store.getters[types.GET_PORTFOLIO]
    const companyChart = companies[tickerIndex]
    // const currentPrice = companyChart[0] ? companyChart[0][companyChart[1]]['mixed']['table'][1][1] : ''

    // [[{name:'', pocket:'', current: ''}]],
    const objectKeys = Object.keys(userDeals)
    // userDeals [{Ticker, qtty, averagePrice, priceTarget, priceTargetGrow, priceLow, priceLowGrow}]
    const sortedArray = [[{name: "Name", pocket: 'Pocket values', current: 'Market values'}]]

    objectKeys.map(key => {
      const tempObject = {}
      if(key === 'averagePrice') {
        tempObject['name'] = 'Average price'
        tempObject['pocket'] = userDeals[key]
        tempObject['current'] = userDeals['latestPrice']

      } else if (key === 'qtty') {
        tempObject['name'] = 'Quantity'
        tempObject['pocket'] = userDeals[key]
        tempObject['current'] = ''

      } else if (key === 'high') {
        tempObject['name'] = 'High Daily Market Value'
        tempObject['pocket'] = ''
        tempObject['current'] = userDeals[key]

      } else if (key === 'low') {
        tempObject['name'] = 'Low Daily Market Value'
        tempObject['pocket'] = ''
        tempObject['current'] = userDeals[key]

      } else if (key === 'margin') {
        tempObject['name'] = 'Margin (current), %'
        tempObject['pocket'] = userDeals[key]
        tempObject['current'] = ''

      } else if (key === 'latestPrice') {
        tempObject['name'] = 'Latest Market Price, %'
        tempObject['pocket'] = ''
        tempObject['current'] = userDeals[key]

      } else if (key === 'profit') {
        tempObject['name'] = 'Profit (current), $'
        tempObject['pocket'] = userDeals[key]
        tempObject['current'] = ''

      } else if (key === 'amount') {
        tempObject['name'] = 'Amount, $'
        tempObject['pocket'] = userDeals[key]
        tempObject['current'] = ''

      } else if (key === 'topPriceTarget') {
        tempObject['name'] = 'Top limit, $'
        tempObject['pocket'] = userDeals[key] || ''
        tempObject['current'] = ''

      } else if (key === 'lowPriceTarget') {
        tempObject['name'] = 'Low limit, $'
        tempObject['pocket'] = userDeals[key] || ''
        tempObject['current'] = ''
      }
      // tempObject['name'] = key
      if(tempObject['pocket'] || tempObject['current']) sortedArray.push([tempObject])
    })

    this.tickerParams = sortedArray

  },

}
</script>

<style lang="css" scoped>
.mytable table td {
  background-color: #F5F5F5;
  font-size: .9rem;
}



/* http://jsbin.com/dukariv/edit?js,output */
/* https://codepen.io/anon/pen/JZEjdE */
/* https://codepen.io/anon/pen/GvvYvN */
/* table */
/* https://www.npmjs.com/package/v-data-table */
</style>
