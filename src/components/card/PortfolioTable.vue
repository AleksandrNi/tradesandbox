<template lang="html">
  <v-flex class='text-xs-left' >
    <div>
      <h5>Current</h5>
    </div>
    <v-data-table
      hide-actions
      :headers="headers"
      :items="tableData"
      class="elevation-1 hidden-md-and-down"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.ticker.toUpperCase() }}</td>
        <td class="text-xs-right">{{ props.item.amount }}</td>
        <td class="text-xs-right">{{ props.item.averagePrice }}</td>
        <td class="text-xs-right">{{ props.item.qtty }}</td>
        <td class="text-xs-right">{{ props.item.latestPrice }}</td>
        <td class="text-xs-right">{{ props.item.high }}</td>
        <td class="text-xs-right">{{ props.item.low }}</td>
        <td class="text-xs-right">{{ props.item.margin }}</td>
        <td class="text-xs-right">{{ props.item.profit }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="openTicker(props.item.ticker)"
          >
            equalizer
          </v-icon>
        </td>
      </template>

    </v-data-table>
    <v-data-table
      hide-actions
      :headers="headersSmallSize"
      :items="tableDataSmallSize"
      class="elevation-1 hidden-sm-and-down hidden-lg-and-up"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.ticker.toUpperCase() }}</td>
        <td class="text-xs-right">{{ props.item.amount }}</td>
        <td class="text-xs-right">{{ props.item.averagePrice }}</td>
        <td class="text-xs-right">{{ props.item.qtty }}</td>
        <td class="text-xs-right">{{ props.item.latestPrice }}</td>
        <td class="text-xs-right">{{ props.item.margin }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="openTicker(props.item.ticker)"
          >
            equalizer
          </v-icon>
        </td>
      </template>

    </v-data-table>
  </v-flex>

</template>

<script>
import _ from 'lodash'
import * as types from '../../store/types'
// {
// ticker: 'ge',
// amount: 1,
// averagePrice: 1,
// qtty: 1,
// latestPrice: 9.925,
// high: 10.12,
// low: 9.88,
// margin: 892.5,
// profit: 8.92,
// topPriceTarget: 0,
// topPriceTargetGrow: 0,
// lowPriceTarget: 0,
// lowPriceTargetGrow: 0 }
import {pathMethod} from '../../methods/PathMethod'

export default {
   data: () => ({
     tableData: [{}],
     tableDataSmallSize: [{}],
     headers: [
       { text: 'Ticker', value: 'ticker'},
       { text: 'Amount, $', value: 'amount', align: 'right' },
       { text: 'Average Price, $', value: 'averagePrice', align: 'right', sortable: false  },
       { text: 'Quantity', value: 'qtty', align: 'right' },
       { text: 'Latest Price, $', value: 'latestPrice', align: 'right' },
       { text: 'High, $', value: 'high', align: 'right', sortable: false },
       { text: 'Low, $', value: 'low', align: 'right', sortable: false },
       { text: 'Margin, %', value: 'margin', align: 'right', },
       { text: 'Profit, $', value: 'profit', align: 'right' },
       { text: 'Open Page', value: 'actions', align: 'center', sortable: false },
     ],
     headersSmallSize: [
       { text: 'Ticker', value: 'ticker'},
       { text: 'Amount, $', value: 'amount', align: 'right' },
       { text: 'Average Price, $', value: 'averagePrice', align: 'right', sortable: false  },
       { text: 'Quantity', value: 'qtty', align: 'right' },
       { text: 'Latest Price, $', value: 'latestPrice', align: 'right' },
       { text: 'Margin, %', value: 'margin', align: 'right', },
       { text: 'Open', value: 'actions', align: 'center', sortable: false },
     ],
   }),

   created () {

     const portfolioTickers = this.$store.getters[types.GET_PORTFOLIO]
     const tickerIndex = portfolioTickers.findIndex(obj => obj[1] === this.ticker)
     const userDealsArray = this.$store.getters[types.GET_PORTFOLIO_USER_DEALS]

     const sortedUserDealsArraySmallSize = []

     const sortedUserDealsArray = userDealsArray.map(obj => {
       const smallParams =  _.pick(obj, ['ticker', 'amount', 'averagePrice', 'qtty', 'latestPrice',  'margin'])
       const largeParams =  _.pick(obj, ['ticker', 'amount', 'averagePrice', 'qtty', 'latestPrice', 'high', 'low', 'margin', 'profit'])
       sortedUserDealsArraySmallSize.push(smallParams)
       return largeParams
     })
    // table for small screens
     this.tableDataSmallSize = sortedUserDealsArray
    // table for large screens
     this.tableData = sortedUserDealsArray
   },

   methods: {
     pathMethod,

     openTicker (ticker) {
      this.pathMethod({pageFrom:"portfolio"})
      this.$router.push({name:'companyPage', params: { ticker: ticker } })
     },
   }
 }

</script>

<style lang="css" scoped>
</style>
