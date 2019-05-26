<template>
<v-container>
  <v-layout row wrap justify-center>
    <!-- relative -->
    <v-flex xs12 md6 class='text-xs-left'>
      <div>
        <h5>Relative price of 52 weeks average price, %</h5>
        <p>Price/((week52High + week52Low)/2) - 1</p>
      </div>
      <div>
        <line-chart :chart-data="datacollectionRelative" :options="options1"></line-chart>
      </div>
    </v-flex>

    <!-- absolute -->
    <v-flex xs12 md6 class='text-xs-left'>
      <div>
        <h5>Absolute values, $</h5>
        <p>Average daily price</p>
      </div>
      <div>
        <line-chart :chart-data="datacollectionAbsolute" :options="options2"></line-chart>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import LineChart from './chartjs/LineChart.js'
  import * as types from '../../store/types'
  import {colorArray} from './chartjs/Colors'

  export default {

    components: {
      LineChart
    },
    data () {
      return {
        datacollectionRelative: {},
        datacollectionAbsolute: {},
        labels: '',
        options1: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return value + ' %';
                      }
                  }
              }]
          }
        },
        options2: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return value + ' $';
                      }
                  }
              }]
          }
        },
      }
    },
    methods: {
      fillData () {
        this.datacollectionRelative = {
          datasets: this.companyData.selectedCompaniesRelative,
          labels: this.labels,
        }
        this.datacollectionAbsolute = {
          datasets: this.companyData.selectedCompaniesAbsolute,
          labels: this.labels,
        }
      },
    },
    computed: {
      tickers () {
        return this.$store.getters[types.GET_SHOW_HIDE_CHART]
      },
      companyData () {
        const companies = this.$store.getters[types.GET_PORTFOLIO]
        const userDeals = this.$store.getters[types.GET_PORTFOLIO_USER_DEALS]



        const randomColorIndex = parseInt(Math.random()*colorArray.length)

        const selectedCompaniesAbsolute = [];
        const selectedCompaniesRelative = [];

        companies.map(company => {

          // set default values of first paper to display chart
          if(!this.tickers.length) this.$store.dispatch(types.ACTION_SHOW_HIDE_CHART, company[1])


          const companyIndex = this.tickers.findIndex(ticker => ticker === company[1])
          if (companyIndex === -1) return

            // find index of ticker in portfolio companies
            const companyPortfolioIndex = companies.findIndex(company => company[1] === this.tickers[companyIndex])
            // find company in portfolio companies
            const companyPortfolio = companies[companyPortfolioIndex]
            const extraData = companyPortfolio[0][companyPortfolio[1]]['mixed']['extraData']

            // label = extraData[0]
            // averagePrice = extraData[1]
            // high = extraData[2]
            // low = extraData[3]

            const week52High = userDeals[companyPortfolioIndex]['week52High']
            const week52Low = userDeals[companyPortfolioIndex]['week52Low']
            const week52AveragePrice = (week52High + week52Low)/2

            const relativeAveragePriceOfWeek52AveragePrice = extraData[1].map(value => {
              return value/week52AveragePrice - 1
            })

            // set labels on first step
            if(!this.labels) this.labels = extraData[0]

            // take low|top paper limits user set when ve bought the paper
            const lowPriceTarget = userDeals[companyPortfolioIndex]['lowPriceTarget']
            const topPriceTarget = userDeals[companyPortfolioIndex]['topPriceTarget']


            // create Data array to render into chart
            
            // DATA ABSOLUTE | RELATIVE BLOCK
            const companyEntries = {
                label: extraData[0],
                averagePrice: extraData[1],
                relative: relativeAveragePriceOfWeek52AveragePrice,
                high: extraData[2],
                low: extraData[3],
              }

            selectedCompaniesAbsolute.push({
              label: this.tickers[companyIndex].toUpperCase(),
              backgroundColor: colorArray[parseInt(Math.random()*colorArray.length)],
              fill: false,
              data: companyEntries.averagePrice
            })
            selectedCompaniesRelative.push({
              label: this.tickers[companyIndex].toUpperCase(),
              backgroundColor: colorArray[parseInt(Math.random()*colorArray.length)],
              fill: false,
              data: companyEntries.relative
            })


            // LOW | TOP LIMITS BLOCK
            const lowPriceTargetArray = []
            const topPriceTargetArray = []

            if (topPriceTarget && typeof(topPriceTarget) === 'number') {
              for(let i in extraData[0]) {
                topPriceTargetArray[i] = topPriceTarget
              }
              selectedCompaniesAbsolute.push({
                label: this.tickers[companyIndex].toUpperCase() + ' Top limit',
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 0.5,
                fill: false,
                data: topPriceTargetArray,
                pointRadius: 0.8,
              })
            }

            if (lowPriceTarget && typeof lowPriceTarget === 'number') {

              for(let i in extraData[0]) {
                lowPriceTargetArray[i] = lowPriceTarget
              }
              selectedCompaniesAbsolute.push({
                label: this.tickers[companyIndex].toUpperCase() + ' Low limit',
                backgroundColor: 'tomato',
                borderColor: 'tomato',
                borderWidth: 0.5,
                fill: false,
                data: lowPriceTargetArray,
                pointRadius: 0.8,

              })
            }


          return true
        })
          return {
            selectedCompaniesAbsolute,
            selectedCompaniesRelative
          }
      },
    },
    mounted () {
      this.fillData()
    },
  }
</script>

<style>

</style>
