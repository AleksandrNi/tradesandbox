<template lang="html">
<v-container>
    <v-flex xs12 grid-list-md text-xs-left>
      <v-layout row wrap class='search' style=' border-radius:5px;'>
        <v-flex xs9 sm10 md11 class='pr-1 '>

          <app-textfield
          :textFieldParams='textFieldParams'
          @update:input='textFieldParams.inputValue = $event'
          ></app-textfield>

        </v-flex>
        <v-flex xs3 sm2 md1 class="text-xs-right">
          <v-btn
          style='outline: none;'
          @click.stop='getTicker'
          fab
          key="search-button"
          >
          <v-icon>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>


    <v-layout row wrap class='px-3'>

      <app-card
      :companies='stocks'
      ></app-card>

    </v-layout>

  </v-flex>
</v-container>
</template>

<script>
import * as types from '../../store/types'
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import {pathMethod} from '../../methods/PathMethod'

export default {
  data() {
    return {
      textFieldParams: {
        inputValue:'',
        counter: true,
        min:2,
        max:5,
        type: 'text',
        rules: {
          min: ``,
          max: ``
        },
        show: true,
        label: 'ticker',
        required: true,
        class: 'pl-3 mt-1',
      },
    }
  },
  methods: {
    ...mapActions({
      sendQuery: types.ACTION_SEND_QUERY,
    }),
    pathMethod,
    getTicker() {

      if(this.textFieldParams.inputValue) {

        this.sendQuery(this.textFieldParams.inputValue)
        this.textFieldParams.inputValue = ''

        return true;
      }
      return false;
    },

  },
  components: {
    appCard: () => import('../card/Card'),
    appTextfield: () => import('../input/TextField')
  },
  computed: {
    ...mapGetters ({
      stocks: types.GET_QUERY_STOCKS
    })
  },
  created() {
    this.pathMethod({pageFrom:"stocks"})
  }



 //  mounted() {
 //   this.$store.subscribe((mutation, state) => {
 //     switch(mutation.type) {
 //       case 'search/MUTATE_SEND_QUERY':
 //         console.log(`Updating to ${state.query}`);
 //         break;
 //     }
 //   })
 // }

}
</script>

<style lang="css" scoped>
.v-text-field {
  margin: 0 0.25rem;
}
</style>
