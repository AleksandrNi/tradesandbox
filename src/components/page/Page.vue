<template lang="html">
  <v-container>
    <v-layout>
      <v-flex>


        <v-layout row wrap>

          <!-- path -->
          <v-flex xs6 class='my-1 text-xs-left'>
            <div class="hidden-sm-and-down pb-3" style='font-size:1.1rem'>
              <a
              style='cursor:pointer'
              @click="$router.go(-1)"
              >
              <b>{{ pageFrom ? pageFrom.toUpperCase() : '' }}</b>
              </a><span>
                {{$route.params.ticker ? ' : '+ $route.params.ticker.toUpperCase() : ''}}
              </span>
            </div>
          </v-flex>
          <v-flex xs6 class='my-1 text-xs-right'>
            <span v-if='getPageFromMethod(["stocks", "favorite"])'>
              <v-btn class='my-0' v-for='type in propsParams[pageFrom].icons' icon>
                <v-icon out-in @click='iconAction(type, pageFrom)'>{{ type }}</v-icon>
              </v-btn>
            </span>
          </v-flex>

          <!-- quote -->
          <v-flex xs12 md8 class='px-1 text-xs-left'>

            <div>
              <h5>Quote</h5>
            </div>

            <!-- chart -->
            <GChart
              type="LineChart"
              :data="chartData"
              :options="chartOptions"
            />
            <v-expansion-panel style='box-shadow: none;'>
             <v-expansion-panel-content
              style='background-color: #81C784'
              v-for="(item,i) in 1"
              :key="i"
             >
               <template v-slot:header>
                 <div>Daily average price, $</div>
               </template>

               <!-- table -->
               <v-flex >

                   <v-data-table

                     class="white--text mytable"
                     hide-actions
                     search
                     :headers="headers"
                      hide-headers
                     :items="companyTable"
                   >
                     <template v-slot:items="props" expand>
                       <td class="text-xs-left">{{ props.item[0] }}</td>
                       <td class="text-xs-left">{{ props.item[1] }}</td>
                     </template>
                   </v-data-table>

               </v-flex>


             </v-expansion-panel-content>
           </v-expansion-panel>
         </v-flex>

         <!-- comments -->
         <v-flex xs12 md4 class='px-1 text-xs-left'>
           <app-comments :ticker='ticker'></app-comments>
         </v-flex>

        <!-- bargain card -->
        <!-- v-if='getPageFromMethod(["favorite", "portfolio"])' -->
         <v-flex v-if='getPageFromMethod(["favorite", "portfolio"])' xs12 class='my-1 px-1 text-xs-left'>
           <div >
             <h5>Bargain</h5>
           </div>

           <app-bargaincard
            :company='company'
           />
         </v-flex>

        <!-- news -->
        <v-flex xs12 class='mt-3 px-1 text-xs-left'>
          <div >
            <h5>News</h5>
          </div>

          <app-newscard
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
      company: '',
      companyNews: '',
      companyQuote:'',

      companyTable: [],
      chartData: [],
      chartOptions: {
        backgroundColor: {
        gradient: {
          // Start color for gradient.
          color1: '#81C784',
          // Finish color for gradient.
          color2: '#fbf6a7',
          // Where on the boundary to start and
          // end the color1/color2 gradient,
          // relative to the upper left corner
          // of the boundary.
          x1: '0%', y1: '100%',
          x2: '100%', y2: '0%',
          // If true, the boundary for x1,
          // y1, x2, and y2 is the box. If
          // false, it's the entire chart.
          useObjectBoundingBoxUnits: true
        },
            // stroke: '#E4E4E4',
            // strokeWidth: 2
      },
        chart: {
          title: "Company chart",
          subtitle: "Stock price",
          hAxis: {
              direction: -1,
              slantedText: true,
              slantedTextAngle: 90 // here you can even use 180
          }
        }
      },
      headers: [
        { text: 'Date', value: 'date', align: 'left', sortable: false, },
        { text: 'Price, $', value: 'price', sortable: false, },
      ],
    }
  },
  components: {
    appNewscard: () => import('../card/NewsCard'),
    appComments: () => import('../comments/Comments'),
    appBargaincard: () => import('../card/BargainCard'),
  },
  methods: {
    getPageFromMethod (params) {
      for (let arg of params) {
        if(arg === this.pageFrom) return arg
      }
    },
    iconAction(type, activePage) {
      if(activePage === 'stocks') {
        if (type === 'bookmark_border') {
          this.propsParams.stocks.icons[0] = 'bookmark'
          return this.$store.dispatch(types.ACTION_ADD_TICKER_TO_FAVORITE, this.company)
        } else if(type === 'bookmark') {
          this.propsParams.stocks.icons[0] = 'bookmark_border'
          return this.$store.dispatch(types.ACTION_REMOVE_COMPANY_FROM_STOCKS, this.company)
        }

      } else if (activePage === 'stocks' && type === 'delete_outline') {
        this.propsParams.stocks.icons[1] = 'delete'
        return this.$store.dispatch(types.ACTION_REMOVE_COMPANY_FROM_STOCKS, this.company[1])

      } else if(activePage === 'favorite' && type === 'delete_outline') {
        this.propsParams.portfolio.icons[0] = 'delete'
        return this.$store.dispatch(types.ACTION_REMOVE_COMPANY_FROM_FAVORITE, this.company[1])
      }
      return false
    },

    pathMethod,
  },
  computed: {
    // type [chart, qoute, news]
    pageFrom() {
      return this.$store.getters[types.GET_PAGE_FROM]
    },
    ticker () {
      return  this.$route.params.ticker ? this.$route.params.ticker.toUpperCase() : ''
    },
    getCompanyParam() {
      return () => {
        const company = this.$store.getters[types.GET_COMPANY_PARAM_BY_TICKER_ID]({
          ticker: this.ticker,
          pageFrom: this.pageFrom,
        })
        return company
      }
    },
    getCompanyChart() {
      return () => {
        // chart block
        if(this.company && this.company.length) {
          const chartLabel = this.company[0][0][this.ticker]['chart'].map(obj => {
            return obj["label"]
          })
          const chartData = this.company[0][0][this.ticker]['chart'].map(obj => {
            return obj["vwap"]
          })

          this.chartLabel = chartLabel
          this.chartData = chartData

          let titleArray = []
          titleArray[0] = 'Month'
          titleArray[1] = this.ticker + ', $'
          let dataArray = [[...titleArray]]

          for(let i = 0; i < chartLabel.length; i++) {
            let tempArray = []
            tempArray.push(chartLabel[i])
            tempArray.push(chartData[i])
            dataArray.push(tempArray)
          }
            return {
              companyTable: ([...dataArray]).slice(1).reverse(),
              chartData:dataArray
            }
        }
      }
    },
    getCompanyNews() {
      return () => {
        // news block
        if(this.ticker) {
          const companyNews = (this.company && this.company[0]) ? this.company[0][0][this.ticker]['news'] : ''
          return companyNews
        }
      }
    },

  },

  created() {
    // type [chart, qoute, news]
    this.pathMethod
    this.company = this.getCompanyParam()
    this.companyNews = this.getCompanyNews()
    this.companyTable = this.getCompanyChart()['companyTable']
    this.chartData = this.getCompanyChart()['chartData']



  },
}
</script>

<style lang="css" scoped>
.mytable table td {
  background-color: #F5F5F5;
}
</style>
