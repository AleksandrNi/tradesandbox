<template lang="html">
<v-flex xs12 class='px-3' grid-list-md text-xs-left>
  <v-layout row wrap class='px-3'>
    <app-card
     :companies='favoriteStocks'
     sourcePage='favorite'
    ></app-card>
  </v-layout>
</v-flex>
</template>

<script>
import * as types from '../../store/types'
import { mapGetters } from 'vuex';
import {pathMethod} from '../../methods/PathMethod'

export default {
  data() {
    return {

    }
  },
  components: {
    appCard: () => import('../card/Card')
  },
  computed: {
    ...mapGetters ({
      favoriteStocks: types.GET_FAVORITE_STOCKS
    })
  },
  methods: {
    pathMethod
  },
  created() {
    this.pathMethod({pageFrom:"favorite"})
  }
}
</script>

<style lang="css" scoped>
</style>
