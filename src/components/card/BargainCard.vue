<template lang="html">

              <v-flex  class='px-3'>
                <!-- Qtty, Price -->
                <v-layout row wrap class='newsBlock' style='border-radius:5px'>
                  <v-flex xs6 text-xs-left class='px-3 py-1'>
                    <app-textfield
                      :textFieldParams='textFieldParamsQtty'
                      @update:input='textFieldParamsQtty.inputValue = $event'
                    />
                  </v-flex>
                  <v-flex xs6 text-xs-left class='px-3 py-1'>
                    <app-textfield
                      :textFieldParams='textFieldParamsPrice'
                      @update:input='textFieldParamsPriceMethod'
                    />
                  </v-flex>
                </v-layout>

                <!-- Hint -->
                <!-- Target Price -->
                <v-layout row wrap class='newsBlock py-1 my-1' style='border-radius:5px'>

                  <!-- Hint -->
                  <v-flex  xs12 text-xs-left class='pt-3 px-3'>
                    <p><i>Hint: 5%</i></p>
                    <hr>
                  </v-flex>

                  <!-- Target Price -->
                  <v-flex xs12 md6 text-xs-left class='px-3 py-1'>
                    <app-textfield
                      :textFieldParams='textFieldParamsPriceTarget'
                      @update:input='textFieldParamsPriceTargetMethod'
                    />
                  </v-flex>
                  <v-flex xs12 md6 text-xs-left class='px-3 py-1'>
                    <app-textfield
                      :textFieldParams='textFieldParamsPriceTargetGrow'
                      @update:input='textFieldParamsPriceTarget_GrowMethod'
                    />
                    <p class='pa-0 ma-0'>{{ textFieldParamsPriceTargetGrow.inputValue ? 'Price target. expected: ' + textFieldParamsPriceTargetGrow.inputValue + ' $': ''}} </p>
                  </v-flex>
                </v-layout>

                <!-- Price Low -->
                <v-layout row wrap class='newsBlock py-1' style='border-radius:5px'>

                  <v-flex xs12 md6 text-xs-left class='px-3 py-1'>
                    <app-textfield
                      :textFieldParams='textFieldParamsPriceLow'
                      @update:input='textFieldParamsPriceLowMethod'
                    />
                  </v-flex>
                  <v-flex xs12 md6 text-xs-left class='px-3 py-1'>
                    <app-textfield
                      :textFieldParams='textFieldParamsPriceLowGrow'
                      @update:input='textFieldParamsPriceLow_GrowMethod'
                    />
                    <p class='pa-0 ma-0'>{{ textFieldParamsPriceLowGrow.inputValue ? 'Price low. expected: ' + textFieldParamsPriceLowGrow.inputValue + ' $': ''}} </p>
                  </v-flex>

                  <v-flex xs12 md6 text-xs-left class='px-2'>
                    <v-btn xs6 block
                    class='primary'
                    v-if='getPageFromMethod([ "portfolio","favorite"])'
                    @click.stop='tickerDealsMethod("buy")'
                    >Buy</v-btn>
                  </v-flex>
                  <v-flex xs12 md6 text-xs-left class='px-2'>
                    <v-btn
                    class='primary'
                    xs6
                    block
                    @click.stop='tickerDealsMethod("sell")'
                    v-if='getPageFromMethod(["portfolio"])'
                    >Sell</v-btn>
                    <v-btn xs6 block class='primary' disabled v-if='getPageFromMethod(["favorite"])'>Sell</v-btn>
                  </v-flex>

                </v-layout>
              </v-flex>

</template>

<script>
import * as types from '../../store/types'
import {mapActions} from 'vuex'

export default {
  props: ['company'],
  data () {
    return {
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
        label: 'Quantity',
        required: false,
      },
      textFieldParamsPrice: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'price',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'Price, $',
        required: false,
      },
      textFieldParamsPriceTarget: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'price',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'Price. target , $',
        required: false,
      },
      textFieldParamsPriceTargetGrow: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'percentage',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'Grow. expected, % per year',
        required: false,
      },
      textFieldParamsPriceLow: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'price',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'Price. low limit, $',
        required: false,
      },
      textFieldParamsPriceLowGrow: {
        inputValue: '',
        counter: false,
        min: 0,
        max: 5,
        type: 'percentage',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'Grow. expected, % per year',
        required: false,
      },
    }
  },
  methods:{

    getPageFromMethod (params) {
      for (let arg of params) {
        if(arg === this.$store.getters[types.GET_PAGE_FROM]) return arg
      }
    },

    // FORM METHODS
    textFieldParamsPriceMethod (price) {

      this.textFieldParamsPrice.inputValue = price

      // target price
      const targetPrice = parseInt(price*1.05*10)/10
      this.textFieldParamsPriceTarget.label = 'price' + (targetPrice ? '. hint: ' + targetPrice : '')


      // low limit
      const lowLimitPrice = parseInt(price*0.95*10)/10
      this.textFieldParamsPriceLow.label = 'price' + (lowLimitPrice ? '. hint: ' + lowLimitPrice : '')

    },
    textFieldParamsPriceTargetMethod (price) {
      this.textFieldParamsPriceTarget.inputValue = price
    },
    textFieldParamsPriceLowMethod (price) {
      this.textFieldParamsPriceLow.inputValue = price
    },

    // target grow percentage
    textFieldParamsPriceTarget_GrowMethod (percentage) {
      this.textFieldParamsPriceTargetGrow.inputValue = this.textFieldParamsPriceTarget.inputValue.slice(0,1) === '-' ? parseInt(this.textFieldParamsPriceTarget.inputValue*(1 - 1/100*percentage)*1000)/1000 : parseInt(this.textFieldParamsPriceTarget.inputValue*(1 + 1/100*percentage)*1000)/1000
    },

    textFieldParamsPriceLow_GrowMethod (percentage) {
      this.textFieldParamsPriceLowGrow.inputValue =  this.textFieldParamsPriceLow.inputValue.slice(0,1) === '-' ? this.textFieldParamsPriceLow.inputValue*(1 - 1/100*percentage) : this.textFieldParamsPriceLow.inputValue*(1 + 1/100*percentage)
    },

    ...mapActions({
      tickerDealsAction: types.ACTION_TICKER_DEALS
    }),

    // send action method
    tickerDealsMethod (type) {
      const ticker = this.company[0][1]
      let check = false
      if(this.textFieldParamsQtty.inputValue && this.textFieldParamsPrice.inputValue) {
        check = true
      }

      if(check) {
        this.tickerDealsAction({
          type: type,
          ticker: ticker,
          qtty: this.textFieldParamsQtty.inputValue,
          price: this.textFieldParamsPrice.inputValue,
          priceTarget: this.textFieldParamsPriceTarget.inputValue,
          priceTargetGrow: this.textFieldParamsPriceTargetGrow.inputValue,
          priceLow: this.textFieldParamsPriceLow.inputValue,
          priceLowGrow: this.textFieldParamsPriceLowGrow.inputValue,
        })
      }
      return true
    },

  },
  components: {
    appTextfield: () => import('../input/TextField'),
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
