<template lang="html">
  <v-card-text slot='cardActions' >

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
        @click="sendQueryMethod('sell')"
        >Sell</v-btn>

      </span>

    </span>

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
      @click.stop="sendQueryMethod('buy')"
      dark
      >Buy</v-btn>
    </span>

    <hr v-if='getPageFromMethod(["favorite", "stocks"])' style='margin-top:1.5rem;'>

    <span v-if='getPageFromMethod(["stocks"])'>
      <v-btn v-for='type in propsParams.stocks.icons' icon>
        <v-icon out-in @click='iconAction(type, "stocks")'>{{ type }}</v-icon>
      </v-btn>
    </span>

    <span v-if='getPageFromMethod(["favorite"])'>
      <v-btn v-for='type in propsParams.favorite.icons' icon>
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
        stocks: {buttons: [], icons: ['bookmark_border','delete_outline']},
        favorite: {buttons: ['buy'], icons: ['delete_outline']},
        portfolio: {buttons: ['buy', 'sell'], icons: []},
        ckeckedIcon: ['bookmark', 'delete']
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
      sendQuery: types.ACTION_SEND_QUERY,
      addTickerToFavorite: types.ACTION_ADD_TICKER_TO_FAVORITE,
      removeCompanyFromStocks: types.ACTION_REMOVE_COMPANY_FROM_STOCKS,
      removeCompanyFromFavorite: types.ACTION_REMOVE_COMPANY_FROM_FAVORITE,
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

    buyButton () {
      this.dropdownButton = 'buy';
    },
    sellButton () {
      this.dropdownButton = 'sell';
    },
    buttonAction(type) {
      if(type === 'buy') {
        return this.buyButton()
      } else if (type === 'sell') {
        return this.sellButton()
      }
    },
    iconAction(type, activePage) {
      if(activePage === 'stocks') {
        if (type === 'bookmark_border') {
          this.propsParams.stocks.icons[0] = 'bookmark'
          return this.addTickerToFavorite(this.company)
        } else if(type === 'bookmark') {
          this.propsParams.stocks.icons[0] = 'bookmark_border'
          return this.removeCompanyFromFavorite(this.company)
        }

      } else if (activePage === 'stocks' && type === 'delete_outline') {
        this.propsParams.stocks.icons[1] = 'delete'
        return this.removeCompanyFromStocks(this.company[1])

      } else if(activePage === 'favorite' && type === 'delete_outline') {
        this.propsParams.portfolio.icons[0] = 'delete'
        return this.removeCompanyFromFavorite(this.company[1])
      }
      return false
    },
  },
  computed: {
    pageFrom () {
      return this.$store.getters[types.GET_PAGE_FROM]
    }
  }
}
</script>

<style lang="css" scoped>
button {
outline: none;
}
</style>
