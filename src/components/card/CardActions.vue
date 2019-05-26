<template lang="html">
  <v-card-text
    slot='cardActions'
   >
    <!--top level buttons buy|sell -->
    <span v-if='getPageFromMethod(["portfolio", "favorite"])'>

      <span v-if='getPageFromMethod(["portfolio"])'>
        <v-flex v-for='type in propsParams.portfolio.buttons ' class='text-xs-center' tag='span'>
            <v-btn color="silver" style='width:50%'
            @click='buttonAction(type)'
            >{{ type }}</v-btn>
        </v-flex>
      </span>
      <span v-if='getPageFromMethod(["favorite"])'>
        <v-flex v-for='type in propsParams.favorite.buttons ' class='text-xs-center' tag='span'>
            <v-btn color="silver" style='width:100%'
            @click='buttonAction(type)'
            >{{ type }}</v-btn>
        </v-flex>
      </span>
      <!-- popup sell -->
      <span  v-if="dropdownButton === 'sell'">

        <app-textfield
        :textFieldParams='textFieldParamsQtty'
        @update:input='textFieldParamsQtty.inputValue = $event'
        ></app-textfield>
        <app-textfield
        :textFieldParams='textFieldParamsPrice'
        @update:input='textFieldParamsPrice.inputValue = $event'
        ></app-textfield>

        <v-btn color="info" block
        @click="buyTickerMethod('sell')"
        >Sell</v-btn>

      </span>

    </span>

    <!-- popup buy -->
    <span v-if='getPageFromMethod(["portfolio"]) && dropdownButton === "buy" || getPageFromMethod(["favorite"]) && dropdownButton === "buy" '>
      <app-textfield
        :textFieldParams='textFieldParamsQtty'
        @update:input='textFieldParamsQtty.inputValue = $event'
      ></app-textfield>
      <app-textfield
        :textFieldParams='textFieldParamsPrice'
        @update:input='textFieldParamsPrice.inputValue = $event'
      ></app-textfield>
      <v-btn color="success" block
      @click.stop="buyTickerMethod('buy')"
      dark
      >Buy</v-btn>
    </span>

    <hr v-if='getPageFromMethod(["favorite", "stocks"])' style='margin-top:1.5rem;'>

    <span v-if='getPageFromMethod(["stocks"])'>
      <v-btn v-for='type in icons' icon>
        <v-icon out-in @click='iconAction(type, pageFrom)'>{{ type }}</v-icon>
      </v-btn>
    </span>

    <span v-if='getPageFromMethod(["favorite"])'>
      <v-btn v-for='type in icons' icon>
        <v-icon @click='iconAction(type, "favorite")'>{{ type }}</v-icon>
      </v-btn>
    </span>

    <app-dialog :dialogTrigger='dialogTrigger'></app-dialog>
    </v-card-text>

</template>

<script>

import * as types from '../../store/types'
import { mapActions } from 'vuex'

export default {
  props: ['company'],
  data () {
    return {
      propsParams: {
        stocks: {buttons: [], },
        favorite: {buttons: ['buy'], },
        portfolio: {buttons: ['buy', 'sell'], },
        checkedIcon: ['bookmark', 'delete']
      },
      dropdownButton: false,
      dialogTrigger: false,
      confirmation: false,
      textFieldParamsQtty: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'number',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'qtty',
        required: false,
      },
      textFieldParamsPrice: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'number',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'price',
        required: false,
      },
    }
  },
  components: {
    appTextfield: () => import('../input/TextField'),
    appDialog: () => import('../dialog/Dialog')
  },
  methods: {
    ...mapActions({
      addTickerToFavorite: types.ACTION_ADD_TICKER_TO_FAVORITE,
      removeCompanyFromDB: types.ACTION_REMOVE_COMPANY_FROM_DB,
      tickerDealsAction: types.ACTION_TICKER_DEALS,
    }),
    getPageFromMethod (params) {
      const storePageFrom = this.pageFrom
      for (let arg of params) {
        if(arg === storePageFrom) return arg
      }
      return false
    },
    sendQueryMethod (type) {
      if(
        this.textFieldParamsQtty.inputValue &&
        this.textFieldParamsPrice.inputValue
      ) {
        this.dialogTrigger = true
        if(this.confirmation) {
          this.sendQuery({
            id: this.company.id,
            type: type,
            qtty:this.textFieldParamsQtty.inputValue,
            price:this.textFieldParamsPrice.inputValue
          })
          this.textFieldParamsQtty.inputValue = ''
          this.textFieldParamsPrice.inputValue = ''
          this.dialogTrigger = false
          this.dropdownButton = false
          return true;
        }
      }
      return false;
    },
    buttonAction(type) {
      if(type === 'buy') {
        this.dropdownButton = 'buy';
        return true

      } else if (type === 'sell') {
        this.dropdownButton = 'sell';
        return true
      }
    },
    // send action method
    buyTickerMethod (type) {
      const ticker = this.company[1]
      if(this.textFieldParamsQtty.inputValue && this.textFieldParamsPrice.inputValue) {
        this.tickerDealsAction({
          type: type,
          ticker: ticker,
          qtty: this.textFieldParamsQtty.inputValue,
          price: this.textFieldParamsPrice.inputValue,
        })
      }
      return true
    },
    async iconAction(type, pageFrom) {

      if (type === 'bookmark_border') {
        this.addTickerToFavorite(this.company)
        return true

      } else if (type === 'bookmark' || type === 'delete_outline') {
        this.removeCompanyFromDB({ticker: this.company[1], pressedButton: type, pageFrom: this.pageFrom})
        return true
      }
      return false
    },
  },
  computed: {
    pageFrom () {
      return this.$store.getters[types.GET_PAGE_FROM]
    },
    icons () {
        const favoriteStocksTickers = this.$store.getters[types.GET_FAVORITE_TICKERS_STOCKS]
        const favoriteTickerExists = favoriteStocksTickers.some(ticker => ticker.toLowerCase() === this.company[1].toLowerCase())

        if(this.pageFrom === 'stocks') {
          return favoriteTickerExists ? ['bookmark','delete_outline'] : ['bookmark_border','delete_outline']

        } else if(this.pageFrom === 'favorite') {
          return favoriteTickerExists ? ['delete_outline'] : ['delete_outline']
        }
    }
  },
  created () {

  }
}
</script>

<style lang="css" scoped>
button {
outline: none;
}
</style>
