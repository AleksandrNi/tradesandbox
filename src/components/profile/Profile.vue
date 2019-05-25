<template lang="html">
  <v-container>
    <v-layout row wrap >
      <v-flex xs12>
        <app-chartjs :companyData ="getCompanyInfo('ge') ? getCompanyInfo('ge') : {} " />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>

import * as types from '../../store/types'
import {pathMethod} from '../../methods/PathMethod'

export default {
  data () {
    return {
    }
  },
  components: {
        appChartjs: () => import('../card/ChartJS'),
  },
  methods:{
    pathMethod,
    getCompanyInfo (ticker) {

      return (() => {
        const portfolioTickers = this.$store.getters[types.GET_PORTFOLIO_TICKERS]
        const companyIndex = portfolioTickers.findIndex(value => value === ticker)
        const companies = this.$store.getters[types.GET_PORTFOLIO]
        const company = companies[companyIndex]
        const extraData = company ? company[0][company[1]]['mixed']['extraData'] : ''
        let response = ''
        if (company) {
          response = {
            label: extraData[0],
            averagePrice: extraData[1],
            high: extraData[2],
            low: extraData[3],
          }
        }
        return response
      })()

    }
  },
  computed: {
  },
  created() {
    this.pathMethod({pageFrom:"profile"})
  }
}
</script>

<style lang="css" scoped>
</style>
