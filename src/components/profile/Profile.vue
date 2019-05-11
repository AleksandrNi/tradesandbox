<template lang="html">
  <v-container>
    <v-layout row wrap >

      <app-bargaincard/>

    </v-layout>

  </v-container>
</template>

<script>
import {pathMethod} from '../../methods/PathMethod'

export default {
  data () {
    return {
      ticker: 'fb'
    }
  },
  components: {
        appBargaincard: () => import('../card/BargainCard'),
  },
  methods:{
    pathMethod
  },
  created() {
    this.pathMethod({pageFrom:"profile"})
  }
}
</script>

<style lang="css" scoped>
</style>
