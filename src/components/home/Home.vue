<template lang="html">
  <v-container>
    <v-layout row wrap justify-center>
        <app-chartjs
        v-if='portfolioTickers'
        :key="tickers.length"
        />

      <app-portfoliotable class='hidden-sm-and-down' />
      <v-flex xs12 sm5 class='hidden-md-and-up text-xs-center text-sm-right mx-2'>
      <v-btn large block
        @click='pathMethod({pageTo:"portfolio"})'
        class='info'
      >Portfolio</v-btn>
      </v-flex>
      <v-flex xs12 sm5 class='hidden-md-and-up text-xs-center text-sm-left mx-2'>
        <v-btn large block
          @click='pathMethod({pageTo:"favorite"})'
          class='info'
        >Favorute</v-btn>
      </v-flex>
      <v-flex xs12 sm5 class='hidden-md-and-up text-xs-center text-sm-right mx-2'>
        <v-btn large block
          @click='pathMethod({pageTo:"stocks"})'
          class='info'
        >Stocks</v-btn>
      </v-flex>
      <v-flex xs12 sm5 class='hidden-md-and-up text-xs-center text-sm-left mx-2'>
        <v-btn large block
          @click='pathMethod({pageTo:"profile"})'
          class='info'
          >Profile</v-btn>
        </v-flex>
      </v-flex>

    </v-layout>
  </v-container>

</template>

<script>

import { mapGetters } from 'vuex'
import * as types from '../../store/types'
import {pathMethod} from '../../methods/PathMethod'

export default {
  data () {
    return {

      // ToolbarButtons: ['Portfolio', 'Stocks'],
    }
  },
  components: {
    appChartjs: () => import('../card/ChartJS'),
    appPortfoliotable: () => import('../card/PortfolioTable'),
  },
  methods: {
    pathMethod,
  },
  computed: {
    ...mapGetters({
      getFunds: types.GET_FUNDS
    }),
    tickers () {
      return this.$store.getters[types.GET_SHOW_HIDE_CHART]
    },
    portfolioTickers () {
      return this.$store.getters[types.GET_PORTFOLIO_TICKERS]
    }

  },
  created() {
    this.pathMethod({pageFrom:"home"})
  }
}
</script>

<style lang="css" scoped>
</style>
