<template lang="html">
  <v-container>
    <v-layout row wrap justify-center>
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
    <!-- <v-flex xs12  grid-list-md text-xs-left>
     <v-card>
       <v-img
         src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
         aspect-ratio="10"
       ></v-img>

       <v-card-title primary-title>
         <div>
           <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
           <div>Trade of view portfolio</div>
           <p>You may save & load Data.</p>
           <p>You Funds: {{ getFunds }}</p>
         </div>
       </v-card-title>
      <v-card-text>
        <p>This is your thrade place</p>
      </v-card-text>
       <v-card-actions>
         <v-btn flat color="orange">Share</v-btn>
         <v-btn flat color="orange">Explore</v-btn>
       </v-card-actions>
     </v-card>
   </v-flex> -->




</template>

<script>

import { mapGetters } from 'vuex'
import * as types from '../../store/types'
import {pathMethod} from '../../methods/PathMethod'

export default {
  data () {
    return {
      ToolbarButtons: ['Portfolio', 'Stocks'],
    }
  },
  components: {
    appPortfoliotable: () => import('../card/PortfolioTable'),
  },
  methods: {
    pathMethod
  },
  computed: {
    ...mapGetters({
      getFunds: types.GET_FUNDS
    })
  },
  created() {
    this.pathMethod({pageFrom:"home"})
  }
}
</script>

<style lang="css" scoped>
</style>
