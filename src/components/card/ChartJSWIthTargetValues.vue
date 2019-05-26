<template>
<v-container>
  <v-layout row wrap justify-center>
    <!-- absolute -->
    <v-flex xs12 class='text-xs-left' >
      <div >
        <line-chart
        :chart-data="datacollection"
        :options="options"
        ></line-chart>
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
        datacollection: {},
        labels: '',
        options: {
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
        this.datacollection = {
          datasets: this.companyData,
          labels: this.labels,
        }

      },
    },
    computed: {

      pageFrom () {
        return this.$store.getters[types.GET_PAGE_FROM]
      },
      ticker () {
        return this.$route.params.ticker
      },
      companyData () {

        let company;
        let portfolioIndex;

        if(this.pageFrom === 'portfolio') {
          const portfolioTickers = this.$store.getters[types.GET_PORTFOLIO_TICKERS]
          const indexExists = portfolioTickers.findIndex(ticker => ticker === this.ticker)
          if (indexExists === -1) return
          // set portfolioIndex to take userDeals top|low paper limits
          portfolioIndex = indexExists;
          const companies = this.$store.getters[types.GET_PORTFOLIO]
          company = companies[indexExists]

        } else if (this.pageFrom === 'favorite') {
          const favoriteStocksTickers = this.$store.getters[types.GET_FAVORITE_TICKERS_STOCKS]
          const indexExists = favoriteStocksTickers.findIndex(ticker => ticker === this.ticker)
          if (indexExists === -1) return
          const companies = this.$store.getters[types.GET_FAVORITE_STOCKS]
          company = companies[indexExists]

        } else if (this.pageFrom === 'stocks') {
          const companies = this.$store.getters[types.GET_QUERY_STOCKS]
          const indexExists = companies.findIndex(company => company[1] === this.ticker)
          if (indexExists === -1) return
          company = companies[indexExists]
        }

        // label = extraData[0]
        // averagePrice = extraData[1]
        // high = extraData[2]
        // low = extraData[3]

          const extraData = company[0][this.ticker]['mixed']['extraData']

          // set labels on first step
          if(!this.labels) this.labels = extraData[0]

          // array of DATA to render the chart
          const selectedCompany = []

          // selectedCompany[0] push in the array DATA of the chart
          selectedCompany.push({
            label: this.ticker.toUpperCase() + ' Daily average price',
            backgroundColor: colorArray[parseInt(Math.random()*colorArray.length)],
            fill: false,
            data: extraData[1],
            borderColor: 'green',
            borderWidth:0.5,
          })

          // selectedCompany[1] push in the array HIGH PRICE DATA of the chart
          selectedCompany.push({
            label: 'Daily high price',
            backgroundColor: 'LightCoral',
            fill: false,
            data: extraData[2],
            borderWidth:0.5,
          })
          // selectedCompany[2] push in the array LOW PRICE DATA of the chart
          selectedCompany.push({
            label: 'Daily low price',
            fill: '1',
            data: extraData[3],
            borderColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth:0.5,
          })


          // AVERAGE PRICE | TOP | LOW LIMITS BLOCK
          if(typeof portfolioIndex === 'number') {
            const userDeals = this.$store.getters[types.GET_PORTFOLIO_USER_DEALS]

            // ADD AVERAGE PRICE CHART

            // take averagePrice paper limits user set when ve bought the paper
            const averagePrice = userDeals[portfolioIndex]['averagePrice']

            const averagePriceArray = []
            for(let i in extraData[0]) {
              averagePriceArray[i] = averagePrice
            }
            selectedCompany.push({
              label: 'Average price',
              backgroundColor: 'MAROON',
              borderColor: 'MAROON',
              fill: false,
              data: averagePriceArray,
              borderWidth:0.5,
              pointRadius: 0,
            })






            // take top | low paper limits user set when ve bought the paper
            const lowPriceTarget = userDeals[portfolioIndex]['lowPriceTarget']
            const topPriceTarget = userDeals[portfolioIndex]['topPriceTarget']
            // create Data array to render into chart
            const lowPriceTargetArray = []
            const topPriceTargetArray = []

            let topLimit;
            if (topPriceTarget && typeof(topPriceTarget) === 'number') {
              for(let i in extraData[0]) {
                topPriceTargetArray[i] = topPriceTarget
              }
              topLimit = {
                label: this.ticker.toUpperCase() + ' Top limit',
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 0.5,
                fill: false,
                data: topPriceTargetArray,
                pointRadius: 0.8,
              }
            }

            let lowLimit;
            if (lowPriceTarget && typeof lowPriceTarget === 'number') {

              for(let i in extraData[0]) {
                lowPriceTargetArray[i] = lowPriceTarget
              }

              lowLimit = {
                label: this.ticker.toUpperCase() + ' Low limit',
                backgroundColor: 'tomato',
                borderColor: 'tomato',
                borderWidth: 0.5,
                data: lowPriceTargetArray,
                pointRadius: 0.8,
                fill: false,
              }

            }
            // fillcolor between top|low limits
            if(topLimit && lowLimit) {
              lowLimit['borderColor'] = 'rgba(54, 162, 235, 0.1)'
              lowLimit['backgroundColor'] = ''
              lowLimit['fill'] = '4'
              selectedCompany.push(topLimit)
              selectedCompany.push(lowLimit)

            // if  topLimit only fill up to chart data
            } else if (topLimit && !lowLimit) {
              topLimit['borderColor'] = 'rgba(54, 162, 235, 0.1)'
              topLimit['backgroundColor'] = ''
              topLimit['fill'] = '2'
              selectedCompany.push(topLimit)

              // if  lowLimit only fill up to chart data
            } else if (!topLimit && lowLimit) {
              lowLimit['borderColor'] = 'rgba(54, 162, 235, 0.1)'
              lowLimit['backgroundColor'] = ''
              lowLimit['fill'] = '1'
              selectedCompany.push(lowLimit)
            }
          }


        return selectedCompany
      }
    },
    mounted () {
      this.fillData()
    },
  }
</script>

<style>

</style>
