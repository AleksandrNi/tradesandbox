<template lang="html">

            <v-layout row wrap >
              <v-flex
                v-for="(company, index) in companies"
                :key='company[1]'
                class='py-2 px-1'
                xs12 sm6 md4
              >
                <v-hover>
                  <v-card
                  slot-scope="{ hover }" >
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/plane.jpg"
                    height="140px"
                    >
                    <v-container
                    fill-height
                    fluid
                    pa-2
                    >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="company[0][company[1]].companyName"></span>
                      </v-flex>
                        <span>
                          <v-icon
                          right

                          class='white--text'
                          style='cursor:pointer'
                          @click='pathMethod({pageTo:"companyPage", pageFrom: pageFrom, ticker: company[1] })'
                          >show_chart
                        </v-icon>
                      </span>


                    </v-layout>
                  </v-container>

                  <!-- HOVER INFO -->
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal white--text"
                      style="font-size: 1.3rem; padding-right: .3rem;"
                    >
                    <v-card-actions v-if='sourcePageMethod(["portfolio"])'>
                        <v-flex>
                          <div>mkt. value</div>
                          <div>average price</div>
                          <div>margin</div>
                        </v-flex>
                        <v-flex class="text-xs-right">
                          <div>{{ userDeals[index].latestPrice }} $</div>
                          <div>{{ userDeals[index].averagePrice }} $</div>
                          <div>{{ userDeals[index].margin }} %</div>
                        </v-flex>
                    </v-card-actions>

                    </div>
                  </v-expand-transition>
                </v-img>

                    <v-card-actions class='pa-0'>
                        <app-cardactions
                        :company='company'
                        >
                          <slot name="cardActions"></slot>
                        </app-cardactions>

                      <!-- <v-btn icon>
                        <v-icon>bookmark</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>share</v-icon>
                      </v-btn> -->
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>

</template>

<script>
import * as types from '../../store/types'
import {pathMethod} from '../../methods/PathMethod'
export default {
  props: ['card', 'companies', 'hover'],
  data () {
    return {
    }
  },
  components: {
    appCardactions: () => import('./CardActions')
  },
  methods:{
    pathMethod,
    sourcePageMethod(params) {
      const pageFrom = this.pageFrom
      for (let arg of params) {
        if(arg === pageFrom) {return arg}
      }
      return false
    },
  },
  computed: {
    pageFrom () {
      return this.$store.getters[types.GET_PAGE_FROM]
    },
    userDeals () {
      let response = (this.pageFrom && this.pageFrom === 'portfolio')
      ? this.$store.getters[types.GET_PORTFOLIO_USER_DEALS]
      : []

      return response
    },
  },
  created () {
  }
}
</script>

<style lang="css" scoped>
.v-card--reveal {
  align-items: top;
  bottom: 0;
  c:flex-end;
  opacity: .5;
  position: absolute;
  width: 100%;

}
</style>
