<template lang="html">
  <v-container>
    <v-flex xs12 class='px-3' grid-list-md text-xs-left>
      <v-layout row wrap class='px-3'>
        <app-card
        :companies='portfolio'
        sourcePage='portfolio'
        ></app-card>
      </v-layout>
    </v-flex>
  </v-container>
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
    appCard: () => import('../card/Card.vue'),
  },
  methods: {
    pathMethod
  },
  computed: {
    ...mapGetters({
      portfolio: types.GET_PORTFOLIO
    }),
  },
  created() {
    this.pathMethod({pageFrom:"portfolio"})
  }
}
</script>

<style lang="css" scoped>
</style>
