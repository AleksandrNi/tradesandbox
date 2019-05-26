<template lang="html">
  <v-container>
    <v-layout>
      <v-flex>



        <!-- <app-chartjs
        v-if='getPageFromMethod(["favorite", "portfolio"])'
        :key="ticker"
        /> -->
        <v-layout row wrap>

          <!-- path -->
          <v-flex v-if='ticker' xs6 class='my-1 text-xs-left'>
            <div class="hidden-sm-and-down pb-3" style='font-size:1.1rem'>
              <a
              style='cursor:pointer'
              @click="$router.go(-1)"
              >
              <b>{{ pageFrom ? pageFrom.toUpperCase() : '' }}</b>
              </a><span>
                {{' : '+ $route.params.ticker.toUpperCase()}}
              </span>
            </div>
          </v-flex>
          <!-- <v-flex xs6 class='my-1 text-xs-right'>
            <span v-if='getPageFromMethod(["stocks", "favorite"])'>
              <v-btn class='my-0' v-for='type in propsParams[pageFrom].icons' icon>
                <v-icon out-in @click='iconAction(type, pageFrom)'>{{ type }}</v-icon>
              </v-btn>
            </span>
          </v-flex> -->

          <!-- chart | quote -->
          <v-flex v-if='getPageFromMethod(["favorite", "portfolio","stocks"]) && ticker' xs12 class='text-xs-left'>
            <app-chartwithtable
            :chartData='chartData'
            />
         </v-flex>

         <!-- TickerStats -->
         <v-flex v-if='getPageFromMethod(["portfolio"])' xs12 md6 class='pr-1 text-xs-left '>
           <app-tickerstats
           :key='ticker'
           :ticker='ticker'
           />
         </v-flex>
        <!-- PORTFOLIO PART CODE -->
        <v-flex xs12 md6 class='pl-1' v-if='getPageFromMethod(["portfolio"])'>
          <!-- comments -->
          <v-flex v-if='getPageFromMethod(["favorite", "portfolio"])' xs12 class='px-1 text-xs-left'>
            <app-comments :key='ticker' />
          </v-flex>
          <!-- bargain card -->
          <v-flex v-if='getPageFromMethod(["favorite","portfolio"])' xs12 class='text-xs-left'>
            <div >
              <h5>Bargain</h5>
            </div>

            <app-bargaincard
            :company='company'
            />
          </v-flex>
        </v-flex>

        <!-- news -->
        <v-flex xs12 class='mt-3 text-xs-left' v-if='getPageFromMethod(["portfolio", "stocks"])'>
          <div >
            <h5>News</h5>
          </div>
          <app-newscard
          v-if='ticker'
          :news="companyNews"
          />
        </v-flex>



        <!-- FAVORITE PART CODE -->
        <v-flex xs12 md4 v-if='getPageFromMethod(["favorite"])' class='pt-1'>
          <!-- comments -->
          <v-flex v-if='getPageFromMethod(["favorite", "portfolio"])' xs12 class='text-xs-left'>
            <app-comments :key='ticker' />
          </v-flex>
          <!-- bargain card -->
          <v-flex v-if='getPageFromMethod(["favorite","portfolio"])' xs12 class='text-xs-left'>
            <div >
              <h5>Bargain</h5>
            </div>

            <app-bargaincard
            :company='company'
            />
          </v-flex>
        </v-flex>


        <!-- news -->
        <v-flex xs12 md8 class='pl-1 text-xs-left' v-if='getPageFromMethod(["favorite"])'>
          <div >
            <h5>News</h5>
          </div>
          <app-newscard
          v-if='ticker'
          :news="companyNews"
          />
        </v-flex>

      </v-layout>



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
      propsParams: {
        stocks: {buttons: [], icons: ['bookmark_border','delete_outline']},
        favorite: {buttons: ['buy'], icons: ['delete_outline']},
        portfolio: {buttons: ['buy', 'sell'], icons: []},
        ckeckedIcon: ['bookmark', 'delete']
      },
      companyQuote:'',
    }
  },
  components: {
    // appChartjs: () => import('../card/ChartJSPage'),
    appNewscard: () => import('../card/NewsCard'),
    appComments: () => import('../card/Comments'),
    appBargaincard: () => import('../card/BargainCard'),
    appChartwithtable: () => import('../card/ChartWithTable'),
    appTickerstats: () => import('../card/TickerStats'),
  },
  methods: {
    getPageFromMethod (params) {
      for (let arg of params) {
        if(arg === this.pageFrom) return arg
      }
    },

    pathMethod,
  },
  computed: {
    // type [chart, qoute, news]
    pageFrom() {
      return this.$store.getters[types.GET_PAGE_FROM]
    },
    ticker () {
      return  this.$route.params.ticker ? this.$route.params.ticker.toLowerCase() : ''
    },
    company() {
      return (() => {
        const company = this.$store.getters[types.GET_COMPANY_PARAM_BY_TICKER_ID]({
          ticker: this.ticker,
          pageFrom: this.pageFrom,
        })


        // check transitions between portfolio <==> favorite
        const portfolioTickers = this.$store.getters[types.GET_PORTFOLIO_TICKERS]
        const userDeals = this.$store.getters[types.GET_PORTFOLIO_USER_DEALS]
        if(this.pageFrom === 'favorite' && portfolioTickers.findIndex(ticker => ticker === this.ticker) !== -1) {
          this.pathMethod({pageFrom:"portfolio"})
          this.$router.push({name:'portfolio'})

        } else if (this.pageFrom === 'portfolio' && this.ticker && userDeals.findIndex(obj => obj['ticker'] === this.ticker) === -1) {
          this.$router.push({name:'portfolio'})
        }

        return company
      })()
    },
    companyNews () {return this.company && this.company[0] ? this.company[0][0][this.ticker]['news'] : []},
    chartData () {return this.company && this.company[0] ? this.company[0][0][this.ticker]['mixed']['chart'] : []}


  },

  async created() {
    // check/set pageFrom

    // type [chart, qoute, news]
    if(!this.pageFrom) {
      // this.pathMethod({pageFrom:"stocks"})
      //load data from db
      await this.$store.dispatch(types.ACTION_SEND_QUERY, this.ticker)

      let checked = false
      const portfolioTickers  = this.$store.getters[types.GET_PORTFOLIO_TICKERS]
      if (portfolioTickers.length) {
        const tickerExists = portfolioTickers.some(ticker => ticker === this.ticker)
        if (tickerExists) {
          checked = true
          this.pathMethod({pageFrom:"portfolio"})
        }
      }
      if(!checked) {
        const favoriteStocksTickers = this.$store.getters[types.GET_FAVORITE_TICKERS_STOCKS]
        if(favoriteStocksTickers.length) {
          const tickerExists = favoriteStocksTickers.some(ticker => ticker === this.ticker)
          if(tickerExists) {
            checked = true
            this.pathMethod({pageFrom:"favorite"})
          }
        }
      }
      if(!checked) {
        this.pathMethod({pageFrom:"stocks"})
      }
    }
  },
}
</script>

<style lang="css" scoped>

</style>
